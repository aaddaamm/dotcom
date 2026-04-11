# TICKET-085 — Extract Blog Prose Styles from Component to app.css

**Status**: Open
**Priority**: Low
**Effort**: 30 min

## Description

`src/routes/blog/[...slug]/+page.svelte` contains 165 lines of `:global` prose styles (headings, paragraphs, code blocks, blockquotes, tables). This is effectively a stylesheet embedded in a component. Extracting it to `app.css` (in an `@layer` block) reduces the component to ~70 lines and puts the prose typography alongside other site tokens where it belongs.

## Acceptance Criteria

- [ ] Prose styles extracted to a `@layer prose` (or similar) block in `src/app.css`
- [ ] Component `:global` styles removed
- [ ] Styles scoped appropriately so they only apply within `.prose` or the blog post container
- [ ] Visual output unchanged for blog posts in both themes
- [ ] Build passes

## Files

- `src/routes/blog/[...slug]/+page.svelte`
- `src/app.css`
