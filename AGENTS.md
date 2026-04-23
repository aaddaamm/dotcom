# AGENTS.md — adamrobinson.tech

Personal website for Adam Robinson, Senior Software Engineer.

## Stack

- **Framework**: SvelteKit 2 (Svelte 5) with TypeScript
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite` plugin) + CSS custom properties for brand tokens
- **Fonts**: Inter (variable, self-hosted from `/static/fonts/`), JetBrains Mono (via `@fontsource/jetbrains-mono`)
- **Hosting**: Vercel (`@sveltejs/adapter-vercel`)
- **Analytics**: `@vercel/analytics` v2 + `@vercel/speed-insights` v2
- **Email**: Resend API for contact form submissions (notification + auto-responder)
- **KV / cache / rate limiting**: Upstash Redis (`@upstash/redis`) via Vercel KV env vars
- **Content**: Markdown blog posts in `src/content/blog/`, parsed with `gray-matter` + `marked`
- **Build**: Vite 6

## Brand & Design System

Refer to `STYLEGUIDE.md` for the full brand specification. Key points:

- **Theme**: dark-mode default via `data-theme="dark"` on `<html>` — CSS custom properties handle theming (`--color-bg`, `--color-text`, `--color-accent`, `--color-muted`, `--color-border`). Theme toggle in nav allows switching between dark (default) and light mode; selection persists via localStorage.
- **Accent color**: Teal — `#3AAFA9` (dark), `#2A7A7A` (light). Used sparingly: cursor mark + one accent per view.
- **Logo**: Terminal cursor mark (`▌`) + "adam robinson" in JetBrains Mono. Wordmark swaps between `logo-dark.svg` and `logo-light.svg` based on active theme; icon-only (`icon.svg`) below 640px. Minimum wordmark width: 240px.
- **Typography**: JetBrains Mono for display/logo/subtitle, Inter for body. Negative tracking on large headings.
- **Motion**: Minimal — cursor blink on hero only, 150ms hover transitions. Respects `prefers-reduced-motion`.
- Section borders use `var(--color-border)`, cards use `var(--color-border)` with accent left border.
- No Tailwind config file — theme is defined in `@theme` block in `app.css` + CSS custom properties in `:root` / `[data-theme="dark"]`.

## Code Style

- Tabs for indentation, single quotes, no trailing commas (see `.prettierrc`)
- `<script lang="ts">` in all Svelte components
- Component filenames are lowercase, kebab-case (`hero-section.svelte`, `work-card.svelte`)
- Imports use `$lib/` alias for lib modules
- Component-scoped styles use `<style>` blocks with semantic class names (`.nav-link`, `.section-heading`, `.body-text`)
- Colors reference CSS custom properties (`var(--color-text)`) rather than Tailwind color classes

## Project Structure

```
src/
  app.css                — Tailwind import, @theme, CSS variables, global typography, blink animation
  app.html               — HTML shell (data-theme="dark", favicon, JSON-LD, theme init script)
  hooks.server.ts        — Server hook that sets CSP headers on every response
  components/            — Shared Svelte components
    hero-section.svelte, header.svelte, footer.svelte, seo-head.svelte,
    card.svelte, work-card.svelte, case-study.svelte, outcome-proof.svelte,
    recently-shipped.svelte, trust-strip.svelte, contact-form.svelte,
    page-header.svelte, services-section.svelte, service-icon.svelte,
    philosophy-section.svelte, faq-section.svelte, public-activity-section.svelte,
    headshot.svelte, icon.svelte, json-ld.svelte, terminal.svelte
  content/
    blog/                — Markdown blog posts (+ drafts/ subfolder gated by SHOW_DRAFTS)
  lib/
    types.ts             — Shared types
    constants.ts         — Site-wide constants
    copy.ts              — Structured content
    utils.ts             — Client-safe helpers
    validation.ts        — Contact form validation
    animations.ts        — Scroll-in animation setup
    analytics.ts         — Typed analytics event helpers
    terminal-commands.ts — Command registry for /terminal
    terminal-state.svelte.ts — Terminal runtime state
    stores/              — Svelte stores
      theme.svelte.ts, terminal.svelte.ts, work-filter.svelte.ts
    server/              — Server-only modules
      api-utils.ts, utils.ts, redis.ts, blog.ts,
      contactEmail.ts, emailTemplates.ts,
      goodreadsService.ts, githubService.ts, rateLimit.ts
  routes/
    +layout.svelte, +page.svelte, +page.ts, +error.svelte
    blog/                — Index, RSS, and [...slug] pages
    work/                — Selected work index + [slug] pages
    hire/                — Hire-me page
    contact/             — Contact form page
    play/                — Reading page (SSR Goodreads integration)
    teach/               — Learning resources and links
    terminal/            — Interactive terminal easter egg
    api/                 — contact/, github/, goodreads/*, sitemap/
    sitemap.xml/+server.ts — 301 redirect shim to /api/sitemap
static/
  logo-dark.svg, logo-light.svg, icon.svg
  favicon.svg, apple-touch-icon.png, og-card.png
  manifest.json, sw.js, robots.txt
  fonts/                — Inter + JetBrains Mono files
  adam_robinson.pdf     — Downloadable résumé (primary)
  adam_robinson.docx    — Downloadable résumé (alt format)
```

## SEO & Accessibility

- **Structured data**: JSON-LD `Person` and `WebSite` schema embedded in `src/app.html`
- **Per-page meta**: `seo-head.svelte` emits `<title>`, description, canonical URL, Open Graph, and Twitter card tags
- **Favicon**: SVG favicon (`/favicon.svg`) + `apple-touch-icon.png`
- **Accessibility**: Skip-to-content link, `aria-labelledby` on all sections, `aria-hidden` on decorative elements (accent dots, cursor, bullet markers), `aria-label` on nav and logo link, `role="banner"` on header, `role="contentinfo"` on footer
- **Focus management**: Global `:focus-visible` outline using accent color, component-level focus styles
- **Motion**: `prefers-reduced-motion` disables cursor blink and smooth scroll
- **Sitemap**: Generated at `/api/sitemap` with dynamic `lastmod` dates
- **CSP**: Content-Security-Policy set in `hooks.server.ts`

## API Routes

| Route              | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| `/api/contact`     | Resend-backed contact form submission; Upstash rate limited (3 / 15min) |
| `/api/github`      | Cached public GitHub activity for the hire page                         |
| `/api/goodreads/*` | Cached Goodreads RSS → JSON for the reading page                        |
| `/api/sitemap`     | Dynamically-generated XML sitemap                                       |

## Environment Variables

| Variable                               | Purpose                                                |
| -------------------------------------- | ------------------------------------------------------ |
| `RESEND_API_KEY`                       | Contact form email delivery                            |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Upstash Redis (rate limit + GitHub/Goodreads cache)    |
| `GITHUB_TOKEN`                         | GitHub API auth for `/api/github`                      |
| `SHOW_DRAFTS`                          | Set `true` on preview to surface `content/blog/drafts` |

## Key Rules

- **Follow STYLEGUIDE.md** — all visual changes must align with the brand specification
- **Do not add component libraries** — the site's value is in its custom, minimal feel
- **Accent color is used sparingly** — cursor mark + one accent element per view, never scattered
- **Preserve existing API routes** — `/api/contact`, `/api/github`, `/api/goodreads/*`, `/api/sitemap` are production endpoints
- **Theme toggle persists to localStorage** — inline script in `app.html` prevents flash of wrong theme
- **Cursor blink animates on hero only** — never in nav or other components
- **CSP lives in `hooks.server.ts`** — update the policy there when adding new third-party origins
- **Verify with `npx vite build`** before considering work done

## Commands

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `npm run dev`     | Dev server (opens browser)   |
| `npx vite build`  | Production build             |
| `npm run preview` | Preview production build     |
| `npm run check`   | Svelte + TypeScript checking |
| `npm run lint`    | Prettier + ESLint            |
| `npm run format`  | Auto-format with Prettier    |
