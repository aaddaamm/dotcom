# adamrobinson.tech

Personal website for Adam Robinson, Freelance Developer & Software Consultant.

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

2. **Optional - Database** (not currently used):
   ```bash
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/dotcom?schema=public"
   npx prisma migrate dev
   ```

## Development Commands

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `npm run dev`     | Dev server (opens browser)   |
| `npm run build`   | Production build             |
| `npm run preview` | Preview production build     |
| `npm run check`   | Svelte + TypeScript checking |
| `npm run lint`    | Prettier + ESLint            |
| `npm run format`  | Auto-format with Prettier    |

## Features

- ⚡ **Performance**: Optimized fonts, images, and bundle size
- 🎨 **Design**: Custom dark/light theme with terminal-inspired aesthetic
- 📱 **Responsive**: Mobile-first design with accessibility features
- 📧 **Contact Form**: Secure contact form with email notifications
- 📖 **Reading List**: Live Goodreads integration
- 🔍 **SEO**: Comprehensive meta tags, schema markup, and sitemap
- 🛡️ **Security**: XSS protection, rate limiting, input validation

## Project Structure

See `AGENTS.md` for detailed architecture documentation.

## Deployment

Deployed to Vercel with automatic deployments from `main` branch.

Environment variables must be configured in Vercel dashboard:
- `RESEND_API_KEY`
