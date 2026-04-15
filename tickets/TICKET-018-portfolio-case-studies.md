# TICKET-018 — Portfolio Case Studies

**Status**: Done
**Priority**: High
**Effort**: 6-8 hours

## Description

Replace generic portfolio blurbs with real case studies showing client, problem, tech, and outcome.

## Acceptance Criteria

- [x] Write 3-4 case studies with problem, solution, outcome, and role
- [x] Add to /work page or create individual case study pages
- [ ] Include metrics where possible (time saved, performance gains, etc.)
- [x] Include client industry and project size context

## Notes

#1 priority for job search. Recognizable company names with real outcomes are the strongest signal for technical evaluators. Merged from TICKET-003.

**Candidate projects** (from Holocron allocation history):

- iCapital: Integrated Offerings (2024–present) — fintech, most recent
- Healthcasts (2022–2024) — ~18 month engagement
- Angi: Partner Automations (2021–2022) — well-known brand, multiple projects
- Shell: DINGO (2018–2019) — enterprise, ~13 months

**Working notes**: `/Users/adam/portfolio-case-studies.md`
**Data source**: `/Users/adam/repos/mojo-holocron/db/mojo_holocron_dev.db` → `project_allocations`

## Files

- `src/routes/work/+page.svelte` (or new case study pages)
