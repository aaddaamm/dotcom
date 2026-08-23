import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pageSeo } from '$lib/seo';

describe('hire page positioning', () => {
	const page = readFileSync(resolve('src/routes/hire/+page.svelte'), 'utf8');

	it('supports full-time roles before selective embedded consulting', () => {
		expect(page).toContain('Senior/staff role fit');
		expect(page).toContain('{positioning.consultingNote}');
		expect(page).not.toContain('contract/advisory engagements');
	});

	it('uses intent-aligned metadata', () => {
		expect(pageSeo.hire.title).toContain('Senior Software Engineer');
		expect(pageSeo.hire.description).toContain('embedded consulting');
	});
});
