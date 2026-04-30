import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	redirect(301, '/api/sitemap');
};
