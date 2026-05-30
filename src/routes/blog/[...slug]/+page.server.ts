import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getAllPosts, getPostBySlug } from '$lib/server/blog';
import { blogTagToWorkSlugs, selectedWork } from '$lib/copy';

export const prerender = true;

function rankRelatedPosts(showDrafts: boolean, currentSlug: string, tags: string[]) {
	const allPosts = getAllPosts(showDrafts).filter((candidate) => candidate.slug !== currentSlug);
	const postTags = new Set(tags);
	const scored = allPosts
		.map((candidate) => ({
			candidate,
			overlap: candidate.tags.filter((tag) => postTags.has(tag)).length
		}))
		.sort((a, b) => {
			if (b.overlap !== a.overlap) return b.overlap - a.overlap;
			return new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime();
		});

	const relatedByTag = scored.filter((entry) => entry.overlap > 0).map((entry) => entry.candidate);
	const fallbackPosts = scored
		.filter((entry) => entry.overlap === 0)
		.map((entry) => entry.candidate)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return [...relatedByTag, ...fallbackPosts].slice(0, 3);
}

function getRelatedWork(tags: string[]) {
	const workSlugSet = new Set<string>();
	for (const tag of tags) {
		for (const slug of blogTagToWorkSlugs[tag] ?? []) workSlugSet.add(slug);
	}
	return selectedWork.filter((project) => workSlugSet.has(project.slug));
}

export const load: PageServerLoad = ({ params }) => {
	const showDrafts = dev || env.SHOW_DRAFTS === 'true';
	const post = getPostBySlug(params.slug, showDrafts);
	if (!post) error(404, 'Post not found');

	return {
		post,
		relatedPosts: rankRelatedPosts(showDrafts, post.slug, post.tags),
		relatedWork: getRelatedWork(post.tags)
	};
};
