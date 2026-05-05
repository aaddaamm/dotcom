import { SOCIAL_URLS } from "$lib/constants";

export interface SocialLink {
	key: "github" | "linkedin" | "x" | "instagram" | "facebook";
	label: string;
	compactLabel: string;
	url: string;
}

export const socialLinks: SocialLink[] = [
	{
		key: "github",
		label: "github",
		compactLabel: "gh",
		url: SOCIAL_URLS.github,
	},
	{
		key: "linkedin",
		label: "linkedin",
		compactLabel: "in",
		url: SOCIAL_URLS.linkedin,
	},
	{ key: "x", label: "x", compactLabel: "x", url: SOCIAL_URLS.x },
	{
		key: "instagram",
		label: "instagram",
		compactLabel: "ig",
		url: SOCIAL_URLS.instagram,
	},
	{
		key: "facebook",
		label: "facebook",
		compactLabel: "fb",
		url: SOCIAL_URLS.facebook,
	},
];

export function toDisplayUrl(url: string): string {
	return url.replace("https://", "").replace(/\/$/, "");
}
