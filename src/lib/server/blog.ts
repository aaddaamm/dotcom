import matter from 'gray-matter';
import { marked } from 'marked';

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
	image?: string;
};

export type BlogPostWithContent = BlogPost & {
	content: string;
	wordCount: number;
};

// Bundled at build time by Vite — works in Vercel serverless
const publishedRaw = import.meta.glob('/src/content/blog/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});
const draftsRaw = import.meta.glob('/src/content/blog/drafts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

function parseEntry(
	filepath: string,
	raw: string,
	slugPrefix = ''
): (BlogPost & { _content: string }) | null {
	const filename = filepath.split('/').pop();
	if (!filename) return null;
	const slug = slugPrefix + filename.replace(/\.md$/, '');
	const { data, content } = matter(raw);
	if (!data.title || !data.date) return null;
	return {
		slug,
		title: data.title,
		description: data.description ?? '',
		date: data.date,
		tags: data.tags ?? [],
		published: data.published ?? false,
		image: data.image,
		_content: content
	};
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
	const posts: BlogPost[] = [];

	for (const [filepath, raw] of Object.entries(publishedRaw)) {
		const entry = parseEntry(filepath, raw as string);
		if (entry && (entry.published || includeDrafts)) {
			const { _content: _, ...post } = entry;
			posts.push(post);
		}
	}

	if (includeDrafts) {
		for (const [filepath, raw] of Object.entries(draftsRaw)) {
			const entry = parseEntry(filepath, raw as string, 'drafts/');
			if (entry) {
				const { _content: _, ...post } = entry;
				posts.push(post);
			}
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, includeDrafts = false): BlogPostWithContent | null {
	const isDraft = slug.startsWith('drafts/');
	const actualSlug = isDraft ? slug.slice('drafts/'.length) : slug;
	const source = isDraft ? draftsRaw : publishedRaw;

	const filepath = Object.keys(source).find((f) => f.endsWith(`/${actualSlug}.md`));
	if (!filepath) return null;

	const entry = parseEntry(filepath, source[filepath] as string, isDraft ? 'drafts/' : '');
	if (!entry) return null;
	if (!entry.published && !includeDrafts) return null;

	const { _content, ...post } = entry;
	const wordCount = _content.trim().split(/\s+/).length;
	return {
		...post,
		content: marked.parse(_content, { async: false }) as string,
		wordCount
	};
}
