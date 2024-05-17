import type { Element } from 'cheerio';
import { load } from 'cheerio';

// Usage: import { parseCoverFromHTML } from './lib/goodreads-helpers';
export function parseCoverFromHTML(element: Element) {
	const img = load(element)('img').attr('src');
	return img;
}

export function parseTitleAndSeriesFromHTML(element: Element) {
	const markup = load(element)('.title a').text().trim();

	const [title, series] = markup.split('\n');

	return { title, series };
}

export function parseAuthorFromHTML(element: Element) {
	const author = load(element)('.author a').text().trim();

	return author;
}

export function parseGoodreadsURLFromHTML(element: Element) {
	const url = load(element)('.title a').attr('href');

	return `https://www.goodreads.com${url}`;
}
