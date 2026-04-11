import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getAllPosts } from '$lib/server/blog';

export function load() {
	return { posts: getAllPosts(dev || !!env.SHOW_DRAFTS) };
}
