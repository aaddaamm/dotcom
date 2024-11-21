import type { GoodreadsBook } from '../types';

export namespace BookService {
	export function addBookFromGoodreads(goodreadsData: GoodreadsBook) {
		const { cover, title, series, author, url, rating, dateRead } = goodreadsData;

		// Add book to database
	}
}

export default BookService;
