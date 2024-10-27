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
