import type { Handle } from '@sveltejs/kit';

// CSP is configured in svelte.config.js so SvelteKit can emit nonce-based
// headers for SSR pages and hash-based meta tags for prerendered pages.
export const handle: Handle = async ({ event, resolve }) => resolve(event);
