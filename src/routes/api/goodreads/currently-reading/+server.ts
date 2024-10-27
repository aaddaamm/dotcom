import {
	parseCoverFromHTML,
	parseTitleAndSeriesFromHTML,
	parseAuthorFromHTML,
	parseGoodreadsURLFromHTML
} from '$lib/goodreads-helpers';
import axios from 'axios';
import { load } from 'cheerio';
import { type GoodreadsBook } from '$lib/types';
import { GOODREADS_SHELVES } from '$lib/constants';

const BASE_URL = 'https://www.goodreads.com/review/list/92024399-adam-robinson';

export async function GET() {
	const resp = await axios(`${BASE_URL}?shelf=${GOODREADS_SHELVES.CURRENTLY_READING}`);

	const html = load(resp.data);

	const books: GoodreadsBook[] = [];

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
