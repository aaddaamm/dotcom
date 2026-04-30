import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("hero dual intent messaging", () => {
	const heroPath = resolve("src/components/hero-section.svelte");
	const hero = readFileSync(heroPath, "utf8");

	it("includes explicit full-time and contract audience language", () => {
		expect(hero).toContain("full-time");
		expect(hero).toContain("contract");
		expect(hero).toContain("Hiring manager");
		expect(hero).toContain("Need contract help");
	});

	it("keeps contact as primary CTA ahead of secondary options", () => {
		const contactIndex = hero.indexOf("Start a conversation");
		const hireIndex = hero.indexOf("See hiring fit");
		const resumeIndex = hero.indexOf("Download résumé");

		expect(contactIndex).toBeGreaterThan(-1);
		expect(hireIndex).toBeGreaterThan(-1);
		expect(resumeIndex).toBeGreaterThan(-1);
		expect(contactIndex).toBeLessThan(hireIndex);
		expect(hireIndex).toBeLessThan(resumeIndex);
	});
});
