import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
	const sitemap = new SitemapStream({ hostname: 'https://adamrobinson.tech' });

	sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0, lastmod: '2025-06-01' });
	sitemap.write({ url: '/work', changefreq: 'monthly', priority: 0.8, lastmod: '2025-06-01' });
	sitemap.write({ url: '/play', changefreq: 'weekly', priority: 0.6, lastmod: '2025-06-01' });
	sitemap.write({ url: '/contact', changefreq: 'yearly', priority: 0.4, lastmod: '2025-01-01' });
	sitemap.write({ url: '/teach', changefreq: 'yearly', priority: 0.4, lastmod: '2025-01-01' });

	sitemap.end();

	const sitemapData = await streamToPromise(sitemap).then((data) => data.toString());

	return new Response(sitemapData, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600'
		}
	});
}
