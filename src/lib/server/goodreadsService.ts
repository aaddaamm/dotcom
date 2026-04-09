import * as cheerio from 'cheerio';
import type { AnyNode } from 'domhandler';
import type { GoodreadsBook } from '$lib/types';
import { GOODREADS_SHELVES } from '$lib/constants';

const RSS_BASE_URL = 'https://www.goodreads.com/review/list_rss/92024399';

// Per-instance in-memory cache. On Vercel serverless, each function instance
// has its own cache and cold starts reset it, so actual TTL varies. Adequate
// for this read-only shelf data — a cache miss just re-fetches the RSS feed.
const cache = new Map<string, { data: GoodreadsBook[]; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

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

	async function fetchRSSPage(shelf: GOODREADS_SHELVES, page: number, fetch: typeof globalThis.fetch): Promise<GoodreadsBook[]> {
		const response = await fetch(`${RSS_BASE_URL}?shelf=${shelf}&page=${page}`);
		const text = await response.text();
		const xml = cheerio.load(text, { xmlMode: true });
		const books: GoodreadsBook[] = [];

		xml('item').each((_, elem) => {
			const item = xml(elem);
			books.push(parseBookFromRSSItem(item));
		});

		return books;
	}

	export async function getBooksFromShelf(shelf: GOODREADS_SHELVES, fetch: typeof globalThis.fetch): Promise<GoodreadsBook[]> {
		try {
			const cached = cache.get(shelf);
			if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
				return cached.data;
			}

			const allBooks: GoodreadsBook[] = [];
			let page = 1;

			while (page <= 20) {
				const books = await fetchRSSPage(shelf, page, fetch);
				allBooks.push(...books);
				if (books.length < 100) break;
				page++;
			}

			cache.set(shelf, { data: allBooks, timestamp: Date.now() });

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
