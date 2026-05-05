<script lang="ts">
	import { fly } from 'svelte/transition';
	import { outcomeProofPoints } from '$lib/copy';
	import { createOutcomeTimeline } from '$lib/outcome-timeline.svelte';

	let reduceMotion = $state(false);
	const timeline = createOutcomeTimeline(outcomeProofPoints.length);

	$effect(() => {
		if (typeof window === 'undefined') return;
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	const activePoint = $derived(outcomeProofPoints[timeline.activeIndex]);
</script>

<section aria-labelledby="outcomes-heading" class="py-10 section-border">
	<h2 id="outcomes-heading" class="section-heading mb-6">
		Outcome timeline
		<span class="accent-dot" aria-hidden="true">.</span>
	</h2>

	<div class="outcomes-grid">
		<div role="tablist" aria-label="Outcome timeline" class="timeline-list">
			{#each outcomeProofPoints as point, index (point.headline)}
				<button
					id={`timeline-tab-${index}`}
					role="tab"
					type="button"
					class="timeline-tab"
					class:is-active={index === timeline.activeIndex}
					aria-selected={index === timeline.activeIndex}
					aria-controls={`timeline-panel-${index}`}
					onclick={() => timeline.activate(index)}
					onkeydown={(event) => timeline.onTabKeydown(event, index)}
				>
					<span class="timeline-dot" aria-hidden="true"></span>
					<span>{point.headline}</span>
				</button>
			{/each}
		</div>

		<div
			id={`timeline-panel-${timeline.activeIndex}`}
			role="tabpanel"
			aria-labelledby={`timeline-tab-${timeline.activeIndex}`}
			class="timeline-panel"
			class:reduced-motion={reduceMotion}
		>
			{#key timeline.activeIndex}
				<div
					class="panel-content"
					in:fly={{ y: reduceMotion ? 0 : 8, duration: reduceMotion ? 0 : 220 }}
				>
					<h3 class="panel-title">{activePoint.headline}</h3>
					<p class="panel-detail">{activePoint.detail}</p>
					<a href={activePoint.href} class="panel-link link-underline">Read related work →</a>
				</div>
			{/key}
		</div>
	</div>
</section>

<style>
	.outcomes-grid {
		display: grid;
		gap: 1rem;
	}

	.timeline-list {
		display: grid;
		gap: 0.5rem;
	}

	.timeline-tab {
		display: flex;
		align-items: baseline;
		gap: 0.55rem;
		width: 100%;
		text-align: left;
		padding: 0.5rem 0;
		border: none;
		background: transparent;
		color: var(--color-muted);
		cursor: pointer;
		border-bottom: 1px solid var(--color-border);
	}

	.timeline-tab:first-child {
		border-top: 1px solid var(--color-border);
	}

	.timeline-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: color-mix(in srgb, var(--color-accent) 30%, transparent);
		flex-shrink: 0;
		transition: transform 200ms ease;
	}

	.timeline-tab.is-active {
		color: var(--color-text);
	}

	.timeline-tab.is-active .timeline-dot {
		background: var(--color-accent);
		transform: scale(1.18);
	}

	.timeline-panel {
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: 0.9rem;
		background: color-mix(in srgb, var(--color-accent) 5%, var(--color-bg));
		transition: transform 180ms ease;
	}

	.panel-content {
		will-change: transform, opacity;
	}

	.timeline-panel:not(.reduced-motion) {
		transform: translateY(-1px);
	}

	.panel-title {
		font-size: 1rem;
		margin: 0 0 0.45rem 0;
	}

	.panel-detail {
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--color-muted);
		margin: 0 0 0.7rem 0;
	}

	.panel-link {
		font-size: 0.82rem;
		color: var(--color-text);
		text-decoration: none;
	}

	@media (min-width: 860px) {
		.outcomes-grid {
			grid-template-columns: 1fr 1fr;
			align-items: start;
		}
	}
</style>
