import type { Element } from 'cheerio';
import { load } from 'cheerio';

export function parseCoverFromHTML(element: Element) {
	const url = load(element)('img').attr('src');

	return url;
}

export function parseTitleAndSeriesFromHTML(element: Element) {
	const markup = load(element)('.title a').text().trim();
	const [title, series] = markup.split('\n');
	return { title, series };
}

export function parseAuthorFromHTML(element: Element) {
	return load(element)('.author a').text().trim();
}

export function parseGoodreadsURLFromHTML(element: Element) {
	const url = load(element)('.title a').attr('href');
	return `https://www.goodreads.com${url}`;
}
