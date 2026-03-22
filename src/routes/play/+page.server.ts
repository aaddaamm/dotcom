import GoodreadsService from '$lib/server/goodreadsService';

export async function load() {
	const [currentlyReading, readBooks] = await Promise.all([
		GoodreadsService.fetchCurrentlyReadingShelf(),
		GoodreadsService.fetchReadShelf()
	]);

	return { currentlyReading, readBooks };
}
