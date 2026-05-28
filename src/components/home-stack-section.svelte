<script lang="ts">
	import { techStack } from '$lib/copy';
	import { animateStackItem } from '$lib/home-easter-egg';
</script>

<section aria-labelledby="stack-heading" class="py-14 section-border">
	<h2 id="stack-heading" class="section-heading">
		Stack
		<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
	</h2>
	<div class="stack-grid">
		{#each techStack as group (group.category)}
			<div class="stack-group">
				<p class="stack-category">{group.category}</p>
				<ul class="stack-items">
					{#each group.items as item (item)}
						<li>
							<button class="stack-item" onclick={(e) => animateStackItem(e.currentTarget)}>
								{item}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style>
	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 24px;
	}

	.stack-group {
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)),
			var(--color-bg)
		);
		border-radius: 4px;
		padding: 16px;
	}

	.stack-category {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-accent);
		margin-bottom: 10px;
	}

	.stack-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.stack-items li {
		font-size: 0.875rem;
	}

	.stack-item {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		font-size: 0.875rem;
		font-family: inherit;
		color: var(--color-muted);
		transition: color 150ms ease;
		display: inline-block;
		text-align: left;
		position: relative;
	}

	.stack-item::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 0;
		height: 1px;
		background-color: var(--color-accent);
		transition: width 400ms ease;
	}

	.stack-item:hover {
		color: var(--color-text);
	}

	.stack-item:hover::after {
		width: 100%;
	}
</style>
