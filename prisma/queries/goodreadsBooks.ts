import client from '../client';
import type { GoodreadsBook } from '../../src/lib/types';

export async function addGoodreadsBook(goodreadsData: GoodreadsBook) {
	const { cover, title, series, author, url, rating, dateRead, isbn, isbn13, asin, goodreadsID } =
		goodreadsData;

	const goodreadsBook = await client.goodreadsBook.create({
		data: {
			imageURL: cover,
			goodreadsId: goodreadsID,
			title,
			series,
			authorName: author,
			rating,
			url,
			dateRead: dateRead ? new Date(dateRead) : null,
			isbn,
			isbn13,
			asin
		}
	});

	return goodreadsBook;
}

export async function getGoodreadsBookByGoodreadsId(goodreadsId: number) {
	const book = await client.goodreadsBook.findUnique({
		where: {
			goodreadsId
		}
	});

	return book;
}
