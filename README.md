# adamrobinson.tech

Personal website for Adam Robinson, Senior Software Engineer.

## Stack

- **Framework**: SvelteKit 2 / Svelte 5 / TypeScript / Vite 8
- **Styling**: Tailwind CSS 4 + CSS custom properties
- **Hosting**: Vercel (`@sveltejs/adapter-vercel`)
- **Email**: Resend API for contact notifications
- **Cache/rate limits**: Upstash Redis
- **Analytics**: Vercel Analytics + Speed Insights

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add the environment variables you need for local integrations
npm run dev
```

## Environment Setup

Create `.env.local` from `.env.example`, then add the values needed for the integrations you are testing:

```bash
RESEND_API_KEY=re_xxxxxxxxx
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
GITHUB_TOKEN=github_pat_...
SHOW_DRAFTS=true
```

- `RESEND_API_KEY` powers contact notification email delivery.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` power Upstash Redis rate limits/cache.
- `GITHUB_TOKEN` powers the `/api/github` public activity endpoint.
- `SHOW_DRAFTS=true` shows draft blog posts in dev/preview flows.

Get a Resend API key from https://resend.com/api-keys.

## Development Commands

| Command                       | Purpose                                 |
| ----------------------------- | --------------------------------------- |
| `npm run dev`                 | Dev server (opens browser)              |
| `npm run build`               | Production build                        |
| `npm run preview`             | Preview production build                |
| `npm run check`               | Svelte + TypeScript checks              |
| `npm run lint`                | Prettier + ESLint                       |
| `npm run format`              | Auto-format with Prettier               |
| `npm run test`                | Vitest test suite                       |
| `npm run check:blog-drafts`   | Draft frontmatter/readiness checks      |
| `npm run check:lighthouse`    | Local Lighthouse SEO/accessibility gate |
| `npm run check:bundle-budget` | Client JS/CSS bundle budget gate        |
| `npm run check:links`         | Linkinator broken-link check            |
| `npm run check:seo`           | Unlighthouse crawl against `SITE_URL`   |

## Features

- ⚡ **Performance**: Optimized fonts, images, and bundle size
- 🎨 **Design**: Custom dark/light theme with terminal-inspired aesthetic
- 📱 **Responsive**: Mobile-first design with accessibility features
- 📧 **Contact Form**: Resend-backed contact notifications with Upstash rate limiting
- 📖 **Reading List**: Live Goodreads integration (cached)
- 💻 **Public Activity**: Cached GitHub activity summary on the hire page
- 🔍 **SEO**: Comprehensive meta tags, JSON-LD schema, and sitemap
- 🛡️ **Security**: CSP headers, rate limiting, input validation

## Project Structure

See `AGENTS.md` for detailed architecture documentation.

## Deployment

Deployed to Vercel with automatic deployments from `main` branch.

Environment variables must be configured in Vercel dashboard:

- `RESEND_API_KEY` — contact form email delivery
- `KV_REST_API_URL` / `KV_REST_API_TOKEN` — Upstash Redis (rate limiting, GitHub/Goodreads cache)
- `GITHUB_TOKEN` — required for `/api/github` public activity endpoint
- `SHOW_DRAFTS` — set to `true` on preview environments to surface draft blog posts
