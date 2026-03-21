# AGENTS.md — adamrobinson.tech

Personal website for Adam Robinson, Lead Software Engineer.

## Stack

- **Framework**: SvelteKit 2 (Svelte 5) with TypeScript
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite` plugin) + CSS custom properties for brand tokens
- **Fonts**: Inter (variable, self-hosted from `/static/fonts/`), JetBrains Mono (via `@fontsource/jetbrains-mono`)
- **Database**: Prisma 7 (Postgres)
- **Hosting**: Vercel (adapter-auto)
- **Analytics**: `@vercel/analytics` v2 + `@vercel/speed-insights` v2
- **Build**: Vite 6

## Brand & Design System

Refer to `STYLEGUIDE.md` for the full brand specification. Key points:

- **Theme**: dark-mode default via `data-theme="dark"` on `<html>` — CSS custom properties handle theming (`--color-bg`, `--color-text`, `--color-accent`, `--color-muted`, `--color-border`)
- **Accent color**: Teal — `#3AAFA9` (dark), `#2A7A7A` (light). Used sparingly: cursor mark + one accent per view.
- **Logo**: Terminal cursor mark (`▌`) + "adam robinson" in JetBrains Mono. Wordmark (`logo-dark.svg`) on desktop, icon-only (`icon.svg`) below 640px. Minimum wordmark width: 240px.
- **Typography**: JetBrains Mono for display/logo/subtitle, system sans (Inter) for body. Negative tracking on large headings.
- **Motion**: Minimal — cursor blink on hero only, 150ms hover transitions. Respects `prefers-reduced-motion`.
- Section borders use `var(--color-border)`, cards use `var(--color-border)` with accent left border
- No Tailwind config file — theme is defined in `@theme` block in `app.css` + CSS custom properties in `:root` / `[data-theme="dark"]`

## Code Style

- Tabs for indentation, single quotes, no trailing commas (see `.prettierrc`)
- `<script lang="ts">` in all Svelte components
- Component filenames are lowercase (`footer.svelte`, `books.svelte`)
- Imports use `$lib/` alias for lib modules
- Component-scoped styles use `<style>` blocks with semantic class names (`.nav-link`, `.section-heading`, `.body-text`)
- Colors reference CSS custom properties (`var(--color-text)`) rather than Tailwind color classes

## Project Structure

```
src/
  app.css            — Tailwind import, @theme, CSS variables, global typography, blink animation
  app.html           — HTML shell (data-theme="dark", favicon, JSON-LD structured data)
  components/        — Shared components (footer.svelte)
  lib/
    types.ts         — Shared types (Element, GoodreadsBook, etc.)
    constants.ts     — Enums (Goodreads shelves)
    helpers.ts       — Utility functions
    copy.ts          — Structured content for the /work page
    text.ts          — Typewriter text rendering engine
    assets/brand/    — Brand SVGs (logo-dark, logo-light, icon, favicon, og-card)
    server/          — Server-only modules (goodreadsService.ts)
  routes/
    +layout.svelte   — Root layout: sticky nav, skip-to-content link, Vercel analytics
    +page.svelte     — Homepage (hero with cursor blink, about, approach, work, AI, outside, contact)
    work/            — Work/experience page (typewriter animation)
    play/            — Reading page (Goodreads API integration)
    contact/         — Contact form (posts to /api/mail)
    teach/           — Interactive JS playground
    api/             — API routes (goodreads/, mail/, sitemap/)
static/
  logo-dark.svg      — Dark-mode wordmark
  logo-light.svg     — Light-mode wordmark
  icon.svg           — Standalone cursor mark icon
  favicon.svg        — Browser favicon (SVG)
  og-card.svg        — OG card source
  og-card.png        — OG card rendered (1200×630)
  fonts/             — Inter variable font
  robots.txt         — Crawl rules + sitemap reference
```

## SEO & Accessibility

- **Structured data**: JSON-LD `Person` schema in `app.html`
- **Open Graph**: `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` on all pages
- **Favicon**: SVG favicon (`/favicon.svg`)
- **Accessibility**: Skip-to-content link, `aria-labelledby` on all sections, `aria-hidden` on decorative elements (accent dots, cursor, bullet markers), `aria-label` on nav and logo link, `role="banner"` on header, `role="contentinfo"` on footer
- **Focus management**: Global `:focus-visible` outline using accent color, component-level focus styles
- **Motion**: `prefers-reduced-motion` disables cursor blink and smooth scroll
- **Sitemap**: Generated at `/api/sitemap`

## Key Rules

- **Follow STYLEGUIDE.md** — all visual changes must align with the brand specification
- **Do not add component libraries** — the site's value is in its custom, minimal feel
- **Accent color is used sparingly** — cursor mark + one accent element per view, never scattered
- **Preserve existing API routes** — `/api/goodreads/*`, `/api/mail`, `/api/sitemap` are production endpoints
- **The `/work` page uses a typewriter renderer** (`$lib/text.ts` + `$lib/copy.ts`) — don't replace with static markup unless asked
- **Cursor blink animates on hero only** — never in nav or other components
- **Verify with `npx vite build`** before considering work done

## Commands

| Command            | Purpose                      |
| ------------------ | ---------------------------- |
| `npm run dev`      | Dev server (opens browser)   |
| `npx vite build`   | Production build             |
| `npm run preview`  | Preview production build     |
| `npm run check`    | Svelte + TypeScript checking |
| `npm run lint`     | Prettier + ESLint            |
| `npm run format`   | Auto-format with Prettier    |
