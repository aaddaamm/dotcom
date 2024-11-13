import { parseBookFromElement } from '$lib/goodreads/helpers';
import axios from 'axios';
import { load } from 'cheerio';
import { type GoodreadsBook } from '$lib/types';
import { GOODREADS_SHELVES } from '$lib/constants';

export const _BASE_URL = 'https://www.goodreads.com/review/list/92024399-adam-robinson';

export async function GET() {
	const resp = await axios(`${_BASE_URL}?shelf=${GOODREADS_SHELVES.CURRENTLY_READING}`);

	const html = load(resp.data);

	const books: GoodreadsBook[] = [];

	html('tr.bookalike').each((i, elem) => {
		const book = parseBookFromElement(elem);

		books.push(book);
	});

	return new Response(JSON.stringify(books), {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
