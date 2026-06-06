import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getAllPosts, getPostBySlug, type BlogPost } from '$lib/server/blog';
import { blogTagToWorkSlugs, selectedWork, type WorkItem } from '$lib/copy';

export const prerender = true;

type ScoredPost = {
	candidate: BlogPost;
	overlap: number;
};

function rankRelatedPosts(showDrafts: boolean, currentSlug: string, tags: string[]): BlogPost[] {
	const allPosts = getAllPosts(showDrafts).filter(
		(candidate: BlogPost) => candidate.slug !== currentSlug
	);
	const postTags = new Set(tags);
	const scored = allPosts
		.map(
			(candidate: BlogPost): ScoredPost => ({
				candidate,
				overlap: candidate.tags.filter((tag: string) => postTags.has(tag)).length
			})
		)
		.sort((a: ScoredPost, b: ScoredPost) => {
			if (b.overlap !== a.overlap) return b.overlap - a.overlap;
			return new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime();
		});

	const relatedByTag = scored
		.filter((entry: ScoredPost) => entry.overlap > 0)
		.map((entry: ScoredPost) => entry.candidate);
	const fallbackPosts = scored
		.filter((entry: ScoredPost) => entry.overlap === 0)
		.map((entry: ScoredPost) => entry.candidate)
		.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return [...relatedByTag, ...fallbackPosts].slice(0, 3);
}

function getRelatedWork(tags: string[]): WorkItem[] {
	const workSlugSet = new Set<string>();
	for (const tag of tags) {
		for (const slug of blogTagToWorkSlugs[tag] ?? []) workSlugSet.add(slug);
	}
	return selectedWork.filter((project: WorkItem) => workSlugSet.has(project.slug));
}

export const load = (({ params }) => {
	const showDrafts = dev || env.SHOW_DRAFTS === 'true';
	const post = getPostBySlug(params.slug, showDrafts);
	if (!post) error(404, 'Post not found');

	return {
		post,
		relatedPosts: rankRelatedPosts(showDrafts, post.slug, post.tags),
		relatedWork: getRelatedWork(post.tags)
	};
}) satisfies PageServerLoad;
