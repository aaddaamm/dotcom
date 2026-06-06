import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getAllPosts, type BlogPost } from '$lib/server/blog';

export const prerender = true;

function sortFeaturedPosts(posts: BlogPost[]): BlogPost[] {
	return posts.sort((a: BlogPost, b: BlogPost) => {
		if ((a.featured ?? false) !== (b.featured ?? false)) {
			return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		}
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export const load = (() => {
	const showDrafts = dev || env.SHOW_DRAFTS === 'true';
	return { posts: sortFeaturedPosts(getAllPosts(showDrafts)) };
}) satisfies PageServerLoad;
