import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('hero positioning', () => {
	const heroPath = resolve('src/components/hero-section.svelte');
	const hero = readFileSync(heroPath, 'utf8');

	it('renders the approved ownership message and selective consulting note', () => {
		expect(hero).toContain('{positioning.headline}');
		expect(hero).toContain('{positioning.summary}');
		expect(hero).toContain('{positioning.consultingNote}');
		expect(hero).not.toContain('Full-time product teams:');
		expect(hero).not.toContain('Contract engagements:');
	});

	it('keeps contact as primary CTA ahead of secondary options', () => {
		const contactIndex = hero.indexOf('Start a conversation');
		const workIndex = hero.indexOf('Explore selected work');
		const resumeIndex = hero.indexOf('Download résumé');

		expect(contactIndex).toBeGreaterThan(-1);
		expect(workIndex).toBeGreaterThan(-1);
		expect(resumeIndex).toBeGreaterThan(-1);
		expect(contactIndex).toBeLessThan(workIndex);
		expect(workIndex).toBeLessThan(resumeIndex);
	});
});
