import { redirect } from '@sveltejs/kit';

export function GET() {
	redirect(301, '/api/sitemap');
}
