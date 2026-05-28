export const CACHE_CONTROL = {
	DAY: 's-maxage=86400, stale-while-revalidate=3600',
	HOUR: 's-maxage=3600, stale-while-revalidate=600'
} as const;

export function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
