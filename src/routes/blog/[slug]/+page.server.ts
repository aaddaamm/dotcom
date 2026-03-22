import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/server/blog';

export function load({ params }) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	return { post };
}
