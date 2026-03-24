import GoodreadsService from '$lib/server/goodreadsService';
import { createApiResponse } from '$lib/server/api-utils';

export async function GET() {
	const books = await GoodreadsService.fetchCurrentlyReadingShelf();

	return createApiResponse(books, {
		cacheControl: 's-maxage=3600, stale-while-revalidate=600'
	});
}
