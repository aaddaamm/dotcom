import type { RequestHandler } from '@sveltejs/kit';
import GoodreadsService from '$lib/server/goodreadsService';
import { createGoodreadsHandler } from '$lib/server/goodreads-route';

const handlers = {
	read: createGoodreadsHandler(
		(fetchFn) => GoodreadsService.fetchReadShelf(fetchFn),
		'Goodreads read shelf unavailable'
	),
	'currently-reading': createGoodreadsHandler(
		(fetchFn) => GoodreadsService.fetchCurrentlyReadingShelf(fetchFn),
		'Goodreads currently-reading unavailable'
	)
} as const;

export const GET: RequestHandler = ({ fetch, params }) => {
	const handler = handlers[params.shelf as keyof typeof handlers];
	if (!handler) {
		return new Response(JSON.stringify({ error: 'Shelf not found' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return handler(fetch);
};
