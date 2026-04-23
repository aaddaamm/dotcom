# Blog Workflow (Lightweight)

## Frontmatter fields

Supported in `src/content/blog/*.md` and `src/content/blog/drafts/*.md`:

- `title` (string)
- `description` (string)
- `date` (`YYYY-MM-DD`)
- `tags` (string[])
- `published` (boolean)
- `featured` (boolean, optional)
- `status` (`draft` | `review` | `ready`)
- `reviewed` (boolean)

Notes:

- `status` and `reviewed` are optional at runtime, but effectively required for draft workflow quality gates.
- Published posts should typically use `status: 'ready'` and `reviewed: true`.

## Publishing notes

- Featured posts are pinned first on `/blog` (then sorted by date)
- Drafts are only shown when `SHOW_DRAFTS=true` or in dev mode

## Draft readiness check

Run:

```bash
npm run check:blog-drafts
```

This checks draft markdown files for:

- title length >= 8 characters
- description length >= 20 characters
- date format (`YYYY-MM-DD`)
- tags count >= 2
- status value is one of `draft | review | ready`
- reviewed is boolean (`true`/`false`)
- content length target >= 250 words

To make it fail in CI/automation:

```bash
BLOG_DRAFTS_STRICT=true npm run check:blog-drafts
```
