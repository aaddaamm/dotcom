<script lang="ts">
	import { outcomeProofPoints } from '$lib/copy';
</script>

<section aria-labelledby="outcomes-heading" class="py-10 section-border">
	<h2 id="outcomes-heading" class="section-heading mb-6">
		Recent outcomes
		<span class="accent-dot" aria-hidden="true">.</span>
	</h2>
	<ul class="outcome-list" aria-label="Recent delivery outcomes">
		{#each outcomeProofPoints as point (point.headline)}
			<li class="outcome-item">
				<a href={point.href} class="outcome-headline link-underline">{point.headline}</a>
				<p class="outcome-detail">{point.detail}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.outcome-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.outcome-item {
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.outcome-item:first-child {
		border-top: 1px solid var(--color-border);
	}

	.outcome-headline {
		font-size: 0.92rem;
		font-weight: 500;
		color: var(--color-text);
		text-decoration: none;
	}

	.outcome-detail {
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-muted);
		margin-top: 0.35rem;
	}
</style>
