import { describe, expect, it } from 'vitest';
import {
	asBoolean,
	asNonEmptyString,
	asStringArray,
	filenameToSlug,
	isRecord,
	parseMarkdownFrontmatter
} from './content-frontmatter';

describe('content-frontmatter helpers', () => {
	it('extracts slugs from markdown file paths', () => {
		expect(filenameToSlug('/src/content/blog/hello-world.md')).toBe('hello-world');
		expect(filenameToSlug('/src/content/blog/no-extension')).toBe('no-extension');
	});

	it('parses markdown frontmatter and content', () => {
		const parsed = parseMarkdownFrontmatter<{ title: string }>('---\ntitle: test\n---\nhello');
		expect(parsed.data.title).toBe('test');
		expect(parsed.content.trim()).toBe('hello');
	});

	it('validates and normalizes primitive helper conversions', () => {
		expect(isRecord({ a: 1 })).toBe(true);
		expect(isRecord(null)).toBe(false);
		expect(asNonEmptyString(' x ')).toBe(' x ');
		expect(asNonEmptyString('')).toBeNull();
		expect(asStringArray(['a', 1, 'b'])).toEqual(['a', 'b']);
		expect(asBoolean(true)).toBe(true);
		expect(asBoolean('nope', true)).toBe(true);
	});
});
