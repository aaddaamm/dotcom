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
  app.css              — Tailwind import, @theme, CSS variables, global typography, blink animation
  app.html             — HTML shell (data-theme="dark", favicon, JSON-LD, theme init script)
  hooks.server.ts      — Server hook that sets CSP headers on every response
  components/          — Shared Svelte components
    card.svelte, work-card.svelte, hero-section.svelte, header.svelte, footer.svelte,
    headshot.svelte, icon.svelte, page-header.svelte, philosophy-section.svelte,
    services-section.svelte, service-icon.svelte, faq-section.svelte, terminal.svelte,
    public-activity-section.svelte, contact-form.svelte, seo-head.svelte
  content/
    blog/              — Markdown blog posts (+ drafts/ subfolder gated by SHOW_DRAFTS)
  lib/
    types.ts           — Shared types (GoodreadsBook, GithubActivity, etc.)
    constants.ts       — Site-wide constants (Goodreads shelves, GITHUB_USERNAME, etc.)
    copy.ts            — Structured content (tech stack groups, selected work)
    utils.ts           — Client-safe helpers
    validation.ts      — Contact form validation
    animations.ts      — Scroll-in animation setup
    terminal-commands.ts — Command registry for the /terminal route
    stores/            — Svelte stores (theme.ts, terminal.ts)
    server/            — Server-only modules
      api-utils.ts, utils.ts       — Shared server helpers
      blog.ts                      — Markdown parsing + draft gating
      contactEmail.ts, emailTemplates.ts — Resend integration
      goodreadsService.ts          — Goodreads RSS → cached JSON
      githubService.ts             — GitHub API → cached activity summary
      rateLimit.ts                 — Upstash-backed rate limiting
  routes/
    +layout.svelte     — Root layout: sticky nav, theme toggle, skip-to-content, Vercel analytics
    +page.svelte / +page.ts — Homepage (hero + tech stack + selected work)
    +error.svelte      — Error page with status code and back link
    blog/              — Blog index, RSS feed, and [...slug] post pages (SSR via +page.server.ts)
    work/              — Case studies / selected work index
    hire/              — Hire-me page with services, philosophy, FAQ, public activity
    contact/           — Contact form page
    play/              — Reading page (SSR Goodreads integration)
    teach/             — Learning resources and curated external links
    terminal/          — Interactive terminal easter egg
    api/               — API routes: contact/, github/, goodreads/, sitemap/
static/
  logo-dark.svg        — Dark-mode wordmark
  logo-light.svg       — Light-mode wordmark
  icon.svg             — Standalone cursor mark icon
  favicon.svg          — Browser favicon (SVG)
  apple-touch-icon.png — iOS home screen icon
  og-card.png          — Open Graph image (1200×630)
  manifest.json        — PWA manifest
  sw.js                — Service worker
  fonts/               — Inter variable font
  robots.txt           — Crawl rules + sitemap reference
  adam_robinson.docx   — Downloadable résumé
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

| Route            | Purpose                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `/api/contact`   | Resend-backed contact form submission; Upstash rate limited (3 / 15min) |
| `/api/github`    | Cached public GitHub activity for the hire page                         |
| `/api/goodreads` | Cached Goodreads RSS → JSON for the reading page                        |
| `/api/sitemap`   | Dynamically-generated XML sitemap                                       |

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
