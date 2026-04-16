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
