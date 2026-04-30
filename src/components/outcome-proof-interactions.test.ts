import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("outcome proof interactions", () => {
	const file = readFileSync(
		resolve("src/components/outcome-proof.svelte"),
		"utf8",
	);

	it("renders interactive timeline tab buttons", () => {
		expect(file).toContain('role="tablist"');
		expect(file).toContain('role="tab"');
		expect(file).toContain("aria-selected");
	});

	it("renders panel with reduced-motion safe interaction state", () => {
		expect(file).toContain('role="tabpanel"');
		expect(file).toContain("prefers-reduced-motion");
	});
});
