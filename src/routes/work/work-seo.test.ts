import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pageSeo } from '$lib/seo';

describe('work evidence and SEO', () => {
	const index = readFileSync(resolve('src/routes/work/+page.svelte'), 'utf8');
	const detail = readFileSync(resolve('src/routes/work/[slug]/+page.svelte'), 'utf8');

	it('leads work with evidence and links to indexable case studies', () => {
		expect(pageSeo.work.description).toContain('case studies');
		expect(index).toContain('Constraints, contribution, and outcomes');
		expect(detail).toContain('<CaseStudy');
		expect(detail).toContain('title="{projectCompany} Case Study — Adam Robinson"');
	});
});
