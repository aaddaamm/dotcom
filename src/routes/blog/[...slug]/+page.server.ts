import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getAllPosts, getPostBySlug } from '$lib/server/blog';
import { blogTagToWorkSlugs, selectedWork } from '$lib/copy';

export const prerender = true;

export function load({ params }) {
	const showDrafts = dev || env.SHOW_DRAFTS === 'true';
	const post = getPostBySlug(params.slug, showDrafts);

	if (!post) {
		error(404, 'Post not found');
	}

	const allPosts = getAllPosts(showDrafts).filter((candidate) => candidate.slug !== post.slug);
	const postTags = new Set(post.tags);
	const relatedByTag = allPosts
		.map((candidate) => {
			const overlap = candidate.tags.filter((tag) => postTags.has(tag)).length;
			return { candidate, overlap };
		})
		.filter((entry) => entry.overlap > 0)
		.sort((a, b) => {
			if (b.overlap !== a.overlap) return b.overlap - a.overlap;
			return new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime();
		})
		.map((entry) => entry.candidate);
	const fallbackPosts = allPosts
		.filter((candidate) => !relatedByTag.some((related) => related.slug === candidate.slug))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	const relatedPosts = [...relatedByTag, ...fallbackPosts].slice(0, 3);

	const workSlugSet = new Set<string>();
	for (const tag of post.tags) {
		for (const slug of blogTagToWorkSlugs[tag] ?? []) {
			workSlugSet.add(slug);
		}
	}
	const relatedWork = selectedWork.filter((project) => workSlugSet.has(project.slug));

	return { post, relatedPosts, relatedWork };
}
