import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getPostBySlug } from '$lib/server/blog';

export const prerender = true;

export function load({ params }) {
	const showDrafts = dev || env.SHOW_DRAFTS === 'true';
	const post = getPostBySlug(params.slug, showDrafts);

	if (!post) {
		error(404, 'Post not found');
	}

	return { post };
}
