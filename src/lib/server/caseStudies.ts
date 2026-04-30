import matter from 'gray-matter';

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

	for (const [filepath, raw] of Object.entries(caseStudyRaw)) {
		const filename = filepath.split('/').pop();
		if (!filename) continue;

		const slug = filename.replace(/\.md$/, '');
		const { data } = matter(raw as string);
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
