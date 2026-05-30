# Case Study Dedicated Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/work/[slug]` dedicated pages for the four main case studies (iCapital, Angi, Shell, Healthcasts), linked from work cards.

**Architecture:** A single dynamic SvelteKit route (`src/routes/work/[slug]`) loads the matching entry from `selectedWork` in `copy.ts` by slug, returning a 404 for unknowns. The work card gains an optional `slug` field and renders a "full case study →" link alongside the existing inline toggle.

**Tech Stack:** SvelteKit 2 (Svelte 5), TypeScript, `$lib/copy` for data, `@sveltejs/kit` `error()` for 404s.

---

## File Map

| File                                  | Action | Purpose                                                           |
| ------------------------------------- | ------ | ----------------------------------------------------------------- |
| `src/lib/copy.ts`                     | Modify | Add `slug` field to each `selectedWork` entry                     |
| `src/routes/work/[slug]/+page.ts`     | Create | Load function — looks up by slug, returns project + prev/next     |
| `src/routes/work/[slug]/+page.svelte` | Create | Case study page — header, prose sections, prev/next nav           |
| `src/components/work-card.svelte`     | Modify | Add `slug?: string` to interface, render "full case study →" link |

---

## Task 1: Add slugs to `selectedWork`

**Files:**

- Modify: `src/lib/copy.ts`

- [ ] **Step 1: Add `slug` field to each entry**

In `src/lib/copy.ts`, add `slug` as the first field of each object in `selectedWork`:

```typescript
export const selectedWork = [
	{
		slug: 'icapital',
		title: 'iCapital — Fintech Platform Engineering'
		// ... rest unchanged
	},
	{
		slug: 'angi',
		title: 'Angi — Multi-Platform Engineering'
		// ... rest unchanged
	},
	{
		slug: 'shell',
		title: 'Shell — Oil Platform Decommissioning'
		// ... rest unchanged
	},
	{
		slug: 'healthcasts',
		title: 'Healthcasts — Platform Modernization'
		// ... rest unchanged
	}
];
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/copy.ts
git commit -m "feat(work): add slug field to selectedWork entries"
```

---

## Task 2: Create the load function

**Files:**

- Create: `src/routes/work/[slug]/+page.ts`

- [ ] **Step 1: Create the file**

Create `src/routes/work/[slug]/+page.ts` with this content:

```typescript
import { error } from '@sveltejs/kit';
import { selectedWork } from '$lib/copy';

export const prerender = true;

export function load({ params }) {
	const index = selectedWork.findIndex((w) => w.slug === params.slug);

	if (index === -1) {
		error(404, 'Case study not found');
	}

	return {
		project: selectedWork[index],
		prev: index > 0 ? selectedWork[index - 1] : null,
		next: index < selectedWork.length - 1 ? selectedWork[index + 1] : null
	};
}
```

- [ ] **Step 2: Run check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/work/[slug]/+page.ts
git commit -m "feat(work): add case study slug route load function"
```

---

## Task 3: Create the case study page

**Files:**

- Create: `src/routes/work/[slug]/+page.svelte`

- [ ] **Step 1: Create the page**

Create `src/routes/work/[slug]/+page.svelte`:

```svelte
<script lang="ts">
	import SeoHead from '../../../components/seo-head.svelte';
	import PageHeader from '../../../components/page-header.svelte';
	import { jsonLd, breadcrumbList } from '$lib/utils';

	let { data } = $props();

	let project = $derived(data.project);
	let prev = $derived(data.prev);
	let next = $derived(data.next);

	let companyName = $derived(project.title.split('—')[0].trim());
	let seoDescription = $derived(project.caseStudy?.situation.split('.')[0] + '.');
</script>

<SeoHead
	title="{companyName} Case Study — Adam Robinson"
	description={seoDescription ?? project.description}
	path="/work/{project.slug}"
/>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd(
		breadcrumbList([
			{ name: 'Home', path: '/' },
			{ name: 'Work', path: '/work' },
			{ name: companyName, path: `/work/${project.slug}` }
		])
	)}</` + `script>`}
</svelte:head>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title={project.title}
		description="via MojoTech · {project.period}"
		backHref="/work"
		backLabel="back to work"
	/>

	<div class="stack-tags">
		{#each project.stack as tag (tag)}
			<span class="stack-tag">{tag}</span>
		{/each}
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

	<nav class="case-study-nav" aria-label="Case study navigation">
		<div class="nav-prev">
			{#if prev}
				<a href="/work/{prev.slug}" class="nav-link">
					<span class="nav-arrow">←</span>
					<span class="nav-label">{prev.title.split('—')[0].trim()}</span>
				</a>
			{/if}
		</div>
		<div class="nav-next">
			{#if next}
				<a href="/work/{next.slug}" class="nav-link">
					<span class="nav-label">{next.title.split('—')[0].trim()}</span>
					<span class="nav-arrow">→</span>
				</a>
			{/if}
		</div>
	</nav>
</div>

<style>
	.stack-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2.5rem;
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

	.case-study {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.cs-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.cs-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
	}

	.cs-body {
		font-size: 1rem;
		color: var(--color-text);
		line-height: 1.8;
		margin: 0;
	}

	.case-study-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 4rem;
		padding-top: 1.5rem;
		padding-bottom: 3rem;
		border-top: 1px solid var(--color-border);
	}

	.nav-prev {
		flex: 1;
	}

	.nav-next {
		flex: 1;
		text-align: right;
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.nav-link:hover {
		color: var(--color-accent);
	}

	.nav-arrow {
		flex-shrink: 0;
	}
</style>
```

- [ ] **Step 2: Run check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Run build**

```bash
npx vite build
```

Expected: build succeeds, `/work/icapital`, `/work/angi`, `/work/shell`, `/work/healthcasts` prerendered.

- [ ] **Step 4: Commit**

```bash
git add src/routes/work/[slug]/+page.svelte
git commit -m "feat(work): add case study dedicated page"
```

---

## Task 4: Add "full case study →" link to work card

**Files:**

- Modify: `src/components/work-card.svelte`

- [ ] **Step 1: Add `slug` to the `WorkItem` interface**

In `src/components/work-card.svelte`, update the `WorkItem` interface:

```typescript
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
```

- [ ] **Step 2: Add the link to the toggle row**

Find the toggle row (around line 58–61):

```svelte
{#if project.caseStudy && variant === 'full'}
	<div class="toggle-row">
		<button class="toggle" onclick={() => (expanded = !expanded)}>
			{expanded ? '↑ collapse' : '↓ case study'}
		</button>
	</div>
```

Replace it with:

```svelte
{#if project.caseStudy && variant === 'full'}
	<div class="toggle-row">
		<button class="toggle" onclick={() => (expanded = !expanded)}>
			{expanded ? '↑ collapse' : '↓ case study'}
		</button>
		{#if project.slug}
			<a href="/work/{project.slug}" class="case-study-link">full case study →</a>
		{/if}
	</div>
```

- [ ] **Step 3: Add CSS for the toggle row and link**

The existing `.toggle-row` style only positions the button. Update it to lay out both elements side by side, and add the link style. In the `<style>` block, replace:

```css
.toggle-row {
	margin-top: 1.25rem;
	padding-top: 1rem;
	border-top: 1px solid var(--color-border);
}
```

with:

```css
.toggle-row {
	margin-top: 1.25rem;
	padding-top: 1rem;
	border-top: 1px solid var(--color-border);
	display: flex;
	align-items: center;
	gap: 1rem;
}

.case-study-link {
	font-family: var(--font-mono);
	font-size: 0.75rem;
	color: var(--color-muted);
	text-decoration: none;
	transition: color 150ms ease;
}

.case-study-link:hover {
	color: var(--color-accent);
}
```

- [ ] **Step 4: Run check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 5: Run build**

```bash
npx vite build
```

Expected: clean build.

- [ ] **Step 6: Commit**

```bash
git add src/components/work-card.svelte
git commit -m "feat(work): add full case study link to work card"
```

---

## Self-Review

**Spec coverage:**

- ✅ `/work/[slug]` dynamic route with 404 handling
- ✅ `PageHeader` with title, "via MojoTech · period" description, back link
- ✅ Stack tags (non-interactive)
- ✅ situation / work / outcome sections
- ✅ Prev/next nav at bottom ordered by `selectedWork` array
- ✅ SEO via `SeoHead` with generated title and first sentence of situation
- ✅ Work card gets optional `slug`, renders "full case study →" link
- ✅ Existing inline toggle preserved
- ✅ `prerender = true` on the load function

**Type consistency:** `slug` is `string` in `copy.ts`, `slug?: string` in `WorkItem` interface, `params.slug` is `string` from SvelteKit — consistent throughout.

**No placeholders:** All steps contain complete code.
