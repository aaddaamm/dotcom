import type { Handle } from '@sveltejs/kit';

const CSP = [
	"default-src 'self'",
	// 'unsafe-inline' required for FOUC-prevention script in app.html and Vercel analytics injection
	"script-src 'self' 'unsafe-inline' va.vercel-scripts.com",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: https:",
	"connect-src 'self' vitals.vercel-insights.com",
	"font-src 'self'",
	"base-uri 'self'",
	"frame-ancestors 'none'",
	"object-src 'none'"
].join('; ');

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('Content-Security-Policy', CSP);
	return response;
};
