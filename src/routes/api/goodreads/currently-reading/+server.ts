import GoodreadsService from '$lib/server/goodreadsService';

export async function GET() {
	const books = await GoodreadsService.fetchCurrentlyReadingShelf();

	return new Response(JSON.stringify(books), {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
