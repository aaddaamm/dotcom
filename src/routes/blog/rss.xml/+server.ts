import { getAllPosts } from '$lib/server/blog';
import { escapeHtml as escapeXml } from '$lib/server/utils';
import { SITE_URL as base } from '$lib/constants';

export const prerender = true;

export function GET() {
	const posts = getAllPosts();

	const items = posts
		.map(
			(post) => `		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${base}/blog/${post.slug}</link>
			<guid isPermaLink="true">${base}/blog/${post.slug}</guid>
			<description>${escapeXml(post.description)}</description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Adam Robinson — Blog</title>
		<link>${base}/blog</link>
		<description>Writing about backend systems, workflow design, and software engineering.</description>
		<language>en-us</language>
		<atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 's-maxage=3600, stale-while-revalidate=600'
		}
	});
}
