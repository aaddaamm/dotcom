import { dev } from '$app/environment';
import { getAllPosts } from '$lib/server/blog';

export function load() {
	return { posts: getAllPosts(dev) };
}
