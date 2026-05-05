export const SITE_URL = "https://adamrobinson.tech";
export const EMAIL = "adam@adamrobinson.tech";
export const GITHUB_USERNAME = "aaddaamm";
export const LINKEDIN_HANDLE = "adam-robinson-tech";
export const X_HANDLE = "Adam623753";
export const INSTAGRAM_HANDLE = "adamrobinson7251";
export const FACEBOOK_PROFILE_ID = "61573468237603";

export const SOCIAL_URLS = {
	github: `https://github.com/${GITHUB_USERNAME}`,
	linkedin: `https://linkedin.com/in/${LINKEDIN_HANDLE}`,
	x: `https://x.com/${X_HANDLE}`,
	instagram: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`,
	facebook: `https://www.facebook.com/profile.php?id=${FACEBOOK_PROFILE_ID}`,
} as const;

export const TWITTER_HANDLE = `@${X_HANDLE}`;

export enum GOODREADS_SHELVES {
	CURRENTLY_READING = "currently-reading",
	READ = "read",
}
