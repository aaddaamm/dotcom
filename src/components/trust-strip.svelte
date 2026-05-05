<script lang="ts">
	import { trustProofItems } from '$lib/copy';
</script>

<section aria-labelledby="trust-heading" class="py-10 section-border">
	<h2 id="trust-heading" class="section-heading mb-6">
		Proof points
		<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
	</h2>
	<ul class="trust-grid" aria-label="Trust indicators">
		{#each trustProofItems as item (item.label)}
			<li class="trust-item">
				<p class="trust-label">{item.label}</p>
				<p class="trust-value">{item.value}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.trust-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.trust-item {
		padding: 14px;
		border: 1px solid var(--color-border);
		border-radius: 4px;
	}

	.trust-label {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
		margin-bottom: 6px;
	}

	.trust-value {
		font-size: 0.9rem;
		color: var(--color-text);
	}
</style>
