import matter from 'gray-matter';

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
