# Stack Tag Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clicking a stack tag on a work card filters the project list to entries using that technology; clicking the active tag clears the filter.

**Architecture:** A Svelte 5 reactive state module (`work-filter.svelte.ts`) owns the filter state. A route-scoped layout (`src/routes/work/+layout.svelte`) resets the filter on navigation away. The page derives a filtered list; WorkCard renders tags as buttons that call into the store.

**Tech Stack:** Svelte 5 runes (`$state`, `$derived`), SvelteKit route layouts, TypeScript.

---

### Task 1: Create the work-filter state module

**Files:**

- Create: `src/lib/stores/work-filter.svelte.ts`

This module is the single source of truth for the active filter. All components import from here — no prop drilling.

- [ ] **Step 1: Create the file**

```ts
// src/lib/stores/work-filter.svelte.ts
let activeFilter = $state<string | null>(null);

export function getFilter() {
	return activeFilter;
}

export function toggle(tag: string) {
	activeFilter = activeFilter === tag ? null : tag;
}

export function reset() {
	activeFilter = null;
}
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/stores/work-filter.svelte.ts
git commit -m "feat(work): add work-filter reactive state module"
```

---

### Task 2: Create the route-scoped layout

**Files:**

- Create: `src/routes/work/+layout.svelte`

This layout wraps only the `/work` route. When the user navigates away, `onDestroy` fires and calls `reset()`, clearing the filter.

- [ ] **Step 1: Create the file**

```svelte
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { reset } from '$lib/stores/work-filter.svelte';

	let { children } = $props();

	onDestroy(reset);
</script>

{@render children()}
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/routes/work/+layout.svelte
git commit -m "feat(work): add route layout to reset filter on navigation"
```

---

### Task 3: Update the work page to render a filtered list

**Files:**

- Modify: `src/routes/work/+page.svelte`

The page currently iterates over `selectedWork` directly. Change it to derive a filtered list from the store and iterate over that instead.

- [ ] **Step 1: Add the import and derived list**

In `src/routes/work/+page.svelte`, add to the `<script>` block (after the existing imports):

```svelte
<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';
	import WorkCard from '../../components/work-card.svelte';
	import { selectedWork, earlierWork, gitLog } from '$lib/copy';
	import { jsonLd, breadcrumbList } from '$lib/utils';
	import { getFilter } from '$lib/stores/work-filter.svelte';

	const filteredWork = $derived(
		getFilter() ? selectedWork.filter((p) => p.stack.includes(getFilter()!)) : selectedWork
	);
</script>
```

- [ ] **Step 2: Replace the `#each` loop**

Find this block in the template:

```svelte
<div class="grid gap-6">
	{#each selectedWork as project (project.title)}
		<WorkCard {project} />
	{/each}
</div>
```

Replace with:

```svelte
<div class="grid gap-6">
	{#each filteredWork as project (project.title)}
		<WorkCard {project} />
	{/each}
</div>
```

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/work/+page.svelte
git commit -m "feat(work): derive filtered project list from work-filter store"
```

---

### Task 4: Make stack tags interactive in WorkCard

**Files:**

- Modify: `src/components/work-card.svelte`

Tags on `variant="full"` cards become `<button>` elements that call `toggle()`. Tags on `variant="preview"` cards (home page) remain `<span>` elements — no interaction, no change to their appearance.

- [ ] **Step 1: Add store imports to the script block**

In `src/components/work-card.svelte`, add to the existing imports:

```svelte
<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Card from './card.svelte';
	import { getFilter, toggle } from '$lib/stores/work-filter.svelte';
	// ... rest unchanged
</script>
```

- [ ] **Step 2: Replace the stack tags markup**

Find this block in the template:

```svelte
<div class="stack-tags">
	{#each project.stack as tag (tag)}
		<span class="stack-tag" class:muted={variant === 'preview'}>{tag}</span>
	{/each}
</div>
```

Replace with:

```svelte
<div class="stack-tags">
	{#each project.stack as tag (tag)}
		{#if variant === 'full'}
			<button class="stack-tag" class:active={getFilter() === tag} onclick={() => toggle(tag)}>
				{tag}
			</button>
		{:else}
			<span class="stack-tag muted">{tag}</span>
		{/if}
	{/each}
</div>
```

- [ ] **Step 3: Add active and button styles to the `<style>` block**

In the `<style>` block, add after the existing `.stack-tag` rule:

```css
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
```

- [ ] **Step 4: Run type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/work-card.svelte
git commit -m "feat(work): make stack tags clickable filter buttons on full variant"
```

---

### Task 5: Build verification

- [ ] **Step 1: Run production build**

```bash
npx vite build
```

Expected: build completes with no errors.

- [ ] **Step 2: Manual smoke test**

Start the dev server:

```bash
npm run dev
```

Navigate to `http://localhost:5173/work` and verify:

- Clicking a stack tag (e.g. "React") hides cards that don't include React
- The clicked tag has a stronger teal highlight (solid border, brighter bg)
- Clicking the same tag again restores all cards
- Clicking a different active tag switches the filter
- Navigating to `/` and back to `/work` shows all cards (filter was reset)
- Home page preview cards (if any) show tags as plain text with no hover/click behavior

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Expected: no errors. If formatting issues, run `npm run format` then re-check.
