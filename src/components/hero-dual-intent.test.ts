import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { heroMessaging } from '$lib/copy';

describe('hero dual intent messaging', () => {
	const heroPath = resolve('src/components/hero-section.svelte');
	const hero = readFileSync(heroPath, 'utf8');

	it('includes explicit full-time and contract audience language', () => {
		for (const keyword of heroMessaging.audienceKeywords) {
			expect(hero).toContain(keyword);
		}
		expect(heroMessaging.availability.length).toBeGreaterThan(20);
		expect(hero).toContain('{heroMessaging.availability}');
	});

	it('keeps contact as primary CTA ahead of secondary options', () => {
		const [primary, secondary, tertiary] = heroMessaging.ctaOrder;
		const contactIndex = hero.indexOf(primary);
		const hireIndex = hero.indexOf(secondary);
		const resumeIndex = hero.indexOf(tertiary);

		expect(contactIndex).toBeGreaterThan(-1);
		expect(hireIndex).toBeGreaterThan(-1);
		expect(resumeIndex).toBeGreaterThan(-1);
		expect(contactIndex).toBeLessThan(hireIndex);
		expect(hireIndex).toBeLessThan(resumeIndex);
	});
});
