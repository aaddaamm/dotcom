import sanitizeHtml from 'sanitize-html';
import { marked, Renderer } from 'marked';
import { escapeHtml } from '$lib/server/utils';

const renderer = new Renderer();
renderer.html = ({ text }) => escapeHtml(text);

export const MARKDOWN_ALLOWED_TAGS = [
	'a',
	'blockquote',
	'br',
	'code',
	'em',
	'h2',
	'h3',
	'h4',
	'hr',
	'li',
	'ol',
	'p',
	'pre',
	'strong',
	'ul'
];

export function renderMarkdown(markdown: string): string {
	const html = marked.parse(markdown, { async: false, renderer }) as string;
	return sanitizeHtml(html, {
		allowedTags: MARKDOWN_ALLOWED_TAGS,
		allowedAttributes: {
			a: ['href', 'name', 'target', 'rel'],
			code: ['class']
		},
		allowedClasses: {
			code: [/^language-[\w-]+$/]
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		allowedSchemesByTag: {
			a: ['http', 'https', 'mailto']
		},
		transformTags: {
			a: (tagName, attribs) => {
				const href = attribs.href ?? '';
				const isExternal = /^https?:\/\//i.test(href);
				return {
					tagName,
					attribs: {
						...attribs,
						...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})
					}
				};
			}
		}
	});
}
