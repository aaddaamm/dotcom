import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { getPostBySlug } from '$lib/server/blog';

export function load({ params }) {
	const post = getPostBySlug(params.slug, dev);

	if (!post) {
		error(404, 'Post not found');
	}

	return { post };
}
