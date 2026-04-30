import {
	filenameToSlug,
	parseMarkdownFrontmatter,
	asNonEmptyString,
	isRecord,
	reportFrontmatterIssue,
	type FrontmatterValidationResult
} from '$lib/server/content-frontmatter';

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

type CaseStudyFrontmatter = {
	title: string;
	audience: string;
	confidentiality: 'anonymized';
	situation: string;
	approach: string;
	outcome: string;
};

function toCaseStudyFrontmatter(data: unknown): FrontmatterValidationResult<CaseStudyFrontmatter> {
	if (!isRecord(data)) return { frontmatter: null, reason: 'frontmatter is not an object' };
	const record = data;
	const title = asNonEmptyString(record.title);
	const audience = asNonEmptyString(record.audience);
	const situation = asNonEmptyString(record.situation);
	const approach = asNonEmptyString(record.approach);
	const outcome = asNonEmptyString(record.outcome);
	const confidentiality = record.confidentiality;

	if (
		!title ||
		!audience ||
		!situation ||
		!approach ||
		!outcome ||
		confidentiality !== 'anonymized'
	) {
		return {
			frontmatter: null,
			reason: 'missing required anonymized case-study fields'
		};
	}

	return {
		frontmatter: {
			title,
			audience,
			confidentiality,
			situation,
			approach,
			outcome
		}
	};
}

export function getAnonymizedCaseStudies(): AnonymizedCaseStudy[] {
	const studies: AnonymizedCaseStudy[] = [];

	for (const [filepath, raw] of Object.entries(caseStudyRaw)) {
		const slug = filenameToSlug(filepath);
		if (!slug) continue;

		const { data } = parseMarkdownFrontmatter<unknown>(raw as string);
		const { frontmatter, reason } = toCaseStudyFrontmatter(data);
		if (!frontmatter) {
			reportFrontmatterIssue(filepath, reason ?? 'invalid frontmatter');
			continue;
		}

		studies.push({
			slug,
			title: frontmatter.title,
			audience: frontmatter.audience,
			confidentiality: 'anonymized',
			situation: frontmatter.situation,
			approach: frontmatter.approach,
			outcome: frontmatter.outcome
		});
	}

	return studies;
}
