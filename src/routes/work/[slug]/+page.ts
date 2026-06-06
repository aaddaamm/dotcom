import type { EntryGenerator, PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { selectedWork, type WorkItem } from '$lib/copy';

export const entries = (() => {
	return selectedWork.map((work: WorkItem) => ({ slug: work.slug }));
}) satisfies EntryGenerator;

export const load = (({ params }) => {
	const index = selectedWork.findIndex((work: WorkItem) => work.slug === params.slug);

	if (index === -1) {
		error(404, 'Case study not found');
	}

	return {
		project: selectedWork[index],
		prev: index > 0 ? selectedWork[index - 1] : null,
		next: index < selectedWork.length - 1 ? selectedWork[index + 1] : null
	};
}) satisfies PageLoad;
