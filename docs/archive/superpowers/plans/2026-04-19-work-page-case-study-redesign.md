# Work Page & Case Study Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make case study narratives visible by default on `/work`, clean up card structure, and fix the slug page header.

**Architecture:** Three targeted file edits — copy rewrite in `copy.ts`, component restructure in `work-card.svelte`, and a one-line fix in the slug page. No new files, no new dependencies.

**Tech Stack:** SvelteKit 2 / Svelte 5, TypeScript, Tailwind CSS 4. No test framework — verification is `npm run check` (type check) + `npx vite build`.

---

## File Map

| File                                  | Change                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/lib/copy.ts`                     | Rewrite `caseStudy.work` for all 4 projects                                        |
| `src/components/work-card.svelte`     | Remove toggle/expand/description/outcome; add always-visible case study + meta row |
| `src/routes/work/[slug]/+page.svelte` | Replace "via MojoTech" with role in PageHeader description                         |

---

## Task 1: Rewrite case study `work` copy

**Files:**

- Modify: `src/lib/copy.ts`

- [ ] **Step 1: Update iCapital `caseStudy.work`**

In `src/lib/copy.ts`, find the iCapital entry and replace the `work` field:

```ts
work: "Expanded translation support across the platform, covering both static UI copy and dynamic database-backed content using the Mobility gem. On the Nominee Investments project — a high-visibility initiative to unify several disparate nominee investment flows — co-designed and built a new Rails service to consolidate bulk processing for thousands of investments. Also drove the team's migration from Supernova v1 to v2, navigating breaking changes and coordinating with the library team when components needed fixes before the upgrade could proceed.",
```

- [ ] **Step 2: Update Angi `caseStudy.work`**

Find the Angi entry and replace `work`:

```ts
work: "On HomeAdvisor, worked in Vue and Java to unify the user quiz flow across the merging brands into a single Angi experience. On Handy, worked in Rails and React on professional assignment logic and job ingestion for Handy partner stores. On Angie's List, built out a CMS-driven content experience in Next.js — blog-style project descriptions with varied visual layouts. Along the way, took on a team of interns: coached them through real development workflows using a live use case — a Careers page revamp — and by the end they had something real to demo.",
```

- [ ] **Step 3: Update Shell `caseStudy.work`**

Find the Shell entry and replace `work`:

```ts
work: "Built a full-stack application that ingested oil platform data and determined the optimal, least-cost decommissioning path. Frontend in React with Ant Design, backend in Node. Worked onsite with the Shell Techworks team in Boston, using the Google Design Sprint process to rapidly iterate and arrive at a clear MVP scope — compressing months of potential back-and-forth into focused, structured sessions.",
```

- [ ] **Step 4: Update Healthcasts `caseStudy.work`**

Find the Healthcasts entry and replace `work`:

```ts
work: "Built a new publishing pipeline around a headless CMS (Strapi) and a custom React rendering layer, dramatically reducing time-to-publish for their core medical consensus deliverable. Updated AWS infrastructure and migrated frameworks to current, supported versions. Then led a full authentication overhaul — unifying login across all their platforms with Auth0, moving to a single secure flow that also unblocked a parallel AI initiative dependent on a cleaner identity layer.",
```

- [ ] **Step 5: Type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/copy.ts
git commit -m "copy: tighten case study work sections for scannability"
```

---

## Task 2: Redesign work card

**Files:**

- Modify: `src/components/work-card.svelte`

The current card has an expand toggle, a `description` paragraph, and an `outcome` summary line. The case study renders inside a conditional `{#if expanded}` block with slide/fly animations. All of that goes away. The new card always shows the case study and consolidates role + stack + slug link into a single meta row.

- [ ] **Step 1: Replace the entire file**

Overwrite `src/components/work-card.svelte` with:

```svelte
<script lang="ts">
	import Card from './card.svelte';
	import { getFilter, toggle } from '$lib/stores/work-filter.svelte';

	interface CaseStudy {
		situation: string;
		work: string;
		outcome: string;
	}

	interface WorkItem {
		slug?: string;
		title: string;
		period: string;
		role: string;
		description: string;
		stack: string[];
		outcome: string;
		caseStudy?: CaseStudy;
	}

	let { project, variant = 'full' }: { project: WorkItem; variant?: 'preview' | 'full' } = $props();
</script>

<Card variant="work" class="p-6">
	<div class="header">
		<h3 class="title">{project.title}</h3>
		<span class="period">{project.period}</span>
	</div>

	<div class="meta-row">
		<span class="meta-role">{project.role}</span>
		<div class="meta-stack">
			{#each project.stack as tag (tag)}
				{#if variant === 'full'}
					<button
						class="stack-tag"
						class:active={getFilter() === tag}
						aria-pressed={getFilter() === tag}
						onclick={() => toggle(tag)}
					>
						{tag}
					</button>
				{:else}
					<span class="stack-tag muted">{tag}</span>
				{/if}
			{/each}
		</div>
		{#if project.slug && variant === 'full'}
			<a href="/work/{project.slug}" class="case-study-link">full case study →</a>
		{/if}
	</div>

	{#if project.caseStudy}
		<div class="case-study">
			<div class="cs-section">
				<span class="cs-label">situation</span>
				<p class="cs-body">{project.caseStudy.situation}</p>
			</div>
			<div class="cs-section">
				<span class="cs-label">work</span>
				<p class="cs-body">{project.caseStudy.work}</p>
			</div>
			<div class="cs-section">
				<span class="cs-label">outcome</span>
				<p class="cs-body">{project.caseStudy.outcome}</p>
			</div>
		</div>
	{/if}
</Card>

<style>
	.header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.5rem;
	}

	.title {
		color: var(--color-text);
		font-size: 1.1rem;
		font-weight: 600;
	}

	.period {
		font-size: 0.8rem;
		color: var(--color-muted);
		font-family: var(--font-mono);
		white-space: nowrap;
	}

	.meta-row {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		margin-bottom: 1.25rem;
	}

	.meta-role {
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-accent);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		white-space: nowrap;
	}

	.meta-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		flex: 1;
		min-width: 0;
	}

	.stack-tag {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background-color: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
		color: var(--color-accent);
	}

	.stack-tag.muted {
		border-color: var(--color-border);
		color: var(--color-muted);
	}

	button.stack-tag {
		cursor: pointer;
		line-height: inherit;
		appearance: none;
	}

	button.stack-tag:hover {
		background-color: color-mix(in srgb, var(--color-accent) 15%, var(--color-bg));
		border-color: color-mix(in srgb, var(--color-accent) 40%, transparent);
	}

	.stack-tag.active {
		background-color: color-mix(in srgb, var(--color-accent) 20%, var(--color-bg));
		border-color: var(--color-accent);
	}

	.case-study-link {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
		white-space: nowrap;
		margin-left: auto;
	}

	.case-study-link:hover {
		color: var(--color-accent);
	}

	.case-study {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.cs-section {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.cs-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
	}

	.cs-body {
		font-size: 0.9rem;
		color: var(--color-text);
		line-height: 1.7;
		margin: 0;
	}
</style>
```

- [ ] **Step 2: Type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/work-card.svelte
git commit -m "feat: show case study content by default, remove expand toggle"
```

---

## Task 3: Fix slug page header

**Files:**

- Modify: `src/routes/work/[slug]/+page.svelte`

The `PageHeader` currently shows `"via MojoTech · {project.period}"` as its description. Replace with the project's role.

- [ ] **Step 1: Update PageHeader description**

In `src/routes/work/[slug]/+page.svelte`, find:

```svelte
description="via MojoTech · {project.period}"
```

Replace with:

```svelte
description="{project.role} · {project.period}"
```

- [ ] **Step 2: Type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/work/[slug]/+page.svelte
git commit -m "fix: replace MojoTech attribution with role on case study pages"
```

---

## Task 4: Production build verification

**Files:** none

- [ ] **Step 1: Run production build**

```bash
npx vite build
```

Expected: build completes with no errors. You'll see output like:

```
✓ built in Xs
```

If any type errors or import errors appear, fix them before proceeding.

- [ ] **Step 2: Spot-check in dev server**

```bash
npm run dev
```

Open `http://localhost:5173/work` and verify:

- Each card shows situation/work/outcome without needing to click anything
- Role and stack tags appear in a single compact row below the title
- "full case study →" link is visible on each card
- Clicking a stack tag still filters the list
- Open one slug page (e.g. `/work/icapital`) and confirm the header shows the role, not "via MojoTech"
