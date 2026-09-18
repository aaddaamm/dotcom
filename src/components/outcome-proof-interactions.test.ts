import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('outcome proof interactions', () => {
	const file = readFileSync(resolve('src/components/outcome-proof.svelte'), 'utf8');

	it('keeps every outcome visible without tab interaction', () => {
		expect(file).toContain('{#each outcomeProofPoints');
		expect(file).not.toContain('role="tab"');
		expect(file).not.toContain('activeIndex');
	});

	it('links outcomes to their case studies without motion dependencies', () => {
		expect(file).toContain('href={point.href}');
		expect(file).not.toContain('svelte/transition');
	});
});
