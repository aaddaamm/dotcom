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

type Shelf = keyof typeof handlers;

function isShelf(value: string): value is Shelf {
	return value === 'read' || value === 'currently-reading';
}

export const GET: RequestHandler = ({ fetch, params }) => {
	if (!isShelf(params.shelf)) {
		return new Response(JSON.stringify({ error: 'Shelf not found' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return handlers[params.shelf](fetch);
};
