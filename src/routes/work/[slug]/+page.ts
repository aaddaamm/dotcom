import { error } from '@sveltejs/kit';
import { selectedWork } from '$lib/copy';

export const prerender = true;

export function load({ params }) {
	const index = selectedWork.findIndex((w) => w.slug === params.slug);

	if (index === -1) {
		error(404, 'Case study not found');
	}

	return {
		project: selectedWork[index],
		prev: index > 0 ? selectedWork[index - 1] : null,
		next: index < selectedWork.length - 1 ? selectedWork[index + 1] : null
	};
}
