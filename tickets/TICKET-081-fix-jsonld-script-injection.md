# TICKET-081 — Fix JSON-LD Script Tag Injection Risk

**Status**: Open
**Priority**: Medium
**Effort**: 20 min

## Description

In `src/routes/blog/[...slug]/+page.svelte`, JSON-LD structured data is injected via `{@html}` with `JSON.stringify(post.title)` directly interpolated into a `<script>` body. The `'</' + 'script>'` split guards against one injection path, but `<`, `>`, and `&` in the serialized JSON should also be escaped to prevent a post title containing `</script>` or similar from breaking the page.

The blog is author-controlled so this is low-severity now, but it's a footgun as content grows.

## Acceptance Criteria

- [ ] JSON-LD template escapes `<`, `>`, `&` in the stringified JSON (standard pattern: replace after `JSON.stringify`)
- [ ] Existing JSON-LD output still valid (test with a blog post)
- [ ] Build passes

## Files

- `src/routes/blog/[...slug]/+page.svelte`
