# Trust Indicators Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the trust-signals design from `docs/superpowers/specs/2026-04-16-trust-indicators-design.md` — a homepage metrics upgrade, a `/hire` philosophy section with an initials placeholder, and a `/hire` public-activity section backed by an Upstash-cached GitHub API.

**Architecture:** Pure SvelteKit 2 (Svelte 5) additions. GitHub stats flow: `src/routes/api/github/+server.ts` → `src/lib/server/githubService.ts` (two-tier cache: in-memory L1, Upstash L2 — mirrors the existing Goodreads service). `/hire` stays `prerender = true`; the Public Activity section fetches `/api/github` client-side after mount so the prerendered shell stays static while the numbers stay fresh. Degrades silently: if the fetch fails or returns zeros, the section is omitted from the DOM.

**Tech Stack:** Svelte 5 (runes), TypeScript, Tailwind 4, `@upstash/redis`, SvelteKit 2 API routes.

**Verification model:** The project has no test suite (confirmed — no `tests/` dir, no test runner in `package.json`). CLAUDE.md mandates `npx vite build` before considering a task complete. Each task in this plan ends with: `npm run check` (type-check) → `npx vite build` (compile) → manual preview at `npm run dev` → commit. No TDD steps; verification is compile + visual.

---

## File Structure

**Create:**
- `src/components/headshot.svelte` — circular initials placeholder (accepts optional image src)
- `src/components/philosophy-section.svelte` — `/hire` philosophy block (headshot + paragraph)
- `src/components/public-activity-section.svelte` — `/hire` GitHub activity block (stat-block grid)
- `src/lib/server/githubService.ts` — two-tier cached GraphQL fetcher
- `src/routes/api/github/+server.ts` — API endpoint

**Modify:**
- `src/components/hero-section.svelte` — upgrade `.hero-stats` markup + styles to two-tier layout
- `src/lib/copy.ts` — add `homepageMetrics` and `philosophy` exports
- `src/lib/constants.ts` — add `GITHUB_USERNAME` constant
- `src/lib/types.ts` — add `GithubActivity` type
- `src/routes/hire/+page.svelte` — insert Philosophy and Public Activity sections

**Leave unchanged:** `src/routes/hire/+page.ts` (`prerender = true` stays — the Public Activity section hydrates client-side).

---

## Task 1: Homepage — upgrade hero-stats to two-tier metrics

**Files:**
- Modify: `src/components/hero-section.svelte:20-33` (markup) and `:86-111` (styles)
- Modify: `src/lib/copy.ts` (add export)

- [ ] **Step 1: Add `homepageMetrics` export to copy.ts**

Append to the end of `src/lib/copy.ts`:

```ts
export const homepageMetrics = {
	numbers: [
		{ value: '10+', label: 'Years' },
		{ value: '15+', label: 'Projects' }
	],
	industries: ['fintech', 'healthcare', 'enterprise']
};
```

- [ ] **Step 2: Replace `.hero-stats` markup in hero-section.svelte**

In `src/components/hero-section.svelte`, import the new export. Update the script block (line 1-3):

```svelte
<script lang="ts">
	import { availability, homepageMetrics } from '$lib/copy';
</script>
```

Replace the `<div class="hero-stats ...">...</div>` block (currently lines 20-33) with:

```svelte
<div class="hero-stats mt-4 mb-2">
	<div class="stats-numbers">
		{#each homepageMetrics.numbers as metric (metric.label)}
			<div class="stat-item">
				<span class="stat-number">{metric.value}</span>
				<span class="stat-label">{metric.label}</span>
			</div>
		{/each}
	</div>
	<div class="stats-industries" aria-label="Industries">
		{#each homepageMetrics.industries as industry, i (industry)}
			{#if i > 0}<span class="industry-sep" aria-hidden="true">/</span>{/if}<span
				class="industry-tag">{industry}</span
			>
		{/each}
	</div>
</div>
```

- [ ] **Step 3: Replace `.hero-stats` styles**

In the `<style>` block of `src/components/hero-section.svelte`, replace the existing `.hero-stats`, `.stat-item`, `.stat-number`, `.stat-label` rules (currently lines 86-111) with:

```css
.hero-stats {
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: flex-start;
}

.stats-numbers {
	display: flex;
	gap: 32px;
}

.stat-item {
	text-align: left;
}

.stat-number {
	display: block;
	font-weight: 600;
	font-size: 1.125rem;
	color: var(--color-accent);
	font-family: var(--font-mono);
}

.stat-label {
	display: block;
	font-size: 0.7rem;
	color: var(--color-muted);
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-top: 2px;
}

.stats-industries {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;
	font-family: var(--font-mono);
	font-size: 0.75rem;
	color: var(--color-muted);
	text-transform: uppercase;
	letter-spacing: 1.5px;
}

.industry-sep {
	color: color-mix(in srgb, var(--color-muted) 40%, transparent);
}

.industry-tag {
	color: var(--color-muted);
}
```

- [ ] **Step 4: Type-check + build**

Run:
```bash
npm run check && npx vite build
```
Expected: `svelte-check found 0 errors` and a successful Vite build.

- [ ] **Step 5: Manual visual check**

Run `npm run dev` and open the homepage. Verify:
- Hero now reads `10+ Years` and `15+ Projects` as the two numbers (accent-colored, mono)
- Below them: `fintech / healthcare / enterprise` as small muted mono text
- The filler "Full Stack" and "Team Lead" labels are gone
- Hero layout/spacing looks intact below the availability badge and CTAs

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero-section.svelte src/lib/copy.ts
git commit -m "$(cat <<'EOF'
feat(hero): upgrade homepage metrics to two-tier defensible stats

Replace filler "Full Stack / Team Lead" with projects count and industry tags. Values come from copy.ts so future edits stay in one place.
EOF
)"
```

---

## Task 2: Headshot component + philosophy copy

**Files:**
- Create: `src/components/headshot.svelte`
- Modify: `src/lib/copy.ts` (add `philosophy` export)

- [ ] **Step 1: Create `src/components/headshot.svelte`**

```svelte
<script lang="ts">
	let {
		initials = 'AR',
		size = 56,
		src,
		alt = 'Adam Robinson'
	}: {
		initials?: string;
		size?: number;
		src?: string;
		alt?: string;
	} = $props();
</script>

<div
	class="headshot"
	style="width: {size}px; height: {size}px; font-size: {Math.round(size * 0.38)}px;"
	aria-label={alt}
>
	{#if src}
		<img {src} {alt} width={size} height={size} loading="lazy" />
	{:else}
		<span class="initials" aria-hidden="true">{initials}</span>
	{/if}
</div>

<style>
	.headshot {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: color-mix(in srgb, var(--color-accent) 12%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
		font-family: var(--font-mono);
		font-weight: 600;
		color: var(--color-accent);
		flex-shrink: 0;
		overflow: hidden;
	}

	.headshot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.initials {
		letter-spacing: 0.5px;
	}
</style>
```

Rationale: Accepts an optional `src` so a real headshot can be swapped in later with no component changes — just pass an image path. Default renders "AR" in the accent color over a muted accent fill.

- [ ] **Step 2: Add `philosophy` export to copy.ts**

Append to `src/lib/copy.ts`:

```ts
export const philosophy = {
	heading: 'How I work',
	body: "The best engineers I've worked with weren't the ones with the strongest opinions — they were the ones who listened first. When I join a team, my job isn't to replace your culture, your patterns, or your conventions. It's to slot in, read the code before I write any, ask the questions a newcomer notices but regulars have stopped asking, and then ship reliably. I'd rather land one well-scoped change than three speculative ones. I treat every codebase as something other engineers will inherit from me — including the one I'm touching right now."
};
```

- [ ] **Step 3: Type-check + build**

```bash
npm run check && npx vite build
```
Expected: 0 errors, successful build.

- [ ] **Step 4: Commit**

```bash
git add src/components/headshot.svelte src/lib/copy.ts
git commit -m "$(cat <<'EOF'
feat(components): add headshot placeholder + philosophy copy

Headshot accepts optional image src so a real photo swaps in later without component changes. Philosophy paragraph lives in copy.ts alongside other page copy.
EOF
)"
```

---

## Task 3: Philosophy section + `/hire` integration

**Files:**
- Create: `src/components/philosophy-section.svelte`
- Modify: `src/routes/hire/+page.svelte`

- [ ] **Step 1: Create `src/components/philosophy-section.svelte`**

```svelte
<script lang="ts">
	import Headshot from './headshot.svelte';
	import { philosophy } from '$lib/copy';
</script>

<section aria-labelledby="philosophy-heading" class="py-14 section-border">
	<h2 id="philosophy-heading" class="section-heading mb-8">
		{philosophy.heading}
		<span class="accent-dot" aria-hidden="true">.</span>
	</h2>
	<div class="philosophy-body">
		<Headshot size={56} />
		<p class="philosophy-text">{philosophy.body}</p>
	</div>
</section>

<style>
	.philosophy-body {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: flex-start;
	}

	.philosophy-text {
		font-size: 0.95rem;
		line-height: 1.7;
		color: var(--color-text);
	}

	@media (min-width: 640px) {
		.philosophy-body {
			flex-direction: row;
			gap: 20px;
			align-items: flex-start;
		}
	}
</style>
```

- [ ] **Step 2: Wire Philosophy into `/hire` between Services and Technologies**

In `src/routes/hire/+page.svelte`, add the import in the script block:

```svelte
import PhilosophySection from '../../components/philosophy-section.svelte';
```

Then insert `<PhilosophySection />` in the markup **after** `<ServicesSection />` and **before** the Technologies `<section>`. The full chunk to replace:

```svelte
	<ServicesSection />

	<section aria-labelledby="stack-heading" class="py-14 section-border">
```

becomes:

```svelte
	<ServicesSection />

	<PhilosophySection />

	<section aria-labelledby="stack-heading" class="py-14 section-border">
```

- [ ] **Step 3: Type-check + build**

```bash
npm run check && npx vite build
```
Expected: 0 errors, successful build.

- [ ] **Step 4: Manual visual check**

Run `npm run dev`, navigate to `/hire`. Verify:
- Section flow is: PageHeader → Services → Philosophy → Technologies → FAQ → CTA
- Philosophy heading "How I work" with accent-dot matches other section headings
- Headshot is a ~56px circle with "AR" in accent color
- On mobile (narrow viewport), headshot stacks above paragraph
- On desktop (≥640px), headshot is to the left of the paragraph, top-aligned
- Paragraph text reads cleanly — no orphaned words, no horizontal scroll

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/philosophy-section.svelte src/routes/hire/+page.svelte
git commit -m "$(cat <<'EOF'
feat(hire): add philosophy section with headshot placeholder

Inserts between Services and Technologies. Heading + accent-dot matches existing section pattern. Headshot component renders AR initials until a real photo is supplied.
EOF
)"
```

---

## Task 4: GitHub service layer (type, constant, service)

**Files:**
- Modify: `src/lib/types.ts` (add `GithubActivity` type)
- Modify: `src/lib/constants.ts` (add `GITHUB_USERNAME`)
- Create: `src/lib/server/githubService.ts`

- [ ] **Step 1: Add `GithubActivity` type**

Append to `src/lib/types.ts`:

```ts
export type GithubActivity = {
	commitsLastYear: number;
	publicRepos: number;
	languages: string[];
};
```

- [ ] **Step 2: Add `GITHUB_USERNAME` constant**

Append to `src/lib/constants.ts`:

```ts
export const GITHUB_USERNAME = 'aaddaamm';
```

- [ ] **Step 3: Create `src/lib/server/githubService.ts`**

```ts
import type { GithubActivity } from '$lib/types';
import { GITHUB_USERNAME } from '$lib/constants';
import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const CACHE_TTL_MS = CACHE_TTL_SECONDS * 1000;
const CACHE_KEY = `github:activity:${GITHUB_USERNAME}`;

// Curated language shortlist — the subset we're willing to show publicly.
// Anything not in this list is filtered out to avoid surfacing tutorial-only repos.
const LANGUAGE_ALLOWLIST = new Set([
	'TypeScript',
	'JavaScript',
	'Svelte',
	'Ruby',
	'Elixir',
	'C++',
	'Go',
	'Rust',
	'Python'
]);

const memoryCache: { data: GithubActivity | null; timestamp: number } = {
	data: null,
	timestamp: 0
};

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
	if (redisClient !== undefined) return redisClient;
	if (!env.KV_REST_API_URL || !env.KV_REST_API_TOKEN) return (redisClient = null);
	try {
		return (redisClient = new Redis({
			url: env.KV_REST_API_URL,
			token: env.KV_REST_API_TOKEN
		}));
	} catch {
		return (redisClient = null);
	}
}

async function fetchFromGithub(fetch: typeof globalThis.fetch): Promise<GithubActivity | null> {
	if (!env.GITHUB_TOKEN) {
		console.warn('GithubService: GITHUB_TOKEN not set — skipping fetch');
		return null;
	}

	const query = `
		query($login: String!) {
			user(login: $login) {
				publicRepos: repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false) {
					totalCount
					nodes {
						primaryLanguage { name }
					}
				}
				contributionsCollection {
					totalCommitContributions
				}
			}
		}
	`;

	try {
		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.GITHUB_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, variables: { login: GITHUB_USERNAME } })
		});

		if (!response.ok) {
			console.error(`GithubService: fetch failed with status ${response.status}`);
			return null;
		}

		const json = (await response.json()) as {
			data?: {
				user?: {
					publicRepos?: {
						totalCount: number;
						nodes: Array<{ primaryLanguage: { name: string } | null }>;
					};
					contributionsCollection?: { totalCommitContributions: number };
				};
			};
		};

		const user = json.data?.user;
		if (!user) return null;

		const languageSet = new Set<string>();
		for (const node of user.publicRepos?.nodes ?? []) {
			const name = node.primaryLanguage?.name;
			if (name && LANGUAGE_ALLOWLIST.has(name)) {
				languageSet.add(name);
			}
		}

		return {
			commitsLastYear: user.contributionsCollection?.totalCommitContributions ?? 0,
			publicRepos: user.publicRepos?.totalCount ?? 0,
			languages: [...languageSet]
		};
	} catch (err) {
		console.error('GithubService: fetch threw:', err);
		return null;
	}
}

export namespace GithubService {
	export async function getActivity(
		fetch: typeof globalThis.fetch
	): Promise<GithubActivity | null> {
		// L1: in-memory cache
		if (memoryCache.data && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
			return memoryCache.data;
		}

		// L2: Upstash
		const redis = getRedis();
		if (redis) {
			try {
				const cached = await redis.get<GithubActivity>(CACHE_KEY);
				if (cached) {
					memoryCache.data = cached;
					memoryCache.timestamp = Date.now();
					return cached;
				}
			} catch (err) {
				console.error('GithubService: Redis read failed:', err);
			}
		}

		// Fetch from GitHub
		const fresh = await fetchFromGithub(fetch);
		if (!fresh) return null;

		// Populate both caches
		memoryCache.data = fresh;
		memoryCache.timestamp = Date.now();
		if (redis) {
			try {
				await redis.set(CACHE_KEY, fresh, { ex: CACHE_TTL_SECONDS });
			} catch (err) {
				console.error('GithubService: Redis write failed:', err);
			}
		}

		return fresh;
	}
}

export default GithubService;
```

Rationale: Mirrors the Goodreads service structurally. Returns `null` on any failure rather than throwing, so callers can degrade silently. Requires `GITHUB_TOKEN` env var (personal access token with `read:user` scope) — without it, service returns null, section hides.

- [ ] **Step 4: Type-check + build**

```bash
npm run check && npx vite build
```
Expected: 0 errors, successful build.

- [ ] **Step 5: Commit**

```bash
git add src/lib/types.ts src/lib/constants.ts src/lib/server/githubService.ts
git commit -m "$(cat <<'EOF'
feat(server): add github activity service with two-tier caching

Mirrors the goodreads service — L1 memory, L2 upstash. Returns null on any failure so callers can hide the section silently. 24-hour TTL.
EOF
)"
```

---

## Task 5: GitHub API route

**Files:**
- Create: `src/routes/api/github/+server.ts`

- [ ] **Step 1: Create the route**

```ts
import GithubService from '$lib/server/githubService';
import { createApiResponse } from '$lib/server/api-utils';

export async function GET({ fetch }) {
	const activity = await GithubService.getActivity(fetch);

	if (!activity) {
		return createApiResponse(null, {
			status: 503,
			statusText: 'GitHub activity unavailable'
		});
	}

	return createApiResponse(activity, {
		cacheControl: 's-maxage=86400, stale-while-revalidate=3600'
	});
}
```

Rationale: Same pattern as the Goodreads routes (`src/routes/api/goodreads/currently-reading/+server.ts`). 24h shared CDN cache aligns with the service's 24h Upstash TTL. Returns 503 with `null` body when data is unavailable — the client component checks for a 200 and non-null payload before rendering.

- [ ] **Step 2: Type-check + build**

```bash
npm run check && npx vite build
```
Expected: 0 errors, successful build.

- [ ] **Step 3: Manual smoke test**

If `GITHUB_TOKEN` is set locally (check `.env`):
```bash
npm run dev
```
In another terminal: `curl http://localhost:5173/api/github` — should return JSON like `{"commitsLastYear":314,"publicRepos":24,"languages":["TypeScript","Svelte",...]}`.

If `GITHUB_TOKEN` is not set: `curl` returns a 503 with `null` body. This is expected behavior — the section will simply not render in the next task. Note in the commit message that GITHUB_TOKEN needs to be added to Vercel's environment variables for production.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/routes/api/github/+server.ts
git commit -m "$(cat <<'EOF'
feat(api): add /api/github endpoint for public activity stats

Requires GITHUB_TOKEN env var (personal access token, read:user scope) — add to Vercel prod and preview envs. Returns 503+null when unavailable so the client can hide the section silently.
EOF
)"
```

---

## Task 6: Public Activity section + `/hire` integration

**Files:**
- Create: `src/components/public-activity-section.svelte`
- Modify: `src/routes/hire/+page.svelte`

- [ ] **Step 1: Create `src/components/public-activity-section.svelte`**

This component is fully self-contained — it fetches `/api/github` on mount via `$effect`, hides itself if the response is missing or errors, and renders the stat-block grid on success.

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { GITHUB_USERNAME } from '$lib/constants';
	import type { GithubActivity } from '$lib/types';

	let activity: GithubActivity | null = $state(null);
	let failed = $state(false);

	onMount(async () => {
		try {
			const response = await fetch('/api/github');
			if (!response.ok) {
				failed = true;
				return;
			}
			const data = (await response.json()) as GithubActivity | null;
			if (!data || data.publicRepos === 0) {
				failed = true;
				return;
			}
			activity = data;
		} catch {
			failed = true;
		}
	});
</script>

{#if activity && !failed}
	<section aria-labelledby="activity-heading" class="py-14 section-border">
		<h2 id="activity-heading" class="section-heading mb-8">
			Public activity
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="activity-grid">
			<div class="activity-card">
				<p class="activity-label">Commits</p>
				<p class="activity-value">{activity.commitsLastYear}</p>
				<p class="activity-caption">past year</p>
			</div>
			<div class="activity-card">
				<p class="activity-label">Repos</p>
				<p class="activity-value">{activity.publicRepos}</p>
				<p class="activity-caption">public</p>
			</div>
			<div class="activity-card">
				<p class="activity-label">Languages</p>
				<p class="activity-languages">{activity.languages.join(', ')}</p>
			</div>
		</div>
		<a
			href="https://github.com/{GITHUB_USERNAME}"
			class="activity-link accent-link link-underline inline-flex items-center gap-1 text-sm mt-6"
			rel="noopener"
			target="_blank"
		>
			github.com/{GITHUB_USERNAME} &rarr;
		</a>
	</section>
{/if}

<style>
	.activity-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 16px;
	}

	.activity-card {
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)),
			var(--color-bg)
		);
		border-radius: 4px;
		padding: 16px;
	}

	.activity-label {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-accent);
		margin-bottom: 8px;
	}

	.activity-value {
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: 1.4rem;
		color: var(--color-text);
	}

	.activity-caption {
		font-size: 0.75rem;
		color: var(--color-muted);
		margin-top: 2px;
	}

	.activity-languages {
		font-size: 0.85rem;
		color: var(--color-text);
		line-height: 1.5;
	}
</style>
```

Rationale: Uses Svelte 5 `$state` runes. Hides entirely on any failure — empty DOM node rather than a broken-looking placeholder. Intentionally mirrors the `.stack-group` card style from the homepage Tech Stack so the same visual vocabulary is reused on `/hire`.

- [ ] **Step 2: Wire Public Activity into `/hire` between Technologies and FAQ**

In `src/routes/hire/+page.svelte`, add the import:

```svelte
import PublicActivitySection from '../../components/public-activity-section.svelte';
```

Insert `<PublicActivitySection />` **after** the Technologies `<section>` and **before** `<FaqSection />`. The chunk to replace — find the closing `</section>` of the Technologies block followed by `<FaqSection />`:

```svelte
	</section>

	<FaqSection />
```

becomes:

```svelte
	</section>

	<PublicActivitySection />

	<FaqSection />
```

- [ ] **Step 3: Type-check + build**

```bash
npm run check && npx vite build
```
Expected: 0 errors, successful build.

- [ ] **Step 4: Manual visual check**

Run `npm run dev`, navigate to `/hire`. Verify:

**If `GITHUB_TOKEN` is set:**
- Section flow is: PageHeader → Services → Philosophy → Technologies → **Public activity** → FAQ → CTA
- Three cards render: Commits (N / past year), Repos (N / public), Languages (comma-separated list)
- Cards match the visual style of the Tech Stack cards on the homepage
- Link to `github.com/aaddaamm` renders below the grid with accent color and arrow glyph
- Clicking the link opens the profile in a new tab

**If `GITHUB_TOKEN` is not set:**
- The Public activity section is silently absent from the DOM
- Section flow jumps directly from Technologies → FAQ with no gap

In DevTools Network tab, verify a single `GET /api/github` request fires on page load. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/public-activity-section.svelte src/routes/hire/+page.svelte
git commit -m "$(cat <<'EOF'
feat(hire): add public activity section backed by cached github api

Fetches /api/github on mount so the prerendered /hire shell stays static while the numbers stay fresh. Section hides itself entirely if the fetch fails or returns no data — no broken placeholders.
EOF
)"
```

---

## Task 7: End-to-end verification + polish

**Files:** none (verification pass)

- [ ] **Step 1: Run the full toolchain**

```bash
npm run lint && npm run check && npx vite build
```
Expected: lint passes (prettier + eslint clean), `svelte-check` reports 0 errors, Vite build succeeds.

- [ ] **Step 2: Full walkthrough in dev**

Run `npm run dev`. In a browser:

1. Load `/` (homepage):
   - Hero shows `10+ Years` / `15+ Projects` numbers with accent color
   - Below them: `fintech / healthcare / enterprise` in small muted mono
   - Tech Stack, Selected Work render as before

2. Load `/hire`:
   - Flow: back-link → Work With Me title → Services → **How I work** (with headshot) → Technologies → **Public activity** (if token set, else absent) → FAQ → Get In Touch CTA
   - Resize browser below 640px: Philosophy headshot stacks above paragraph
   - Click `github.com/aaddaamm` link: opens GitHub profile in new tab

3. View page source on `/hire`:
   - Existing FAQ and Breadcrumb JSON-LD blocks still render in `<head>`

- [ ] **Step 3: Add GITHUB_TOKEN reminder to project_infrastructure memory**

The Upstash env vars are already documented in memory. The new requirement is `GITHUB_TOKEN`. Append to `/Users/adam/.claude/projects/-Users-adam-dotcom/memory/project_infrastructure.md` a brief note that `/hire` requires `GITHUB_TOKEN` (GitHub personal access token with `read:user` scope) on Vercel prod + preview, and that the Public Activity section hides silently without it.

- [ ] **Step 4: Final commit (memory update only)**

```bash
git status
```
Expected: working tree clean (memory lives outside the repo). If anything else is dirty, stage and commit with a short polish message before closing the ticket.

- [ ] **Step 5: Close the GitHub issue**

```bash
gh issue close 13 --comment "Shipped in $(git log -1 --format=%H). See docs/superpowers/specs/2026-04-16-trust-indicators-design.md for the design and docs/superpowers/plans/2026-04-16-trust-indicators.md for the implementation plan."
```

---

## Notes for the implementer

- **Svelte 5 runes are required.** Use `$props`, `$state`, and `$effect` — not `export let` or Svelte 4 reactive statements. The project uses Svelte 5.53+.
- **Accent rule.** Every view must stay within two accent-color moments. On `/hire` the accent-dots in section headings cluster visually as "one" moment; the `github.com/aaddaamm` link is the second. If that feels like too many, drop the accent underline on the link and let only the arrow stay accent.
- **Prerendering.** `/hire` keeps `prerender = true`. Don't switch it to `+page.server.ts` — the Public Activity section is deliberately client-side so the cached page stays fast and the numbers stay fresh.
- **GITHUB_TOKEN scope.** A classic personal access token with `read:user` scope is enough (or a fine-grained token with read access to public data only). Add to Vercel env vars for prod + preview before merging.
- **Goodreads service is the reference implementation** for the Upstash + in-memory caching pattern. Read `src/lib/server/goodreadsService.ts:1-141` if anything about the service layer in Task 4 is unclear.
