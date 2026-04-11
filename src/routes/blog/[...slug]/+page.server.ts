import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getPostBySlug } from '$lib/server/blog';

export const prerender = true;

export function load({ params }) {
	const post = getPostBySlug(params.slug, dev || !!env.SHOW_DRAFTS);

	if (!post) {
		error(404, 'Post not found');
	}

	return { post };
}
