import { getAllPosts } from '$lib/server/blog';

export function load() {
	return { posts: getAllPosts() };
}
