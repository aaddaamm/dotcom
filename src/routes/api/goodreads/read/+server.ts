import GoodreadsService from '$lib/server/goodreadsService';

export async function GET() {
	const books = await GoodreadsService.fetchReadShelf();

	return new Response(JSON.stringify(books), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 's-maxage=3600, stale-while-revalidate=600'
		}
	});
}
