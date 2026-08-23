<script lang="ts">
	type TraceStep = {
		label: string;
		text: string;
	};

	let { heading, steps }: { heading: string; steps: readonly TraceStep[] } = $props();
	const headingId = $props.id();
</script>

<section class="trace" aria-labelledby={headingId}>
	<h2 id={headingId} class="trace-heading">{heading}</h2>
	<ol class="trace-list">
		{#each steps as step (step.label)}
			<li class="trace-step">
				<span class="trace-marker" aria-hidden="true"></span>
				<div>
					<p class="trace-label">{step.label}</p>
					<p class="trace-text">{step.text}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.trace {
		margin-top: 2rem;
	}

	.trace-heading {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		color: var(--color-muted);
		margin: 0 0 1rem;
	}

	.trace-list {
		position: relative;
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1.25rem;
	}

	.trace-list::before {
		content: '';
		position: absolute;
		top: 0.45rem;
		bottom: 0.45rem;
		left: 0.35rem;
		width: 1px;
		background-color: var(--color-border);
	}

	.trace-step {
		position: relative;
		display: grid;
		grid-template-columns: 0.75rem minmax(0, 1fr);
		gap: 0.75rem;
	}

	.trace-marker {
		position: relative;
		z-index: 1;
		width: 0.7rem;
		height: 0.7rem;
		margin-top: 0.25rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background-color: var(--color-bg);
	}

	.trace-step:last-child .trace-marker {
		border-color: var(--color-accent);
		background-color: var(--color-accent);
	}

	.trace-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		color: var(--color-muted);
		margin: 0 0 0.35rem;
	}

	.trace-text {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--color-text);
		margin: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.trace-marker {
			transition: none;
		}
	}
</style>
