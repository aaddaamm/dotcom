import client from '../client';
import type { GoodreadsBook } from '../../src/lib/types';

export async function addGoodreadsBook(goodreadsData: GoodreadsBook) {
	const {
		cover,
		title,
		series,
		author,
		url,
		rating,
		dateStarted,
		datesRead,
		isbn,
		isbn13,
		asin,
		goodreadsID
	} = goodreadsData;

	const goodreadsBook = await client.goodreadsBook.create({
		data: {
			imageURL: cover,
			goodreadsId: goodreadsID,
			title,
			series,
			authorName: author,
			rating,
			url,
			isbn,
			isbn13,
			asin,
			dateStarted,
			datesRead
		}
	});

	return goodreadsBook;
}

export async function findExistingBook(goodeadsBook: GoodreadsBook) {
	const book = await client.goodreadsBook.findFirst({
		where: {
			OR: [
				{
					isbn: goodeadsBook.isbn
				},
				{
					isbn13: goodeadsBook.isbn13
				},
				{
					asin: goodeadsBook.asin
				},
				{
					goodreadsId: goodeadsBook.goodreadsID
				},
				{
					url: goodeadsBook.url
				},
				{
					title: goodeadsBook.title
				},
				{
					authorName: goodeadsBook.author
				}
			]
		}
	});

	return book;
}