# TICKET-073 — git log-Style Work Timeline

**Status**: Backlog
**Priority**: Low
**Effort**: 2-3 hours

## Description

Render the work history as a fake `git log --oneline` — short SHAs, branch refs, commit-style one-liners. Signals engineering identity without explaining it.

## Acceptance Criteria

- [ ] Timeline section on `/work` (or a separate `/log` route)
- [ ] Deterministic fake short SHA per entry (not random on each render)
- [ ] Branch-ref labels: `HEAD → main` for current role, named branches for past ones
- [ ] Mono font, muted SHA + date, teal branch refs
- [ ] Each entry links to its case study if one exists
