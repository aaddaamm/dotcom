import type { RequestHandler } from './$types';
import GoodreadsService from '$lib/server/goodreadsService';
import { createApiResponse, withExternalApiFallback } from '$lib/server/api-utils';
import { CACHE_CONTROL } from '$lib/server/cache-control';

export const GET: RequestHandler = async ({ fetch }) => {
	return withExternalApiFallback(async () => {
		const books = await GoodreadsService.fetchCurrentlyReadingShelf(fetch);
		return createApiResponse(books, {
			cacheControl: CACHE_CONTROL.HOUR
		});
	}, 'Goodreads currently-reading unavailable');
};
