import type { RequestHandler } from './$types';
import GoodreadsService from '$lib/server/goodreadsService';
import { createApiResponse, createApiErrorResponse } from '$lib/server/api-utils';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const books = await GoodreadsService.fetchCurrentlyReadingShelf(fetch);
		return createApiResponse(books, {
			cacheControl: 's-maxage=3600, stale-while-revalidate=600'
		});
	} catch {
		return createApiErrorResponse('Goodreads currently-reading unavailable', {
			status: 503,
			statusText: 'Goodreads currently-reading unavailable'
		});
	}
};
