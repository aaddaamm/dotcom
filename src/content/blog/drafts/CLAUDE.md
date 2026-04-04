# Blog Content — adamrobinson.tech

Posts are Markdown files in `src/content/blog/`. Parsed server-side with `gray-matter` + `marked`.

## New Post

1. Copy `_template.md` to a new file named with a hyphenated slug (e.g. `my-post-title.md`)
2. Fill frontmatter, write body in standard Markdown
3. Set `published: true` to go live

## Frontmatter

| Field         | Type                | Required | Notes                                     |
| ------------- | ------------------- | -------- | ----------------------------------------- |
| `title`       | string              | Yes      | Used in `<title>`, OG tags, blog index    |
| `description` | string              | Yes      | Meta description, OG, index cards         |
| `date`        | string (YYYY-MM-DD) | Yes      | Sort order and display                    |
| `tags`        | string[]            | No       | Rendered as pills on index and post page  |
| `published`   | boolean             | Yes      | `false` = hidden from index, sitemap, RSS |
