<script lang="ts">
	import { positioning } from '$lib/copy';
</script>

<section aria-labelledby="how-i-work-heading" class="py-14 section-border">
	<h2 id="how-i-work-heading" class="section-heading">
		How I work
		<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
	</h2>
	<div class="how-i-work-copy">
		<p class="body-text">{positioning.workingStyle}</p>
		<p class="body-text muted-text">{positioning.aiPractice}</p>
		<p class="consulting-note">{positioning.consultingNote}</p>
	</div>
</section>

<style>
	.how-i-work-copy {
		display: grid;
		gap: 1rem;
		max-width: 46rem;
	}

	.how-i-work-copy p {
		margin: 0;
	}

	.consulting-note {
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
		font-family: var(--font-mono);
		font-size: 0.82rem;
		line-height: 1.7;
		color: var(--color-muted);
	}
</style>
