# TICKET-062 — Extract WorkCard Component — Duplicated Across Home and Work Pages

**Status**: Backlog
**Priority**: Medium
**Effort**: 1-2 hours

## Description

The work/project card markup is copy-pasted between `/` and `/work`. Both render the same `selectedWork` data with near-identical structure (header, stack tags, outcome) but subtly different class names and margin values, meaning they'll drift over time.

## Acceptance Criteria

- [ ] Create `src/components/work-card.svelte` accepting a work item prop
- [ ] Support a `variant?: 'preview' | 'full'` prop for the layout differences between pages
- [ ] Replace the inline markup in `+page.svelte` and `work/+page.svelte` with `<WorkCard>`
- [ ] Shared styles moved to component `<style>` block or `app.css`

## Files

- `src/routes/+page.svelte`
- `src/routes/work/+page.svelte`
