import matter from 'gray-matter';
import { dev } from '$app/environment';

export function filenameToSlug(filepath: string): string | null {
	const filename = filepath.split('/').pop();
	if (!filename) return null;
	return filename.replace(/\.md$/, '');
}

export function parseMarkdownFrontmatter<T>(raw: string): {
	data: T;
	content: string;
} {
	const { data, content } = matter(raw);
	return {
		data: data as T,
		content
	};
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

export function asNonEmptyString(value: unknown): string | null {
	return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

export function asStringArray(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value.filter((item): item is string => typeof item === 'string');
}

export function asBoolean(value: unknown, fallback = false): boolean {
	return typeof value === 'boolean' ? value : fallback;
}

export function reportFrontmatterIssue(filepath: string, reason: string) {
	if (!dev) return;
	console.warn(`[frontmatter] ${filepath}: ${reason}`);
}
