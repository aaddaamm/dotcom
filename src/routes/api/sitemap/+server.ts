import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllPosts } from '$lib/server/blog';
import { SITE_URL } from '$lib/constants';

export async function GET() {
	const sitemap = new SitemapStream({ hostname: SITE_URL });

	const now = new Date().toISOString().split('T')[0];

	sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0, lastmod: now });
	sitemap.write({ url: '/work', changefreq: 'monthly', priority: 0.8, lastmod: now });
	sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.9, lastmod: now });
	sitemap.write({ url: '/hire', changefreq: 'monthly', priority: 0.9, lastmod: now });
	sitemap.write({ url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: now });

	for (const post of getAllPosts()) {
		sitemap.write({
			url: `/blog/${post.slug}`,
			changefreq: 'yearly',
			priority: 0.7,
			lastmod: post.date
		});
	}

	sitemap.write({ url: '/play', changefreq: 'weekly', priority: 0.6, lastmod: now });
	sitemap.write({ url: '/teach', changefreq: 'monthly', priority: 0.7, lastmod: now });

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
