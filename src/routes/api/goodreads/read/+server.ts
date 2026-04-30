import type { RequestHandler } from './$types';
import GoodreadsService from '$lib/server/goodreadsService';
import { createApiResponse, createApiErrorResponse } from '$lib/server/api-utils';
import { CACHE_CONTROL } from '$lib/server/cache-control';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		const books = await GoodreadsService.fetchReadShelf(fetch);
		return createApiResponse(books, {
			cacheControl: CACHE_CONTROL.HOUR
		});
	} catch {
		return createApiErrorResponse('Goodreads read shelf unavailable', {
			status: 503,
			statusText: 'Goodreads read shelf unavailable'
		});
	}
};
