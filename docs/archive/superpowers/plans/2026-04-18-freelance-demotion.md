# Freelance Path Demotion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove `hire` from the main nav, remove the homepage availability badge, and update the `/hire` page to acknowledge full-time openness.

**Architecture:** Four surgical edits across three files. No new files, no new components. `copy.ts` gets one new FAQ entry and loses the `availability` export. `header.svelte` loses one nav link. `hero-section.svelte` loses the availability badge block and its import. `+page.svelte` (hire route) gets an updated PageHeader description.

**Tech Stack:** SvelteKit 2 / Svelte 5, TypeScript. No test framework — verification is `npm run check` + `npx vite build`. Commands run from `/Users/adam/dotcom`.

---

## Files Modified

| File                                 | Change                                            |
| ------------------------------------ | ------------------------------------------------- |
| `src/components/header.svelte`       | Remove hire nav link                              |
| `src/components/hero-section.svelte` | Remove availability badge block + import + styles |
| `src/lib/copy.ts`                    | Remove `availability` export; add FAQ item        |
| `src/routes/hire/+page.svelte`       | Update PageHeader description prop                |

---

## Task 1: Remove hire from main nav

**Files:**

- Modify: `src/components/header.svelte`

- [ ] **Step 1: Remove the hire nav link**

In `src/components/header.svelte`, find this line (around line 36):

```html
<a href="/hire" class="nav-link link-underline">hire</a>
```

Delete it. The nav block should now read:

```html
<nav aria-label="Main navigation" class="flex items-center gap-6">
	<a href="/work" class="nav-link link-underline">work</a>
	<a href="/blog" class="nav-link link-underline">blog</a>
	<a href="/contact" class="nav-link link-underline contact-nav">contact</a>
</nav>
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/header.svelte
git commit -m "feat: remove hire from main nav"
```

---

## Task 2: Remove availability badge from homepage

**Files:**

- Modify: `src/components/hero-section.svelte`
- Modify: `src/lib/copy.ts`

- [ ] **Step 1: Remove availability from copy.ts**

In `src/lib/copy.ts`, delete the `availability` export (lines 1–4):

```ts
export const availability = {
	available: true,
	label: 'Available for new engagements — can typically start within a week or two'
};
```

Remove those four lines entirely. The file should now start with `export const selectedWork = [`.

- [ ] **Step 2: Remove badge from hero-section.svelte**

In `src/components/hero-section.svelte`:

**Remove** the `availability` import from the script block. Change:

```ts
import { availability, homepageMetrics } from '$lib/copy';
```

to:

```ts
import { homepageMetrics } from '$lib/copy';
```

**Remove** the entire availability badge block (around lines 38–43):

```svelte
{#if availability.available}
	<div class="availability-badge mt-6 mb-1">
		<span class="availability-dot" aria-hidden="true"></span>
		<span>{availability.label}</span>
	</div>
{/if}
```

**Remove** the two badge CSS classes from the `<style>` block:

```css
.availability-badge {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	font-size: 0.8rem;
	color: var(--color-muted);
}

.availability-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: var(--color-available);
	flex-shrink: 0;
	box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-available) 25%, transparent);
}
```

- [ ] **Step 3: Type-check**

```bash
npm run check
```

Expected: no errors. If you see `'availability' is not exported`, you missed removing the import in step 2.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero-section.svelte src/lib/copy.ts
git commit -m "feat: remove homepage availability badge"
```

---

## Task 3: Update /hire page header description

**Files:**

- Modify: `src/routes/hire/+page.svelte`

- [ ] **Step 1: Update PageHeader description**

In `src/routes/hire/+page.svelte`, find the `<PageHeader>` component (around line 44):

```svelte
<PageHeader
	title="Work With Me"
	description="Available for contract work. Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise."
/>
```

Update the `description` prop:

```svelte
<PageHeader
	title="Work With Me"
	description="Ten-plus years embedded with engineering teams across fintech, healthcare, and enterprise. Open to contract engagements and full-time roles for the right opportunity."
/>
```

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/hire/+page.svelte
git commit -m "feat: update hire page description for dual contract/FTE positioning"
```

---

## Task 4: Add full-time FAQ item

**Files:**

- Modify: `src/lib/copy.ts`

- [ ] **Step 1: Add FAQ entry as first item**

In `src/lib/copy.ts`, find `export const faqItems = [` (around line 206 after Task 2's changes shift it). Insert the new item as the **first** entry:

```ts
export const faqItems = [
	{
		question: 'Are you open to full-time roles?',
		answer:
			"Yes — primarily I take on contract work, but I'm open to full-time for the right team and problem. If you're building something interesting and want someone who can operate as a senior IC or tech lead, reach out."
	},
	{
		question: 'What kinds of engagements do you take on?',
		// ... existing items unchanged
```

The existing first item ("What kinds of engagements do you take on?") stays — it covers the same ground more briefly. The new dedicated question surfaces the full-time openness more explicitly for recruiters scanning the FAQ.

- [ ] **Step 2: Type-check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Build**

```bash
npx vite build
```

Expected: build completes with no errors. This is the final verification — confirms all four changes work together in production mode.

- [ ] **Step 4: Commit**

```bash
git add src/lib/copy.ts
git commit -m "feat: add full-time FAQ item to hire page"
```
