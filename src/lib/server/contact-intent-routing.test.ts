import { describe, expect, it } from "vitest";
import { formatInquirySubject, inferInquiryIntent } from "./contactEmail";

describe("contact intent routing", () => {
	it("detects full-time intent", () => {
		expect(inferInquiryIntent("Full-time opportunity")).toBe("full-time");
	});

	it("detects contract intent", () => {
		expect(inferInquiryIntent("Contract / Freelance project")).toBe("contract");
	});

	it("detects consulting intent", () => {
		expect(inferInquiryIntent("Technical consulting")).toBe("consulting");
	});

	it("falls back to general intent", () => {
		expect(inferInquiryIntent("Something else")).toBe("general");
	});

	it("formats subject with intent label and sender name", () => {
		expect(formatInquirySubject("Ada Lovelace", "Technical consulting")).toBe(
			"[Consulting] New inquiry from Ada Lovelace",
		);
	});
});
