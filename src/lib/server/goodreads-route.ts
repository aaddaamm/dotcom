import { createApiResponse, withExternalApiFallback } from '$lib/server/api-utils';
import { CACHE_CONTROL } from '$lib/server/cache-control';

export function createGoodreadsHandler<T>(
	fetchBooks: (fetchFn: typeof fetch) => Promise<T>,
	errorMessage: string
) {
	return async (fetchFn: typeof fetch) => {
		return withExternalApiFallback(async () => {
			const books = await fetchBooks(fetchFn);
			return createApiResponse(books, {
				cacheControl: CACHE_CONTROL.HOUR
			});
		}, errorMessage);
	};
}
