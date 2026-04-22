import type { PageServerLoad } from './$types';
import GoodreadsService from '$lib/server/goodreadsService';

export const load: PageServerLoad = async ({ fetch }) => {
	const [currentlyReading, readBooks] = await Promise.all([
		GoodreadsService.fetchCurrentlyReadingShelf(fetch),
		GoodreadsService.fetchReadShelf(fetch)
	]);

	return { currentlyReading, readBooks };
};
