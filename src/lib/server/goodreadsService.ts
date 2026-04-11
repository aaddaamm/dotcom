import * as cheerio from 'cheerio';
import type { AnyNode } from 'domhandler';
import type { GoodreadsBook } from '$lib/types';
import { GOODREADS_SHELVES } from '$lib/constants';
import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

const RSS_BASE_URL = 'https://www.goodreads.com/review/list_rss/92024399';
const CACHE_TTL_SECONDS = 60 * 60; // 1 hour
const PAGE_SIZE = 100;

// L1: per-instance in-memory cache. L2: Upstash, shared across all instances.
const memoryCache = new Map<string, { data: GoodreadsBook[]; timestamp: number }>();
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000;

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
	if (redisClient !== undefined) return redisClient;
	if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) return (redisClient = null);
	try {
		return (redisClient = new Redis({ url: env.KV_REST_API_URL, token: env.KV_REST_API_TOKEN }));
	} catch {
		return (redisClient = null);
	}
}

export namespace GoodreadsService {
	export function parseTitleAndSeries(rawTitle: string): { title: string; series?: string } {
		const match = rawTitle.match(/^(.+?)\s*\((.+)\)\s*$/);
		if (match) {
			return { title: match[1].trim(), series: match[2].trim() };
		}
		return { title: rawTitle.trim() };
	}

	export function parseBookFromRSSItem(item: cheerio.Cheerio<AnyNode>): GoodreadsBook {
		const rawTitle = item.find('title').text();
		const { title, series } = parseTitleAndSeries(rawTitle);
		const author = item.find('author_name').text();
		const bookId = item.find('book_id').text();
		const cover = item.find('book_large_image_url').text();
		const isbn = item.find('isbn').text();
		const rating = parseInt(item.find('user_rating').text()) || 0;
		const dateAdded = item.find('user_date_added').text();
		const url = `https://www.goodreads.com/book/show/${bookId}`;

		return {
			cover,
			title,
			series,
			author,
			url,
			rating: rating || undefined,
			isbn,
			dateStarted: dateAdded,
			goodreadsID: parseInt(bookId) || 0
		};
	}

	async function fetchRSSPage(
		shelf: GOODREADS_SHELVES,
		page: number,
		fetch: typeof globalThis.fetch
	): Promise<{ books: GoodreadsBook[]; total: number }> {
		const response = await fetch(`${RSS_BASE_URL}?shelf=${shelf}&page=${page}`);
		const text = await response.text();
		const xml = cheerio.load(text, { xmlMode: true });

		const totalMatch = text.match(/<openSearch:totalResults>(\d+)<\/openSearch:totalResults>/);
		const total = totalMatch ? parseInt(totalMatch[1]) : 0;

		const books: GoodreadsBook[] = [];
		xml('item').each((_, elem) => {
			books.push(parseBookFromRSSItem(xml(elem)));
		});

		return { books, total };
	}

	export async function getBooksFromShelf(
		shelf: GOODREADS_SHELVES,
		fetch: typeof globalThis.fetch
	): Promise<GoodreadsBook[]> {
		try {
			// L1: in-memory cache
			const cached = memoryCache.get(shelf);
			if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
				return cached.data;
			}

			// L2: Upstash Redis (shared across instances)
			const redis = getRedis();
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
				await redis.set(`goodreads:${shelf}`, allBooks, { ex: CACHE_TTL_SECONDS });
			}

			return allBooks;
		} catch (err) {
			console.error(`GoodreadsService: failed to fetch shelf "${shelf}":`, err);
			return [];
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
