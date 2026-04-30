import { renderMarkdown } from '$lib/server/markdown';
import {
	filenameToSlug,
	parseMarkdownFrontmatter,
	asNonEmptyString,
	asStringArray,
	asBoolean,
	isRecord,
	reportFrontmatterIssue,
	type FrontmatterValidationResult
} from '$lib/server/content-frontmatter';

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	updated?: string;
	tags: string[];
	published: boolean;
	featured?: boolean;
	status?: 'draft' | 'review' | 'ready';
	reviewed?: boolean;
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

type BlogStatus = 'draft' | 'review' | 'ready';

type BlogFrontmatter = {
	title: string;
	description: string;
	date: string;
	updated?: string;
	tags: string[];
	published: boolean;
	featured: boolean;
	status?: BlogStatus;
	reviewed: boolean;
	image?: string;
};

function isBlogStatus(value: unknown): value is BlogStatus {
	return value === 'draft' || value === 'review' || value === 'ready';
}

function toBlogFrontmatter(data: unknown): FrontmatterValidationResult<BlogFrontmatter> {
	if (!isRecord(data)) return { frontmatter: null, reason: 'frontmatter is not an object' };
	const record = data;
	const title = asNonEmptyString(record.title);
	const date = asNonEmptyString(record.date);
	if (!title || !date) return { frontmatter: null, reason: 'missing required title/date' };

	return {
		frontmatter: {
			title,
			description: asNonEmptyString(record.description) ?? '',
			date,
			updated: asNonEmptyString(record.updated) ?? undefined,
			tags: asStringArray(record.tags),
			published: asBoolean(record.published, false),
			featured: asBoolean(record.featured, false),
			status: isBlogStatus(record.status) ? record.status : undefined,
			reviewed: asBoolean(record.reviewed, false),
			image: asNonEmptyString(record.image) ?? undefined
		}
	};
}

function parseEntry(
	filepath: string,
	raw: string,
	slugPrefix = ''
): (BlogPost & { _content: string }) | null {
	const baseSlug = filenameToSlug(filepath);
	if (!baseSlug) return null;
	const slug = slugPrefix + baseSlug;
	const { data, content } = parseMarkdownFrontmatter<unknown>(raw);
	const { frontmatter, reason } = toBlogFrontmatter(data);
	if (!frontmatter) {
		reportFrontmatterIssue(filepath, reason ?? 'invalid frontmatter');
		return null;
	}
	return {
		slug,
		title: frontmatter.title,
		description: frontmatter.description,
		date: frontmatter.date,
		updated: frontmatter.updated,
		tags: frontmatter.tags,
		published: frontmatter.published,
		featured: frontmatter.featured,
		status: frontmatter.status,
		reviewed: frontmatter.reviewed,
		image: frontmatter.image,
		_content: content
	};
}

function appendParsedPosts(
	posts: BlogPost[],
	source: Record<string, unknown>,
	options?: {
		slugPrefix?: string;
		includeUnpublished?: boolean;
	}
) {
	const { slugPrefix = '', includeUnpublished = false } = options ?? {};

	for (const [filepath, raw] of Object.entries(source)) {
		const entry = parseEntry(filepath, raw as string, slugPrefix);
		if (!entry) continue;
		if (!entry.published && !includeUnpublished) continue;
		const { _content: _, ...post } = entry;
		posts.push(post);
	}
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
	const posts: BlogPost[] = [];

	appendParsedPosts(posts, publishedRaw, { includeUnpublished: includeDrafts });

	if (includeDrafts) {
		appendParsedPosts(posts, draftsRaw, {
			slugPrefix: 'drafts/',
			includeUnpublished: true
		});
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
		content: renderMarkdown(_content),
		wordCount
	};
}
