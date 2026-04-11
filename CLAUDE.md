# CLAUDE.md — adamrobinson.tech

SvelteKit 2 (Svelte 5) + TypeScript. Tailwind CSS 4 via `@tailwindcss/vite` — no config file, theme defined in `@theme` block in `app.css`. Hosted on Vercel.

## Code Style

- Tabs, single quotes, no trailing commas (see `.prettierrc`)
- `<script lang="ts">` in all Svelte components
- Component filenames lowercase (`footer.svelte`, `nav.svelte`)
- `$lib/` alias for lib imports
- Colors via CSS custom properties (`var(--color-text)`) — not Tailwind color classes

## Rules

- Follow `STYLEGUIDE.md` for all visual changes
- No component libraries — the site's value is its custom minimal feel
- Accent color in exactly two places per view: cursor mark + one element. Never scattered.
- Theme persists via localStorage — inline script in `app.html` prevents FOUC; do not remove it
- Cursor blink animation on hero only — never in nav or other components
- Preserve `/api/goodreads/*` and `/api/sitemap` — production endpoints
- Run `npx vite build` before considering any task complete
- To preview draft blog posts on Vercel: set `SHOW_DRAFTS=true` on the preview environment

## Commands

| Command          | Purpose                   |
| ---------------- | ------------------------- |
| `npm run dev`    | Dev server                |
| `npx vite build` | Production build          |
| `npm run check`  | Svelte + TypeScript check |
| `npm run lint`   | Prettier + ESLint         |
| `npm run format` | Auto-format               |
