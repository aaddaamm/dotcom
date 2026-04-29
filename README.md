# adamrobinson.tech

Personal website for Adam Robinson, Senior Software Engineer.

## Stack

- **Framework**: SvelteKit 2 (Svelte 5) with TypeScript
- **Styling**: Tailwind CSS 4 + CSS custom properties
- **Hosting**: Vercel (adapter-vercel)
- **Email**: Resend API for contact form
- **Analytics**: Vercel Analytics + Speed Insights

## Quick Start

```bash
npm install
cp .env.example .env.local
# Add your RESEND_API_KEY to .env.local
npm run dev
```

## Environment Setup

1. **Resend Email API** (for contact form):

   ```bash
   RESEND_API_KEY=re_xxxxxxxxx
   ```

   Get your API key from: https://resend.com/api-keys

## Development Commands

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `npm run dev`     | Dev server (opens browser)   |
| `npx vite build`  | Production build             |
| `npm run preview` | Preview production build     |
| `npm run check`   | Svelte + TypeScript checking |
| `npm run lint`    | Prettier + ESLint            |
| `npm run format`  | Auto-format with Prettier    |

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
