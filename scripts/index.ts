import GoodreadsService from '../src/lib/server/goodreadsService';

/**
 * Function for mapping over the books on the "Read" shelf
 * TODO: add data validation
 * TODO: add data transformation
 * TODO: add data persistence
 */

async function main(): Promise<void> {
	console.log('begin gathering goodreads data');

	try {
		const readShelf = await GoodreadsService.fetchReadShelf(true);
		const wantToReadShelf = await GoodreadsService.fetchWantToReadShelf(true);
		const currentlyReadingShelf = await GoodreadsService.fetchCurrentlyReadingShelf(true);
		const gaveUpOnShelf = await GoodreadsService.fetchGaveUpOnShelf(true);

		console.log('finished gathering goodreads data');

		readShelf?.forEach(async (book) => {
			console.log('processing book:', book.title);

			await GoodreadsService.addBook(book);
		});

		wantToReadShelf?.forEach(async (book) => {
			console.log('processing book:', book.title);

			await GoodreadsService.addBook(book);
		});

		currentlyReadingShelf?.forEach(async (book) => {
			console.log('processing book:', book.title);

			await GoodreadsService.addBook(book);
		});

		gaveUpOnShelf?.forEach(async (book) => {
			console.log('processing book:', book.title);

			await GoodreadsService.addBook(book);
		});

		console.log('Read shelf count:', readShelf?.length);
		console.log('Want to read shelf:', wantToReadShelf?.length);
		console.log('Currently reading shelf:', currentlyReadingShelf?.length);
		console.log('Gave up on shelf:', gaveUpOnShelf?.length);
	} catch (error) {
		console.error('Error:', error);
	}
}

await main();
