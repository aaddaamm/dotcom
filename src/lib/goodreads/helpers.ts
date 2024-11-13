import * as cheerio from 'cheerio';

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

	return { title, series };
}

export function parseAuthorFromHTML(element: cheerio.Element) {
	const author = cheerio.load(element)('.author a').text().trim();

	return author;
}

export function parseGoodreadsURLFromHTML(element: cheerio.Element) {
	const goodreadsURL = cheerio.load(element)('.title a').attr('href');

	return `https://www.goodreads.com${goodreadsURL}`;
}

export function parseRatingFromHTML(element: cheerio.Element) {
	const rating = cheerio.load(element)('.rating .staticStars p10').length;

	return rating;
}

export function parseDateReadFromHTML(element: cheerio.Element) {
	const dateRead = cheerio.load(element)('.date_read .date_read_value').text();

	return dateRead;
}

// i'm gathering the pagingation links from the element with ID 'reviewPagination'
// the issue i'm having is that i'm not able to select the element
// based on the ID without spending more time learning how to do it
// with Cherrio.
// this function may not be necessary as i can just
// return the pagination link from the last anchor tag `next_page
// as long as this element has an href, i can keep paginating
export function parsePaginationFromHTML(html: cheerio.Root) {
	const pagination = html('.right.uitext a');

	return pagination;
}

export function parseNextPageFromHTML(element: cheerio.Root) {
	const nextPage = element('.next_page').attr('href');
	return nextPage;
}

export function parseBookFromElement(element: cheerio.Element) {
	const cover = parseCoverFromHTML(element);
	const { title, series } = parseTitleAndSeriesFromHTML(element);
	const author = parseAuthorFromHTML(element);
	const url = parseGoodreadsURLFromHTML(element);
	const rating = parseRatingFromHTML(element);
	const dateRead = parseDateReadFromHTML(element);

	return { cover, title, series, author, url, rating, dateRead };
}
