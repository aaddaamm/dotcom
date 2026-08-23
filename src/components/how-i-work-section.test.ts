import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('how I work section', () => {
	const section = readFileSync(resolve('src/components/how-i-work-section.svelte'), 'utf8');

	it('renders one labelled section with the approved working-practice copy', () => {
		expect(section).toContain('<section aria-labelledby="how-i-work-heading"');
		expect(section).toContain('{positioning.workingStyle}');
		expect(section).toContain('{positioning.aiPractice}');
		expect(section).toContain('{positioning.consultingNote}');
	});

	it('has no browser event handlers', () => {
		expect(section).not.toMatch(/on[a-z]+=/);
	});
});
