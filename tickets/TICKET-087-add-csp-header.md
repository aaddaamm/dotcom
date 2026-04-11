# TICKET-087 — Add Content Security Policy

**Status**: Open
**Priority**: Low
**Effort**: 1 hr

## Description

No CSP is set anywhere (`app.html` or SvelteKit hooks). Even a basic policy would add meaningful defense-in-depth against the `{@html}` blog rendering path.

Minimum viable CSP for this site:
```
default-src 'self';
script-src 'self' 'unsafe-inline' va.vercel-scripts.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
connect-src 'self' vitals.vercel-insights.com;
font-src 'self';
```

## Acceptance Criteria

- [ ] CSP set via `src/hooks.server.ts` response headers (preferred over meta tag — applies to all routes)
- [ ] Vercel Analytics and Speed Insights still work
- [ ] No console CSP violations on any page (home, blog, work, contact, play)
- [ ] Build passes

## Notes

`'unsafe-inline'` for scripts is required for the FOUC-prevention inline script in `app.html` and Vercel's analytics injection. Can be tightened with nonces in a future pass.

## Files

- `src/hooks.server.ts` (create if doesn't exist)
