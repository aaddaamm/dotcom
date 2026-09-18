<script lang="ts">
	import { outcomeProofPoints } from '$lib/copy';
</script>

<section aria-labelledby="outcomes-heading" class="py-14 section-border">
	<h2 id="outcomes-heading" class="section-heading">Selected Outcomes</h2>
	<ol class="outcomes">
		{#each outcomeProofPoints as point, i (point.href)}
			<li>
				<span class="number" aria-hidden="true">0{i + 1}</span>
				<div>
					<h3>
						<a href={point.href} class="link-underline">
							{point.headline}
							<span aria-hidden="true">↗</span>
						</a>
					</h3>
					<p>{point.detail}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.outcomes {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 32px;
	}
	li {
		display: grid;
		grid-template-columns: 24px minmax(0, 1fr);
		gap: 16px;
	}
	.number {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-muted);
		padding-top: 5px;
	}
	h3 {
		font-size: 21px;
		line-height: 1.4;
		font-weight: 500;
		margin: 0 0 8px;
	}
	a {
		color: var(--color-text);
	}
	a span {
		font-size: 15px;
		color: var(--color-muted);
	}
	p {
		color: var(--color-muted);
		line-height: 1.7;
		margin: 0;
	}
</style>
