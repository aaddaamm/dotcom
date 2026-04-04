import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
};

export type BlogPostWithContent = BlogPost & {
	content: string;
};

const BLOG_DIR = path.resolve('src/content/blog');
const DRAFTS_DIR = path.join(BLOG_DIR, 'drafts');

export function getAllPosts(includeDrafts = false): BlogPost[] {
	if (!fs.existsSync(BLOG_DIR)) return [];

	const readDir = (dir: string, slugPrefix = '') =>
		fs.existsSync(dir)
			? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((file) => ({ file, dir, slug: slugPrefix + file.replace(/\.md$/, '') }))
			: [];

	const entries = [
		...readDir(BLOG_DIR),
		...(includeDrafts ? readDir(DRAFTS_DIR, 'drafts/') : [])
	];

	const posts = entries
		.map(({ file, dir, slug }) => {
			const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
			const { data } = matter(raw);

			return {
				slug,
				title: data.title ?? '',
				description: data.description ?? '',
				date: data.date ?? '',
				tags: data.tags ?? [],
				published: data.published ?? false
			} satisfies BlogPost;
		})
		.filter((p) => p.published || includeDrafts)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export function getPostBySlug(slug: string, includeDrafts = false): BlogPostWithContent | null {
	// Support drafts/some-slug routing
	const isDraft = slug.startsWith('drafts/');
	const actualSlug = isDraft ? slug.slice('drafts/'.length) : slug;
	const filePath = isDraft
		? path.join(DRAFTS_DIR, `${actualSlug}.md`)
		: path.join(BLOG_DIR, `${slug}.md`);

	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);

	if (!data.published && !includeDrafts) return null;

	return {
		slug,
		title: data.title ?? '',
		description: data.description ?? '',
		date: data.date ?? '',
		tags: data.tags ?? [],
		published: data.published ?? false,
		content: marked.parse(content, { async: false }) as string
	};
}
