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
