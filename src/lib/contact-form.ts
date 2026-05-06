import type { ContactIntent } from "$lib/analytics";

export const inquiryIntentOptions = [
	"Full-time role",
	"Contract engagement",
	"Technical consulting",
	"Speaking",
	"Collaboration",
	"General",
];

export const projectTypeOptions = [
	"Platform modernization",
	"New feature delivery",
	"Legacy stabilization / tech debt",
	"Team leadership / tech lead support",
	"Architecture or systems design",
	"Other",
];

export const timelineOptions = ["ASAP", "2-4 weeks", "1-2 months", "2+ months"];

export const budgetOptions = ["Under $5k", "$5k-$15k", "$15k-$50k", "$50k+"];

export function inferIntent(
	intent: string,
	projectType: string,
): ContactIntent {
	const selected = intent.trim().toLowerCase();
	if (selected.includes("full-time")) return "full-time";
	if (selected.includes("contract")) return "contract";
	if (selected.includes("consulting")) return "consulting";
	if (selected.includes("speaking")) return "speaking";
	if (selected.includes("collaboration")) return "collaboration";

	const project = projectType.trim().toLowerCase();
	if (project.includes("full-time")) return "full-time";
	if (project.includes("contract") || project.includes("freelance"))
		return "contract";
	if (project.includes("consulting")) return "consulting";
	return "general";
}

export function isFallbackSuccessMessage(message: string): boolean {
	const value = message.toLowerCase();
	return (
		value.includes("submission was saved") ||
		value.includes("hiccup on our end")
	);
}

export function getFriendlyErrorMessage(
	message: string,
	status?: number,
): string {
	if (
		status === 429 ||
		message.toLowerCase().includes("too many submissions")
	) {
		return "You’ve hit the submission limit for now. Please wait 15 minutes, then try again.";
	}

	if (
		status === 400 &&
		(message.toLowerCase().includes("missing required") ||
			message.toLowerCase().includes("invalid"))
	) {
		return "Please review your details and try again.";
	}

	if (status && status >= 500) {
		return "Thanks — something broke on my side, but your message may still have been received. Please retry or email me directly.";
	}

	return message || "Something went wrong. Please try again.";
}
