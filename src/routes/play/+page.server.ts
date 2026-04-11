import GoodreadsService from '$lib/server/goodreadsService';

export async function load({ fetch }) {
	const [currentlyReading, readBooks] = await Promise.all([
		GoodreadsService.fetchCurrentlyReadingShelf(fetch),
		GoodreadsService.fetchReadShelf(fetch)
	]);

	return { currentlyReading, readBooks };
}
