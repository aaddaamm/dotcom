import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllPosts } from '$lib/server/blog';
import { selectedWork } from '$lib/copy';
import { SITE_URL } from '$lib/constants';

export async function GET() {
	const sitemap = new SitemapStream({ hostname: SITE_URL });

	sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0, lastmod: '2026-04-19' });
	sitemap.write({ url: '/work', changefreq: 'monthly', priority: 0.8, lastmod: '2026-04-19' });

	for (const project of selectedWork) {
		sitemap.write({
			url: `/work/${project.slug}`,
			changefreq: 'monthly',
			priority: 0.7,
			lastmod: '2026-04-19'
		});
	}

	sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.9, lastmod: '2026-04-19' });
	sitemap.write({ url: '/hire', changefreq: 'monthly', priority: 0.9, lastmod: '2026-04-19' });
	sitemap.write({ url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: '2026-04-19' });

	for (const post of getAllPosts()) {
		sitemap.write({
			url: `/blog/${post.slug}`,
			changefreq: 'yearly',
			priority: 0.7,
			lastmod: post.date
		});
	}

	sitemap.write({ url: '/play', changefreq: 'weekly', priority: 0.6 });
	sitemap.write({ url: '/teach', changefreq: 'monthly', priority: 0.7, lastmod: '2025-11-01' });

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
