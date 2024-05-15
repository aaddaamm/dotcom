// src/routes/api/sitemap.xml.js
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

export async function GET() {
	const sitemap = new SitemapStream({ hostname: 'https://www.adamrobinson.tech' });

	// Example URLs - you would dynamically add your own URLs
	sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
	sitemap.write({ url: '/work', changefreq: 'monthly', priority: 0.8 });
	sitemap.write({ url: '/play', changefreq: 'yearly', priority: 0.5 });
	sitemap.write({ url: '/contact', changefreq: 'yearly', priority: 0.5 });

	sitemap.end();

	const sitemapData = await streamToPromise(sitemap).then((data) => data.toString());

	// Save the sitemap to a file
	createWriteStream(resolve('static/sitemap.xml')).write(sitemapData);

	return new Response(sitemapData, {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
