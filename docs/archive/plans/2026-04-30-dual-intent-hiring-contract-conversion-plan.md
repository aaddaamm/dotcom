# Plan: Dual-intent conversion improvements (hiring + contract)

## Problem summary

Improve site conversion for two equal-priority audiences: hiring managers and contract clients. Keep contact form as primary CTA, email secondary, resume tertiary, while increasing trust despite limited public artifacts.

## Relevant learnings

No relevant solutions found in:

- `docs/solutions/`
- `~/.pi/agent/docs/solutions/`

## Scope boundaries

In scope:

- Homepage messaging/IA updates for dual intent
- Contact flow copy + intent capture refinements
- Anonymized case study framework and first examples
- Lightweight proof/trust module as standout implementation

Out of scope:

- Backend API redesign for `/api/contact`
- New third-party UI libraries
- Large visual rebrand

## Implementation units

### Unit 1 — Dual-intent homepage messaging + CTA hierarchy

**Purpose:** Make audience split and primary conversion obvious above the fold.

**Files:**

- `src/routes/+page.svelte`
- `src/components/hero-section.svelte`
- `src/components/trust-strip.svelte`
- `src/lib/copy.ts`
- `src/components/__tests__/hero-dual-intent.test.ts` (new)

**Steps:**

- [ ] Write failing tests for hero copy/CTAs covering both intents and CTA order (RED)
- [ ] Run targeted test and confirm fail: `npm run test -- hero-dual-intent`
- [ ] Implement minimal copy/layout updates in hero + trust strip (GREEN)
- [ ] Re-run targeted test and confirm pass: `npm run test -- hero-dual-intent`
- [ ] Refactor copy constants and section structure for clarity
- [ ] Run unit-level verification: `npm run check`

**Verification commands:**

- `npm run test -- hero-dual-intent`
- `npm run check`

**Expected results:**

- Homepage clearly supports both full-time and contract visitors
- Contact form CTA is most prominent, with email/resume as secondary/supporting

---

### Unit 2 — Contact form intent qualification and message polish

**Purpose:** Increase inquiry quality while preserving low-friction submission.

**Files:**

- `src/components/contact-form.svelte`
- `src/lib/validation.ts`
- `src/lib/server/emailTemplates.ts`
- `src/lib/server/contactEmail.ts`
- `src/lib/server/__tests__/contact-intent-routing.test.ts` (new)

**Steps:**

- [ ] Add failing tests for new/updated intent fields and validation behavior (RED)
- [ ] Run targeted test and confirm fail: `npm run test -- contact-intent-routing`
- [ ] Implement minimal form + validation + email template updates (GREEN)
- [ ] Re-run targeted test and confirm pass: `npm run test -- contact-intent-routing`
- [ ] Refactor field names/copy for clarity and consistency
- [ ] Run unit-level verification: `npm run test -- contact-intent-routing && npm run check`

**Verification commands:**

- `npm run test -- contact-intent-routing`
- `npm run check`

**Expected results:**

- Contact submissions capture clearer full-time vs contract intent
- Notification payloads include actionable qualification context

---

### Unit 3 — Anonymized case study system + first publishable entries

**Purpose:** Build trust with confidentiality-safe proof artifacts.

**Files:**

- `src/content/case-studies/` (new folder + markdown entries)
- `src/lib/server/markdown.ts`
- `src/routes/work/+page.svelte`
- `src/components/case-study.svelte`
- `src/lib/server/__tests__/anonymized-case-study-schema.test.ts` (new)

**Steps:**

- [ ] Write failing tests for required anonymized case-study frontmatter/schema (RED)
- [ ] Run targeted test and confirm fail: `npm run test -- anonymized-case-study-schema`
- [ ] Implement loader/schema + render updates and add first 1-2 anonymized studies (GREEN)
- [ ] Re-run targeted test and confirm pass: `npm run test -- anonymized-case-study-schema`
- [ ] Refactor content model for future additions
- [ ] Run unit-level verification: `npm run test -- anonymized-case-study-schema && npm run check:blog-drafts`

**Verification commands:**

- `npm run test -- anonymized-case-study-schema`
- `npm run check:blog-drafts`

**Expected results:**

- Work surface shows structured, sanitized outcomes without exposing sensitive details
- Adding future anonymized studies is repeatable

---

### Unit 4 — Standout proof module (interactive outcomes timeline)

**Purpose:** Add one differentiated feature that signals senior-level product engineering.

**Files:**

- `src/components/outcome-proof.svelte`
- `src/components/recently-shipped.svelte`
- `src/lib/copy.ts`
- `src/routes/+page.svelte`
- `src/components/__tests__/outcome-proof-interactions.test.ts` (new)

**Steps:**

- [ ] Write failing interaction tests for timeline/proof module states (RED)
- [ ] Run targeted test and confirm fail: `npm run test -- outcome-proof-interactions`
- [ ] Implement minimal interactive module updates (GREEN)
- [ ] Re-run targeted test and confirm pass: `npm run test -- outcome-proof-interactions`
- [ ] Refactor accessibility labels and reduced-motion behavior
- [ ] Run unit-level verification: `npm run check && npm run build`

**Verification commands:**

- `npm run test -- outcome-proof-interactions`
- `npm run check`
- `npm run build`

**Expected results:**

- Home page includes a distinctive, credible proof interaction
- Accessibility/performance constraints remain intact

## Verification strategy

Targeted per unit first (RED/GREEN proof), then broad checks:

- `npm run test`
- `npm run check`
- `npm run lint`
- `npm run build`

## Assumptions and risks

- Assumption: current Vitest setup supports new component/server tests without framework changes.
- Risk: some existing files may need cleanup before adding stricter tests.
- Risk: balancing both audiences may still dilute message; validate copy with real inbound responses.

## Rule loading summary

Loaded rules:

- Common: `development-workflow.md`, `testing.md`
- TypeScript: `coding-style.md`, `hooks.md`, `patterns.md`, `security.md`, `testing.md`
- Web: `coding-style.md`, `design-quality.md`, `hooks.md`, `patterns.md`, `performance.md`, `security.md`, `testing.md`

Overrides in effect:

- TypeScript/web testing and coding-style guidance override common defaults where overlapping.
