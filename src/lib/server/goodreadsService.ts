import { XMLParser } from 'fast-xml-parser';
import type { GoodreadsBook } from '$lib/types';
import { GOODREADS_SHELVES } from '$lib/constants';
import { getRedis } from '$lib/server/redis';

const RSS_BASE_URL = 'https://www.goodreads.com/review/list_rss/92024399';
const CACHE_TTL_SECONDS = 60 * 60; // 1 hour
const STALE_CACHE_TTL_SECONDS = 24 * 60 * 60; // 24 hours
const CACHE_FETCH_TIMEOUT_MS = 5000;
const PAGE_SIZE = 100;

// L1: per-instance in-memory cache. L2: Upstash, shared across all instances.
const memoryCache = new Map<string, { data: GoodreadsBook[]; timestamp: number }>();
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000;

const parser = new XMLParser({ isArray: (name) => name === 'item' });

function getStaleMemoryData(shelf: GOODREADS_SHELVES): GoodreadsBook[] | null {
	const cached = memoryCache.get(shelf);
	if (cached?.data?.length) return cached.data;
	return null;
}

async function getStaleSharedData(shelf: GOODREADS_SHELVES): Promise<GoodreadsBook[] | null> {
	const redis = getRedis();
	if (!redis) return null;

	try {
		const staleData = await redis.get<GoodreadsBook[]>(`goodreads:stale:${shelf}`);
		if (staleData?.length) {
			memoryCache.set(shelf, { data: staleData, timestamp: Date.now() });
			return staleData;
		}
	} catch {
		// noop
	}

	return null;
}

async function getStaleData(shelf: GOODREADS_SHELVES): Promise<GoodreadsBook[]> {
	const memoryData = getStaleMemoryData(shelf);
	if (memoryData) return memoryData;

	const sharedData = await getStaleSharedData(shelf);
	return sharedData ?? [];
}

export namespace GoodreadsService {
	export function parseTitleAndSeries(rawTitle: string): {
		title: string;
		series?: string;
	} {
		const match = rawTitle.match(/^(.+?)\s*\((.+)\)\s*$/);
		if (match) {
			return { title: match[1].trim(), series: match[2].trim() };
		}
		return { title: rawTitle.trim() };
	}

	function parseBookFromItem(raw: Record<string, unknown>): GoodreadsBook {
		const rawTitle = String(raw.title ?? '');
		const { title, series } = parseTitleAndSeries(rawTitle);
		const bookId = String(raw.book_id ?? '');
		const rating = parseInt(String(raw.user_rating ?? '0')) || 0;

		return {
			cover: String(raw.book_large_image_url ?? ''),
			title,
			series,
			author: String(raw.author_name ?? ''),
			url: `https://www.goodreads.com/book/show/${bookId}`,
			rating: rating || undefined,
			isbn: String(raw.isbn ?? ''),
			dateStarted: String(raw.user_date_added ?? ''),
			goodreadsID: parseInt(bookId) || 0
		};
	}

	async function fetchRSSPage(
		shelf: GOODREADS_SHELVES,
		page: number,
		fetch: typeof globalThis.fetch
	): Promise<{ books: GoodreadsBook[]; total: number }> {
		const response = await fetch(`${RSS_BASE_URL}?shelf=${shelf}&page=${page}`, {
			signal: AbortSignal.timeout(CACHE_FETCH_TIMEOUT_MS)
		});
		if (!response.ok) {
			throw new Error(`Goodreads RSS fetch failed with status ${response.status}`);
		}

		const text = await response.text();
		const parsed = parser.parse(text);
		const channel = parsed?.rss?.channel;
		if (!channel) {
			throw new Error('Goodreads RSS response did not contain rss.channel');
		}

		const total = Number(channel['openSearch:totalResults'] ?? 0);
		const items: unknown[] = channel.item ?? [];
		const books = items.map((item) => parseBookFromItem(item as Record<string, unknown>));

		return { books, total };
	}

	export async function getBooksFromShelf(
		shelf: GOODREADS_SHELVES,
		fetch: typeof globalThis.fetch
	): Promise<GoodreadsBook[]> {
		const redis = getRedis();
		try {
			// L1: in-memory cache
			const cached = memoryCache.get(shelf);
			if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
				return cached.data;
			}

			// L2: Upstash Redis (shared across instances)
			if (redis) {
				const redisData = await redis.get<GoodreadsBook[]>(`goodreads:${shelf}`);
				if (redisData) {
					memoryCache.set(shelf, { data: redisData, timestamp: Date.now() });
					return redisData;
				}
			}

			// Fetch page 1 to get books and total count
			const { books: firstPage, total } = await fetchRSSPage(shelf, 1, fetch);
			const allBooks: GoodreadsBook[] = [...firstPage];

			if (total > PAGE_SIZE) {
				// Total known — fetch remaining pages in parallel
				const remainingCount = Math.min(Math.ceil((total - PAGE_SIZE) / PAGE_SIZE), 19);
				const pageNumbers = Array.from({ length: remainingCount }, (_, i) => i + 2);
				const results = await Promise.all(pageNumbers.map((p) => fetchRSSPage(shelf, p, fetch)));
				for (const { books } of results) allBooks.push(...books);
			} else if (total === 0 && firstPage.length === PAGE_SIZE) {
				// Total unavailable — fall back to sequential paging
				let page = 2;
				while (page <= 20) {
					const { books } = await fetchRSSPage(shelf, page, fetch);
					allBooks.push(...books);
					if (books.length < PAGE_SIZE) break;
					page++;
				}
			}

			// Write to both caches
			memoryCache.set(shelf, { data: allBooks, timestamp: Date.now() });
			if (redis) {
				await Promise.all([
					redis.set(`goodreads:${shelf}`, allBooks, { ex: CACHE_TTL_SECONDS }),
					redis.set(`goodreads:stale:${shelf}`, allBooks, {
						ex: STALE_CACHE_TTL_SECONDS
					})
				]);
			}

			return allBooks;
		} catch (err) {
			console.error(`GoodreadsService: failed to fetch shelf "${shelf}":`, err);
			return getStaleData(shelf);
		}
	}

	export async function fetchCurrentlyReadingShelf(fetch: typeof globalThis.fetch) {
		const books = await getBooksFromShelf(GOODREADS_SHELVES.CURRENTLY_READING, fetch);
		return books.sort(
			(a, b) => new Date(b?.dateStarted || 0).getTime() - new Date(a?.dateStarted || 0).getTime()
		);
	}

	export async function fetchReadShelf(fetch: typeof globalThis.fetch) {
		return getBooksFromShelf(GOODREADS_SHELVES.READ, fetch);
	}
}

export default GoodreadsService;
