# Stack Tag Filter — Design Spec

**Date:** 2026-04-17
**Issue:** #7 — TICKET-070 Stack Tag Filter on /work
**Status:** Approved

## Summary

Clicking a stack tag on a work card filters the project list to entries that share that technology. Clicking the active tag clears the filter. State lives in a reactive Svelte 5 module; a route-scoped layout handles reset on navigation.

## Architecture

Four files touched, one new file, one new layout:

| File                                   | Change                                                           |
| -------------------------------------- | ---------------------------------------------------------------- |
| `src/lib/stores/work-filter.svelte.ts` | **New.** Reactive state module.                                  |
| `src/routes/work/+layout.svelte`       | **New.** Route-scoped layout; resets filter on destroy.          |
| `src/routes/work/+page.svelte`         | Import `getFilter`, derive filtered list, render `filteredWork`. |
| `src/components/work-card.svelte`      | Import `getFilter` + `toggle`; tags become `<button>` elements.  |

## State Module

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

No prop drilling. Any component that imports these functions reacts to `activeFilter` automatically via Svelte 5 rune reactivity.

## Route Layout

```svelte
<!-- src/routes/work/+layout.svelte -->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { reset } from '$lib/stores/work-filter.svelte';
	onDestroy(reset);
</script>

{@render children()}
```

Scoped to `/work` only. Filter resets whenever the user navigates away.

## Page Component

`+page.svelte` derives a filtered list:

```svelte
import {getFilter} from '$lib/stores/work-filter.svelte'; const filteredWork = $derived( getFilter() ?
selectedWork.filter(p => p.stack.includes(getFilter()!)) : selectedWork );
```

Renders `filteredWork` instead of `selectedWork`. No other changes to the page.

## WorkCard Component

Tags change from `<span>` to `<button>`. New imports: `getFilter`, `toggle`.

```svelte
{#each project.stack as tag (tag)}
	<button
		class="stack-tag"
		class:active={getFilter() === tag}
		class:muted={variant === 'preview'}
		onclick={() => variant === 'full' && toggle(tag)}
	>
		{tag}
	</button>
{/each}
```

Active state styling: solid teal border, slightly brighter background — same accent token, higher opacity. Preview variant (`variant="preview"`, used on home page) tags receive no click handler and no active highlight; they remain visually inert.

## Behaviour

- Clicking a tag sets it as active filter; all non-matching cards disappear
- Clicking the active tag again clears the filter; all cards return
- No page reload, no URL change, no CLS
- Filter persists while the user is on `/work`; resets on navigation away

## Out of Scope

- URL-persisted filter state
- Multi-tag selection
- Home page preview cards (no changes)
- Animation on card removal
