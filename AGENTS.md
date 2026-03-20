# AGENTS.md — adamrobinson.tech

Personal website for Adam Robinson, Lead Software Engineer.

## Stack

- **Framework**: SvelteKit 2 (Svelte 5) with TypeScript
- **Styling**: Tailwind CSS 3 (no Skeleton UI — removed intentionally)
- **Font**: Inter (variable, self-hosted from `/static/fonts/`)
- **Database**: Prisma (Postgres)
- **Hosting**: Vercel (adapter-auto)
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights`

## Design System

This is a custom-designed personal site — not a dashboard or component showcase.

- **Dark theme only** — body background `#0a0a0f`, text `slate-*` scale
- **Accent color**: `accent-*` (blue-teal, based on sky-500 `#0ea5e9`), defined in `tailwind.config.ts`
- Accent appears in: heading periods (`.`), hero label, bullet points, card left borders, link hover states, the AI section card border/bg
- Section dividers use `border-white/[0.06]`
- Cards use `border-white/[0.06] bg-white/[0.02]`
- All styling is Tailwind utility classes — no CSS modules, no Skeleton classes, no `variant-*` classes

## Code Style

- Tabs for indentation, single quotes, no trailing commas (see `.prettierrc`)
- `<script lang="ts">` in all Svelte components
- Component filenames are lowercase (`footer.svelte`, `books.svelte`)
- Imports use `$lib/` alias for lib modules

## Project Structure

```
src/
  app.css            — Tailwind directives, font-face, body styles
  app.html           — HTML shell (always has class="dark" on <html>)
  components/        — Shared components (footer.svelte)
  lib/
    types.ts         — Shared types (Element, GoodreadsBook, etc.)
    constants.ts     — Enums (Goodreads shelves)
    helpers.ts       — Utility functions
    copy.ts          — Structured content for the /work page
    text.ts          — Typewriter text rendering engine
    server/          — Server-only modules (goodreadsService.ts)
  routes/
    +layout.svelte   — Root layout with sticky header, nav, Vercel analytics
    +page.svelte     — Homepage (hero, intro, work, AI, outside, contact)
    work/            — Work/experience page (typewriter animation)
    play/            — Reading page (Goodreads API integration)
    contact/         — Contact form (posts to /api/mail)
    teach/           — Interactive JS playground
    api/             — API routes (goodreads/, mail/, sitemap/)
```

## Key Rules

- **Do not add Skeleton UI** — it was intentionally removed. Use only Tailwind utilities.
- **Do not add component libraries** — the site's value is in its custom, minimal feel.
- **Keep the accent color subtle** — it should punctuate, not dominate.
- **Preserve existing API routes** — `/api/goodreads/*`, `/api/mail`, `/api/sitemap` are production endpoints.
- **The `/work` page uses a typewriter renderer** (`$lib/text.ts` + `$lib/copy.ts`) — don't replace this with static markup unless asked.
- **Verify with `npx vite build`** before considering work done.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (opens browser) |
| `npx vite build` | Production build |
| `npm run preview` | Preview production build |
| `npm run check` | Svelte + TypeScript checking |
| `npm run lint` | Prettier + ESLint |
| `npm run format` | Auto-format with Prettier |
