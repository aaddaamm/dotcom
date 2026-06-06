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

type RequiredCaseStudyFields = Pick<
	CaseStudyFrontmatter,
	'title' | 'audience' | 'situation' | 'approach' | 'outcome'
>;

function getRequiredCaseStudyFields(
	record: Record<string, unknown>
): RequiredCaseStudyFields | null {
	const fields = {
		title: asNonEmptyString(record.title),
		audience: asNonEmptyString(record.audience),
		situation: asNonEmptyString(record.situation),
		approach: asNonEmptyString(record.approach),
		outcome: asNonEmptyString(record.outcome)
	};

	if (Object.values(fields).some((value) => value === null)) return null;

	return fields as RequiredCaseStudyFields;
}

function toCaseStudyFrontmatter(data: unknown): FrontmatterValidationResult<CaseStudyFrontmatter> {
	if (!isRecord(data)) return { frontmatter: null, reason: 'frontmatter is not an object' };
	const record = data;
	const fields = getRequiredCaseStudyFields(record);
	const isAnonymized = record.confidentiality === 'anonymized';

	if (!fields || !isAnonymized) {
		return {
			frontmatter: null,
			reason: 'missing required anonymized case-study fields'
		};
	}

	return {
		frontmatter: {
			...fields,
			confidentiality: 'anonymized'
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
