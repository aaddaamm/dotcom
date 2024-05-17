import {
	parseCoverFromHTML,
	parseTitleAndSeriesFromHTML,
	parseAuthorFromHTML,
	parseGoodreadsURLFromHTML
} from '$lib/goodreads-helpers';
import axios from 'axios';
import { load } from 'cheerio';
import { type Book } from '../types';

const BASE_URL = 'https://www.goodreads.com/review/list/92024399-adam-robinson';
const SHELF = 'currently-reading';

export async function GET() {
	const resp = await axios(`${BASE_URL}?shelf=${SHELF}`);

	const html = load(resp.data);

	const books: Book[] = [];

	html('tr.bookalike').each((i, elem) => {
		const cover = parseCoverFromHTML(elem);
		const { title, series } = parseTitleAndSeriesFromHTML(elem);
		const author = parseAuthorFromHTML(elem);
		const url = parseGoodreadsURLFromHTML(elem);

		books.push({ cover, title, series, author, url });
	});

	return new Response(JSON.stringify(books), {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
