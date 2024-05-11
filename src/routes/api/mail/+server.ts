// export function GET(req: Request, res: Response) {
export async function POST({ request }: { request: Request }) {
	const payload = await request.json();

	const body = `Name: ${payload.name}\nEmail: ${payload.email}\nMessage: ${payload.message}`;

	console.log(body);

	return new Response('success', {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
