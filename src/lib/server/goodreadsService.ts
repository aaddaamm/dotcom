import * as cheerio from 'cheerio';
import type { GoodreadsBook, GoodreadsPagination } from '$lib/types';
import axios from 'axios';
import { GOODREADS_SHELVES } from '$lib/constants';
import { load } from 'cheerio';
import GoodreadsDB from '../../../prisma/queries/goodreadsBooks';

import { sleep } from '$lib/helpers';

export const BASE_URL = 'https://www.goodreads.com/review/list/92024399-adam-robinson';

export namespace GoodreadsService {
	// https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1670363463i/58416952.jpg
	// https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654573897i/34002132.jpg

	export function useLargerImageAssets(imageURL?: string) {
		if (!imageURL) return '';

		const newOrigin = 'https://images-na.ssl-images-amazon.com';

		// Replace origin and remove part between underscores
		const updatedUrl = imageURL.replace(/^https:\/\/[^\/]+/, newOrigin).replace(/._\w+_/g, '');

		return updatedUrl;
	}

	export function parseCoverFromHTML(element: cheerio.Element) {
		const imageURL = cheerio.load(element)('img').attr('src');

		const updatedURL = useLargerImageAssets(imageURL);

		return updatedURL;
	}

	export function parseTitleAndSeriesFromHTML(element: cheerio.Element) {
		const markup = cheerio.load(element)('.title a').text().trim();
		const [title, series] = markup.split('\n');

		return { title, series: series?.trim() };
	}

	export function parseAuthorFromHTML(element: cheerio.Element) {
		const author = cheerio.load(element)('.author a').text().trim();

		return author;
	}

	export function parseGoodreadsURLFromHTML(element: cheerio.Element) {
		const goodreadsURL = cheerio.load(element)('.title a').attr('href');

		return `https://www.goodreads.com${goodreadsURL}`;
	}

	export function parseGoodreadsIDFromHTML(url: string) {
		const urlParts = url.split('/');
		const goodreadsID = urlParts[urlParts.length - 1].split('-')[0];

		return Number(goodreadsID);
	}

	export function parseRatingFromHTML(element: cheerio.Element) {
		const rating = cheerio.load(element)('.staticStars .staticStar.p10').length;

		return rating;
	}

	export function parseDatesReadFromHTML(element: cheerio.Element) {
		const datesRead = cheerio.load(element)('.date_read .date_read_value').text();

		return datesRead;
	}

	// used to find the maximum page number from the pagination links provided
	export function findMaxPageFromPagination(pagination: GoodreadsPagination[]) {
		const maxPage = pagination.reduce((acc, curr) => {
			if (curr.page > acc) {
				acc = curr.page;
			}

			return acc;
		}, 0);

		return maxPage;
	}

	// used to parse the URL and the text of the pagination links
	// so that we can iterate over the pages.
	export function parsePaginationFromHTML(html: cheerio.Root) {
		const pagination: GoodreadsPagination[] = [];

		html('div#reviewPagination a').each((i, elem) => {
			const text = html(elem).text();
			const href = html(elem).attr('href');

			pagination.push({ page: Number(text), URL: href });
		});

		return pagination;
	}

	export function parseNextPageFromHTML(element: cheerio.Root) {
		const nextPage = element('div#reviewPagination .next_page').attr('href');
		return nextPage;
	}

	export function parseIdentificationFromElement(element: cheerio.Element) {
		const isbn = cheerio.load(element)('.isbn > .value').text().trim();
		const isbn13 = cheerio.load(element)('.isbn13 > .value').text().trim();
		const asin = cheerio.load(element)('.asin > .value').text().trim();

		return { isbn, isbn13, asin };
	}

	export function getDateStartedFromHTML(element: cheerio.Element) {
		const dateStarted = cheerio.load(element)('.date_started .date_started_value').text();
		return dateStarted;
	}

	export function parseBookFromElement(element: cheerio.Element) {
		const cover = parseCoverFromHTML(element);
		const { title, series } = parseTitleAndSeriesFromHTML(element);
		const author = parseAuthorFromHTML(element);
		const url = parseGoodreadsURLFromHTML(element);
		const rating = parseRatingFromHTML(element);
		const datesRead = parseDatesReadFromHTML(element);
		const { isbn, isbn13, asin } = parseIdentificationFromElement(element);
		const dateStarted = getDateStartedFromHTML(element);
		const goodreadsID = parseGoodreadsIDFromHTML(url);

		return {
			cover,
			title,
			series,
			author,
			url,
			rating,
			datesRead,
			isbn,
			isbn13,
			asin,
			dateStarted,
			goodreadsID
		};
	}

	export async function addBook(goodreadsData: GoodreadsBook, shelf?: GOODREADS_SHELVES) {
		const existingBook = await GoodreadsDB.findExistingBook(goodreadsData);

		if (existingBook) {
			console.log(`${goodreadsData.title} already exists in the database`);
			return;
		}

		await GoodreadsDB.addGoodreadsBook(goodreadsData, shelf);
	}

	export const getBooksFromShelf = async (shelf: GOODREADS_SHELVES, allowSleep?: boolean) => {
		try {
			console.log(`Mapping over the "${shelf.toUpperCase()}" shelf`);

			const initialPage = await axios(`${BASE_URL}?shelf=${shelf}`);
			const readPageHTML = load(initialPage.data);
			const paginationFromHTML = GoodreadsService.parsePaginationFromHTML(readPageHTML);
			const maxPaginationValue = GoodreadsService.findMaxPageFromPagination(paginationFromHTML);

			const books: GoodreadsBook[] = [];

			const iterationTarget = maxPaginationValue ? maxPaginationValue : 1;

			for (let i = 1; i <= iterationTarget; i++) {
				console.log(`Mapping over page ${i}`);

				const resp = await axios(`${BASE_URL}?shelf=${shelf}&page=${i}`);
				const html = load(resp.data);

				html('tr.bookalike').each((i, elem) => {
					const book = GoodreadsService.parseBookFromElement(elem);
					books.push(book);
				});

				// sleep for 5 seconds to avoid rate limiting
				allowSleep && (await sleep(5000));
				console.log(`Finished mapping over page ${i}`);
			}

			console.log(`Finished mapping over the "${shelf.toUpperCase()}" shelf`);

			return books;
		} catch (error) {
			console.error('Error:', error);
		}
	};

	export async function fetchCurrentlyReadingShelf(sleep = false) {
		const books = await getBooksFromShelf(GOODREADS_SHELVES.CURRENTLY_READING, sleep);
		return books?.sort(
			(a, b) => new Date(b?.dateStarted || 0).getTime() - new Date(a?.dateStarted || 0).getTime()
		);
	}

	export async function fetchWantToReadShelf(sleep = false) {
		const books = await getBooksFromShelf(GOODREADS_SHELVES.WANT_TO_READ, sleep);
		return books;
	}

	export async function fetchReadShelf(sleep = false) {
		const books = await getBooksFromShelf(GOODREADS_SHELVES.READ, sleep);

		return books;
	}

	export async function fetchGaveUpOnShelf(sleep = false) {
		const books = await getBooksFromShelf(GOODREADS_SHELVES.GAVE_UP_ON, sleep);
		return books;
	}
}

export default GoodreadsService;
