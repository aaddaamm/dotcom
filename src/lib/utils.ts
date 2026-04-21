import { SITE_URL } from './constants';

export function formatPostDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

export function jsonLd(obj: unknown): string {
	return JSON.stringify(obj)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026');
}

export function breadcrumbList(items: Array<{ name: string; path: string }>) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`
		}))
	};
}
