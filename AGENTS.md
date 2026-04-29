# AGENTS.md — adamrobinson.tech

Personal website for Adam Robinson, Senior Software Engineer.

## Stack

- SvelteKit 2 / Svelte 5 / TypeScript / Vite 6
- Tailwind CSS 4 via `@tailwindcss/vite`; theme tokens live in `src/app.css`
- Vercel hosting with `@sveltejs/adapter-vercel`
- Vercel Analytics + Speed Insights
- Resend contact notifications; Upstash Redis for rate limits/cache
- Markdown blog posts in `src/content/blog/`

## Project rules

- Follow `STYLEGUIDE.md` for visual work.
- Do not add component libraries; keep the site custom and minimal.
- Use tabs, single quotes, no trailing commas.
- Use `<script lang="ts">` in Svelte components.
- Component filenames are lowercase kebab-case.
- Import app code through `$lib/` where appropriate.
- Use CSS custom properties (`var(--color-*)`) instead of hard-coded colors.
- Preserve production routes: `/api/contact`, `/api/github`, `/api/goodreads/*`, `/api/sitemap`.
- Keep the theme init script in `src/app.html`; it prevents wrong-theme flash.
- Cursor blink belongs on the hero only.
- CSP is set in `src/hooks.server.ts`; update it when adding third-party origins.

## Key paths

- `src/components/` — shared Svelte components
- `src/lib/copy.ts` — structured site copy
- `src/lib/constants.ts` — site-wide constants
- `src/lib/server/` — server-only integrations and API helpers
- `src/routes/` — pages and API routes
- `src/content/blog/` — published posts; `drafts/` is gated by `SHOW_DRAFTS`
- `docs/` — operational notes, audits, analytics, and blog workflow
- `static/` — logos, favicon, OG image, résumé, service worker, fonts

## Environment variables

- `RESEND_API_KEY` — contact notification email delivery
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` — Redis rate limits/cache
- `GITHUB_TOKEN` — `/api/github` public activity endpoint
- `SHOW_DRAFTS=true` — show draft posts in preview/dev flows

## Commands

| Command                     | Purpose                            |
| --------------------------- | ---------------------------------- |
| `npm run dev`               | Start dev server                   |
| `npm run check`             | Svelte + TypeScript checks         |
| `npm run lint`              | Prettier + ESLint                  |
| `npm run check:blog-drafts` | Draft frontmatter/readiness checks |
| `npm run build`             | Production build                   |

Run `npm run check` and `npm run build` before considering code changes complete.
