import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllPosts } from '$lib/server/blog';
import { selectedWork } from '$lib/copy';
import { SITE_URL } from '$lib/constants';

const STATIC_LASTMOD = new Date().toISOString().slice(0, 10);

const staticRoutes: Array<{
	url: string;
	changefreq: 'weekly' | 'monthly';
	priority: number;
	lastmod?: string;
}> = [
	{ url: '/', changefreq: 'monthly', priority: 1.0, lastmod: STATIC_LASTMOD },
	{ url: '/work', changefreq: 'monthly', priority: 0.8, lastmod: STATIC_LASTMOD },
	{ url: '/contact', changefreq: 'monthly', priority: 0.9, lastmod: STATIC_LASTMOD },
	{ url: '/hire', changefreq: 'monthly', priority: 0.9, lastmod: STATIC_LASTMOD },
	{ url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: STATIC_LASTMOD },
	{ url: '/play', changefreq: 'weekly', priority: 0.6 },
	{ url: '/teach', changefreq: 'monthly', priority: 0.7, lastmod: STATIC_LASTMOD }
];

export async function GET() {
	const sitemap = new SitemapStream({ hostname: SITE_URL });

	for (const route of staticRoutes) {
		sitemap.write(route);
	}

	for (const project of selectedWork) {
		sitemap.write({
			url: `/work/${project.slug}`,
			changefreq: 'monthly',
			priority: 0.7,
			lastmod: STATIC_LASTMOD
		});
	}

	for (const post of getAllPosts()) {
		sitemap.write({
			url: `/blog/${post.slug}`,
			changefreq: 'yearly',
			priority: 0.7,
			lastmod: post.updated ?? post.date
		});
	}

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
