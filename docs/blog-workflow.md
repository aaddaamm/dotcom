# Blog Workflow (Lightweight)

## Frontmatter fields

Supported in `src/content/blog/*.md` and `src/content/blog/drafts/*.md`:

- `title` (string)
- `description` (string)
- `date` (`YYYY-MM-DD`)
- `tags` (string[])
- `published` (boolean)
- `featured` (boolean, optional)
- `status` (`draft` | `review` | `ready`, optional)
- `reviewed` (boolean, optional)

## Publishing notes

- Featured posts are pinned first on `/blog` (then sorted by date)
- Drafts are only shown when `SHOW_DRAFTS=true` or in dev mode

## Draft readiness check

Run:

```bash
npm run check:blog-drafts
```

This checks draft markdown files for:

- minimum title/description quality
- date format
- tag count
- status/reviewed metadata
- basic content length target

To make it fail in CI/automation:

```bash
BLOG_DRAFTS_STRICT=true npm run check:blog-drafts
```
