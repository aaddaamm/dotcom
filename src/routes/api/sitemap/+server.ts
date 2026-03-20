import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
	const sitemap = new SitemapStream({ hostname: 'https://www.adamrobinson.tech' });

	sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
	sitemap.write({ url: '/work', changefreq: 'monthly', priority: 0.8 });
	sitemap.write({ url: '/play', changefreq: 'yearly', priority: 0.5 });
	sitemap.write({ url: '/contact', changefreq: 'yearly', priority: 0.5 });
	sitemap.write({ url: '/teach', changefreq: 'yearly', priority: 0.5 });

	sitemap.end();

	const sitemapData = await streamToPromise(sitemap).then((data) => data.toString());

	return new Response(sitemapData, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
