import * as cheerio from 'cheerio';
import type { GoodreadsBook } from '$lib/types';
import axios from 'axios';
import { GOODREADS_SHELVES } from '$lib/constants';

const RSS_BASE_URL = 'https://www.goodreads.com/review/list_rss/92024399';

export namespace GoodreadsService {
	export function parseTitleAndSeries(rawTitle: string): { title: string; series?: string } {
		const match = rawTitle.match(/^(.+?)\s*\((.+)\)\s*$/);
		if (match) {
			return { title: match[1].trim(), series: match[2].trim() };
		}
		return { title: rawTitle.trim() };
	}

	export function parseBookFromRSSItem(item: cheerio.Cheerio, xml: cheerio.Root): GoodreadsBook {
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
			isbn13: '',
			asin: '',
			dateStarted: dateAdded,
			goodreadsID: parseInt(bookId)
		};
	}

	export async function getBooksFromShelf(shelf: GOODREADS_SHELVES): Promise<GoodreadsBook[]> {
		try {
			const response = await axios(`${RSS_BASE_URL}?shelf=${shelf}`);
			const xml = cheerio.load(response.data, { xmlMode: true });
			const books: GoodreadsBook[] = [];

			xml('item').each((_, elem) => {
				const item = xml(elem);
				books.push(parseBookFromRSSItem(item, xml));
			});

			return books;
		} catch (error) {
			console.error('Error fetching Goodreads RSS:', error);
			return [];
		}
	}

	export async function fetchCurrentlyReadingShelf() {
		const books = await getBooksFromShelf(GOODREADS_SHELVES.CURRENTLY_READING);
		return books.sort(
			(a, b) => new Date(b?.dateStarted || 0).getTime() - new Date(a?.dateStarted || 0).getTime()
		);
	}

	export async function fetchWantToReadShelf() {
		return getBooksFromShelf(GOODREADS_SHELVES.WANT_TO_READ);
	}

	export async function fetchReadShelf() {
		return getBooksFromShelf(GOODREADS_SHELVES.READ);
	}

	export async function fetchGaveUpOnShelf() {
		return getBooksFromShelf(GOODREADS_SHELVES.GAVE_UP_ON);
	}
}

export default GoodreadsService;
