# TICKET-064 — Fix Hardcoded Code Block Colors in Blog Post — Theme-Unaware

**Status**: Done
**Priority**: Medium
**Effort**: 30 min

## Description

Prose code block styles in the blog post page use hardcoded hex values (`#111111`, `#e8e8e8`, `#1a1a1a`) instead of CSS custom properties. These always render dark regardless of the active theme.

## Acceptance Criteria

- [ ] Add `--color-code-bg`, `--color-code-text`, `--color-code-border` to the `:root` / `[data-theme='dark']` blocks in `app.css`
- [ ] Replace hardcoded hex values in `blog/[...slug]/+page.svelte` prose styles with the new vars
- [ ] Light theme should have a legible light-mode code style; dark theme keeps existing dark style

## Notes

Completed: 2026-04-10

## Files

- `src/routes/blog/[...slug]/+page.svelte`
