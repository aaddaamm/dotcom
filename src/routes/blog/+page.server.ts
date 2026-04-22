import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getAllPosts } from '$lib/server/blog';

export const prerender = true;

export const load: PageServerLoad = () => {
	const showDrafts = dev || env.SHOW_DRAFTS === 'true';
	const posts = getAllPosts(showDrafts).sort((a, b) => {
		if ((a.featured ?? false) !== (b.featured ?? false)) {
			return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		}
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
	return { posts };
};
