<script lang="ts">
	import { recentShipped } from '$lib/copy';
</script>

<section aria-labelledby="recent-heading" class="py-10 section-border">
	<h2 id="recent-heading" class="section-heading mb-6">
		Recent signals
		<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
	</h2>
	<ul class="recent-list" aria-label="Recently shipped work and writing">
		{#each recentShipped as item (item.href)}
			<li class="recent-item">
				<a href={item.href} class="recent-link link-underline">{item.title}</a>
				<span class="recent-type">{item.type}</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.recent-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.recent-item {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.recent-item:first-child {
		border-top: 1px solid var(--color-border);
	}

	.recent-link {
		font-size: 0.9rem;
		color: var(--color-text);
		text-decoration: none;
	}

	.recent-type {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
		flex-shrink: 0;
	}
</style>
