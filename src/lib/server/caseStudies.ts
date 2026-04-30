import { filenameToSlug, parseMarkdownFrontmatter } from '$lib/server/content-frontmatter';

export type AnonymizedCaseStudy = {
	slug: string;
	title: string;
	audience: string;
	confidentiality: 'anonymized';
	situation: string;
	approach: string;
	outcome: string;
};

const caseStudyRaw = import.meta.glob('/src/content/case-studies/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

export function getAnonymizedCaseStudies(): AnonymizedCaseStudy[] {
	const studies: AnonymizedCaseStudy[] = [];

	type CaseStudyFrontmatter = {
		title?: string;
		audience?: string;
		confidentiality?: string;
		situation?: string;
		approach?: string;
		outcome?: string;
	};

	for (const [filepath, raw] of Object.entries(caseStudyRaw)) {
		const slug = filenameToSlug(filepath);
		if (!slug) continue;

		const { data } = parseMarkdownFrontmatter<CaseStudyFrontmatter>(raw as string);
		if (
			!data.title ||
			!data.audience ||
			!data.situation ||
			!data.approach ||
			!data.outcome ||
			data.confidentiality !== 'anonymized'
		) {
			continue;
		}

		studies.push({
			slug,
			title: data.title,
			audience: data.audience,
			confidentiality: 'anonymized',
			situation: data.situation,
			approach: data.approach,
			outcome: data.outcome
		});
	}

	return studies;
}
