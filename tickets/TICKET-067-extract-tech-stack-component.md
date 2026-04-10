# TICKET-067 — Extract TechStack Component — Two Different Renderings of Same Data

**Status**: Backlog
**Priority**: Low
**Effort**: 1 hour

## Description

`techStack` from `$lib/copy.ts` is rendered as an interactive button grid on the home page and as comma-separated text on the hire page. Two different presentations of the same data, no shared component.

## Acceptance Criteria

- [ ] Create `src/components/tech-stack.svelte` with `variant: 'grid' | 'list'` prop
- [ ] Home page uses `variant="grid"` (existing button/badge style)
- [ ] Hire page uses `variant="list"` (existing comma-separated style)

## Files

- `src/routes/+page.svelte`
- `src/routes/hire/+page.svelte`
