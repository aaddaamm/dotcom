import type { RequestHandler } from './$types';
import GoodreadsService from '$lib/server/goodreadsService';
import { createGoodreadsHandler } from '$lib/server/goodreads-route';

const getReadShelf = createGoodreadsHandler(
	(fetchFn) => GoodreadsService.fetchReadShelf(fetchFn),
	'Goodreads read shelf unavailable'
);

export const GET: RequestHandler = async ({ fetch }) => {
	return getReadShelf(fetch);
};
