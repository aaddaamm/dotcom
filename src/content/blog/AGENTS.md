# Blog Content — adamrobinson.tech

## Writing a New Post

1. Copy `_template.md` to a new file named with a URL-friendly slug (e.g. `my-post-title.md`)
2. Fill in the frontmatter fields
3. Write the post body in standard Markdown
4. Set `published: true` when ready to go live

## Frontmatter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title — used in `<title>`, OG tags, and the blog index |
| `description` | string | Yes | Short summary — used in meta description, OG description, and blog index cards |
| `date` | string (YYYY-MM-DD) | Yes | Publish date — used for sorting and display |
| `tags` | string[] | No | Categorization tags — rendered as pills on the index and post page |
| `published` | boolean | Yes | `false` = draft (hidden from index, sitemap, and RSS), `true` = live |

## How It Works

- Posts are Markdown files in this directory (`src/content/blog/`)
- Parsed server-side with `gray-matter` (frontmatter) + `marked` (Markdown → HTML)
- Blog index at `/blog` lists all published posts, sorted newest-first
- Individual posts render at `/blog/[slug]` where slug = filename without `.md`
- Each published post automatically gets:
  - Its own canonical URL and Open Graph / Twitter meta tags
  - `BlogPosting` JSON-LD structured data
  - An entry in the sitemap (`/api/sitemap`)
  - An entry in the RSS feed (`/blog/rss.xml`)

## Supported Markdown

Standard Markdown features: headings, paragraphs, links, bold/italic, code blocks, inline code, lists (ordered and unordered), blockquotes, horizontal rules. No Svelte components inside posts.

## File Naming

- Use lowercase, hyphenated slugs: `building-workflow-systems.md`
- The filename becomes the URL: `/blog/building-workflow-systems`
- No spaces, no uppercase, no special characters
