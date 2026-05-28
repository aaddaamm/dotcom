# Freelance Path Demotion — Design Spec

**Date:** 2026-04-18  
**Goal:** Shift the site from freelance-forward to senior-engineer-first without removing the freelance entry point entirely. The `/hire` page stays; it just isn't primary navigation.

---

## Changes

### 1. Main nav — remove "hire"

**File:** `src/components/header.svelte`

Remove the `<a href="/hire">` nav link. The footer already links to `/hire` and continues to do so — that's the only nav-level entry point.

**Before:** work · blog · hire · contact  
**After:** work · blog · contact

### 2. Homepage availability badge — remove entirely

**Files:** `src/components/hero-section.svelte`, `src/lib/copy.ts`

Remove the green dot availability badge from the hero section. This includes:
- The `{#if availability.available}` block and badge markup in `hero-section.svelte`
- The `availability` export from `copy.ts` (unused once the badge is gone)

No replacement — the hero body copy already conveys availability implicitly.

### 3. `/hire` page header description — update

**File:** `src/routes/hire/+page.svelte` (PageHeader `description` prop)

**Before:** `"Available for contract work. Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise."`

**After:** `"Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise. Open to contract engagements and full-time roles for the right opportunity."`

### 4. FAQ — add full-time question

**File:** `src/lib/copy.ts` (`faqItems` array)

Add one new item to the FAQ list:

```ts
{
  question: "Are you open to full-time roles?",
  answer:
    "Yes — primarily I take on contract work, but I'm open to full-time for the right team and problem. If you're building something interesting and want someone who can operate as a senior IC or tech lead, reach out."
}
```

Placement: add as the first item in `faqItems` so it surfaces prominently on the `/hire` page.

---

## Out of scope

- Homepage hero body copy (already reads as senior-engineer-forward — no changes needed)
- `/hire` page title "Work With Me" — acceptable as-is
- Services and philosophy sections on `/hire` — contract-flavored but appropriate for that audience
- Footer `/hire` link — keep as-is

---

## Files touched

| File | Change |
|------|--------|
| `src/components/header.svelte` | Remove hire nav link |
| `src/components/hero-section.svelte` | Remove availability badge block |
| `src/lib/copy.ts` | Remove `availability` export; add FAQ item |
| `src/routes/hire/+page.svelte` | Update PageHeader description |
