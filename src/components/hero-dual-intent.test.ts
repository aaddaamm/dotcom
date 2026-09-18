import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('hero positioning', () => {
	const heroPath = resolve('src/components/hero-section.svelte');
	const hero = readFileSync(heroPath, 'utf8');

	it('renders the approved message without competing consulting copy', () => {
		expect(hero).toContain('{positioning.headline}');
		expect(hero).toContain('{positioning.summary}');
		expect(hero).not.toContain('{positioning.consultingNote}');
		expect(hero).not.toContain('Full-time product teams:');
		expect(hero).not.toContain('Contract engagements:');
	});

	it('leads with work and provides a resume download', () => {
		const workIndex = hero.indexOf('Explore my work');
		const resumeIndex = hero.indexOf('Download résumé');

		expect(workIndex).toBeGreaterThan(-1);
		expect(resumeIndex).toBeGreaterThan(-1);
		expect(workIndex).toBeLessThan(resumeIndex);
	});
});
