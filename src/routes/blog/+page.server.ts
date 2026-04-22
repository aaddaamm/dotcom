import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getAllPosts } from '$lib/server/blog';

export const prerender = true;

export function load() {
	const showDrafts = dev || env.SHOW_DRAFTS === 'true';
	return { posts: getAllPosts(showDrafts) };
}
