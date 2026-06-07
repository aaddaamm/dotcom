export const SITE_URL = 'https://www.adamrobinson.tech';
export const SITE_CONTENT_LASTMOD = '2026-06-06';
export const EMAIL = 'adam@adamrobinson.tech';
export const ROLE_TITLE = 'Senior Software Engineer';
export const GITHUB_USERNAME = 'aaddaamm';
const LINKEDIN_HANDLE = 'adam-robinson-tech';
const X_HANDLE = 'Adam623753';
const INSTAGRAM_HANDLE = 'adamrobinson7251';
const FACEBOOK_PROFILE_ID = '61573468237603';

export const SOCIAL_URLS = {
	github: `https://github.com/${GITHUB_USERNAME}`,
	linkedin: `https://linkedin.com/in/${LINKEDIN_HANDLE}`,
	x: `https://x.com/${X_HANDLE}`,
	instagram: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`,
	facebook: `https://www.facebook.com/profile.php?id=${FACEBOOK_PROFILE_ID}`
} as const;

export const TWITTER_HANDLE = `@${X_HANDLE}`;

export enum GOODREADS_SHELVES {
	CURRENTLY_READING = 'currently-reading',
	READ = 'read'
}
