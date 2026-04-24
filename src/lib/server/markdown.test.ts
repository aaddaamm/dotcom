import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
	it('renders normal Markdown links and paragraphs', () => {
		const html = renderMarkdown('Read [the docs](https://example.com).');

		expect(html).toContain('<p>Read <a href="https://example.com"');
		expect(html).toContain('target="_blank"');
		expect(html).toContain('rel="noopener noreferrer"');
	});

	it('preserves internal links without opening a new tab', () => {
		const html = renderMarkdown('[Contact](/contact)');

		expect(html).toContain('<a href="/contact">Contact</a>');
		expect(html).not.toContain('target="_blank"');
	});

	it('escapes raw HTML before sanitizing', () => {
		const html = renderMarkdown('<script>alert("xss")</script><strong>safe</strong>');

		expect(html).not.toContain('<script>');
		expect(html).toContain('&lt;script&gt;alert("xss")&lt;/script&gt;');
		expect(html).toContain('&lt;strong&gt;safe&lt;/strong&gt;');
	});

	it('removes unsafe link protocols', () => {
		const html = renderMarkdown('[bad](javascript:alert(1))');

		expect(html).toContain('<a>bad</a>');
		expect(html).not.toContain('javascript:');
	});
});
