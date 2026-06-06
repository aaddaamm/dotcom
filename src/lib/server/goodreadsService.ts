import { XMLParser } from 'fast-xml-parser';
import type { GoodreadsBook } from '$lib/types';
import { GOODREADS_SHELVES } from '$lib/constants';
import { getRedis } from '$lib/server/redis';
import { contactLogger } from '$lib/server/contact-logger';
import { isRecord } from '$lib/server/content-frontmatter';

const RSS_BASE_URL = 'https://www.goodreads.com/review/list_rss/92024399';
const CACHE_TTL_SECONDS = 60 * 60; // 1 hour
const STALE_CACHE_TTL_SECONDS = 24 * 60 * 60; // 24 hours
const CACHE_FETCH_TIMEOUT_MS = 5000;
const PAGE_SIZE = 100;

// L1: per-instance in-memory cache. L2: Upstash, shared across all instances.
const memoryCache = new Map<string, { data: GoodreadsBook[]; timestamp: number }>();
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000;

const parser = new XMLParser({ isArray: (name) => name === 'item' });

type GoodreadsRssChannel = {
	'openSearch:totalResults'?: unknown;
	item?: unknown;
};

function getRssChannel(parsed: unknown): GoodreadsRssChannel | null {
	if (!isRecord(parsed)) return null;
	const rss = parsed.rss;
	if (!isRecord(rss)) return null;
	const channel = rss.channel;
	if (!isRecord(channel)) return null;
	return channel;
}

function getRssItems(channel: GoodreadsRssChannel): unknown[] {
	return Array.isArray(channel.item) ? channel.item : [];
}

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

function parseTitleAndSeries(rawTitle: string): {
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
	const parsed: unknown = parser.parse(text);
	const channel = getRssChannel(parsed);
	if (!channel) {
		throw new Error('Goodreads RSS response did not contain rss.channel');
	}

	const total = Number(channel['openSearch:totalResults'] ?? 0);
	const books = getRssItems(channel)
		.filter(isRecord)
		.map((item: Record<string, unknown>) => parseBookFromItem(item));

	return { books, total };
}

async function getCachedBooks(shelf: GOODREADS_SHELVES): Promise<GoodreadsBook[] | null> {
	const cached = memoryCache.get(shelf);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) return cached.data;

	const redis = getRedis();
	if (!redis) return null;

	const redisData = await redis.get<GoodreadsBook[]>(`goodreads:${shelf}`);
	if (!redisData) return null;

	memoryCache.set(shelf, { data: redisData, timestamp: Date.now() });
	return redisData;
}

async function fetchRemainingKnownPages(
	shelf: GOODREADS_SHELVES,
	total: number,
	fetch: typeof globalThis.fetch
): Promise<GoodreadsBook[]> {
	const remainingCount = Math.min(Math.ceil((total - PAGE_SIZE) / PAGE_SIZE), 19);
	const pageNumbers = Array.from({ length: remainingCount }, (_, i) => i + 2);
	const pages = await Promise.all(pageNumbers.map((page) => fetchRSSPage(shelf, page, fetch)));
	return pages.flatMap(({ books }) => books);
}

async function fetchSequentialFallbackPages(
	shelf: GOODREADS_SHELVES,
	fetch: typeof globalThis.fetch
): Promise<GoodreadsBook[]> {
	const books: GoodreadsBook[] = [];

	for (let page = 2; page <= 20; page++) {
		const result = await fetchRSSPage(shelf, page, fetch);
		books.push(...result.books);
		if (result.books.length < PAGE_SIZE) break;
	}

	return books;
}

async function fetchFreshBooks(
	shelf: GOODREADS_SHELVES,
	fetch: typeof globalThis.fetch
): Promise<GoodreadsBook[]> {
	const { books: firstPage, total } = await fetchRSSPage(shelf, 1, fetch);
	const remainingBooks =
		total > PAGE_SIZE
			? await fetchRemainingKnownPages(shelf, total, fetch)
			: total === 0 && firstPage.length === PAGE_SIZE
				? await fetchSequentialFallbackPages(shelf, fetch)
				: [];

	return [...firstPage, ...remainingBooks];
}

async function cacheBooks(shelf: GOODREADS_SHELVES, books: GoodreadsBook[]): Promise<void> {
	memoryCache.set(shelf, { data: books, timestamp: Date.now() });

	const redis = getRedis();
	if (!redis) return;

	await Promise.all([
		redis.set(`goodreads:${shelf}`, books, { ex: CACHE_TTL_SECONDS }),
		redis.set(`goodreads:stale:${shelf}`, books, { ex: STALE_CACHE_TTL_SECONDS })
	]);
}

async function getBooksFromShelf(
	shelf: GOODREADS_SHELVES,
	fetch: typeof globalThis.fetch
): Promise<GoodreadsBook[]> {
	try {
		const cachedBooks = await getCachedBooks(shelf);
		if (cachedBooks) return cachedBooks;

		const freshBooks = await fetchFreshBooks(shelf, fetch);
		await cacheBooks(shelf, freshBooks);
		return freshBooks;
	} catch (err) {
		contactLogger.error(`GoodreadsService: failed to fetch shelf "${shelf}":`, err);
		return getStaleData(shelf);
	}
}

async function fetchCurrentlyReadingShelf(fetch: typeof globalThis.fetch) {
	const books = await getBooksFromShelf(GOODREADS_SHELVES.CURRENTLY_READING, fetch);
	return books.sort(
		(a, b) => new Date(b?.dateStarted || 0).getTime() - new Date(a?.dateStarted || 0).getTime()
	);
}

async function fetchReadShelf(fetch: typeof globalThis.fetch) {
	return getBooksFromShelf(GOODREADS_SHELVES.READ, fetch);
}

const goodreadsService = {
	parseTitleAndSeries,
	getBooksFromShelf,
	fetchCurrentlyReadingShelf,
	fetchReadShelf
};

export default goodreadsService;
