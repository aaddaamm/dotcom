# TICKET-082 — Fix Logo Theme Flicker on First Paint

**Status**: Open
**Priority**: Medium
**Effort**: 30 min

## Description

`header.svelte` conditionally renders the logo via JS (`{$themeStore === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}`). On SSR the default is `dark`, so a `light`-theme user sees the dark logo until JS hydrates — a visible flicker on first paint.

The site already uses `[data-theme]` on `<html>` set by an inline script in `app.html` to prevent FOUC for colors. The logo should follow the same pattern: one `<img>` element with CSS `content` swapped by `[data-theme]`, or two elements where only the correct one is visible via CSS.

## Acceptance Criteria

- [ ] Logo displays correctly for both themes on first paint (no flicker)
- [ ] Theme toggle still swaps the logo without a visible flash
- [ ] No JS-conditional `src` swap in the component
- [ ] Build passes

## Files

- `src/components/header.svelte`
- `src/app.css` (if using CSS content swap)
