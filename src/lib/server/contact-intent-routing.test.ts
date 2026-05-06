import { describe, expect, it } from "vitest";
import { inferIntent } from "$lib/contact-form";
import { formatInquirySubject } from "./contactEmail";

describe("contact intent routing", () => {
	it("detects full-time intent", () => {
		expect(inferIntent("Full-time role", "Platform modernization")).toBe(
			"full-time",
		);
	});

	it("detects contract intent", () => {
		expect(inferIntent("Contract engagement", "New feature delivery")).toBe(
			"contract",
		);
	});

	it("detects consulting intent", () => {
		expect(
			inferIntent("Technical consulting", "Architecture or systems design"),
		).toBe("consulting");
	});

	it("falls back to general intent", () => {
		expect(inferIntent("General", "Other")).toBe("general");
	});

	it("formats subject with intent label and sender name", () => {
		expect(
			formatInquirySubject(
				"Ada Lovelace",
				"Technical consulting",
				"Architecture review",
			),
		).toBe("[Consulting] New inquiry from Ada Lovelace");
	});
});
