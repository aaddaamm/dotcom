import client from '../client';
import { GoodreadsBook } from '../../src/lib/types';

const getBooks = async () => {
	const books = await client.book.findMany();
	return books;
};

const getBookById = async (id: number) => {
	const book = await client.book.findUnique({
		where: {
			id
		}
	});
	return book;
};
