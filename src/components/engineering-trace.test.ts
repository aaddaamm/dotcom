import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('engineering trace', () => {
	const file = readFileSync(resolve('src/components/engineering-trace.svelte'), 'utf8');

	it('uses an ordered, labelled evidence sequence', () => {
		expect(file).toContain('<ol');
		expect(file).toContain('{#each steps as step');
		expect(file).toContain('step.label');
		expect(file).toContain('step.text');
	});

	it('contains a reduced-motion-safe presentation', () => {
		expect(file).toContain('prefers-reduced-motion');
	});
});
