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

export function getAllPosts(): BlogPost[] {
	if (!fs.existsSync(BLOG_DIR)) return [];

	const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

	const posts = files
		.map((file) => {
			const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
			const { data } = matter(raw);

			return {
				slug: file.replace(/\.md$/, ''),
				title: data.title ?? '',
				description: data.description ?? '',
				date: data.date ?? '',
				tags: data.tags ?? [],
				published: data.published ?? false
			} satisfies BlogPost;
		})
		.filter((p) => p.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
	const filePath = path.join(BLOG_DIR, `${slug}.md`);

	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);

	if (!data.published) return null;

	return {
		slug,
		title: data.title ?? '',
		description: data.description ?? '',
		date: data.date ?? '',
		tags: data.tags ?? [],
		published: true,
		content: marked.parse(content, { async: false }) as string
	};
}
