import { describe, expect, it } from 'vitest';
import { getAnonymizedCaseStudies } from './caseStudies';

describe('anonymized case study schema', () => {
	it('returns studies with required fields', () => {
		const studies = getAnonymizedCaseStudies();

		expect(studies.length).toBeGreaterThanOrEqual(1);
		for (const study of studies) {
			expect(study.slug.length).toBeGreaterThan(0);
			expect(study.title.length).toBeGreaterThan(0);
			expect(study.audience.length).toBeGreaterThan(0);
			expect(study.confidentiality).toBe('anonymized');
			expect(study.situation.length).toBeGreaterThan(0);
			expect(study.approach.length).toBeGreaterThan(0);
			expect(study.outcome.length).toBeGreaterThan(0);
		}
	});
});
