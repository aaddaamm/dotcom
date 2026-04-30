import type { RequestHandler } from './$types';
import GoodreadsService from '$lib/server/goodreadsService';
import { createGoodreadsHandler } from '$lib/server/goodreads-route';

const getCurrentlyReading = createGoodreadsHandler(
	(fetchFn) => GoodreadsService.fetchCurrentlyReadingShelf(fetchFn),
	'Goodreads currently-reading unavailable'
);

export const GET: RequestHandler = async ({ fetch }) => {
	return getCurrentlyReading(fetch);
};
