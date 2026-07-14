<script lang="ts">
	import { SOCIAL_URLS } from '$lib/constants';

	const proofRail: Array<{ label: string; value: string; href?: string }> = [
		{
			label: 'Talks',
			value: 'Conference and team-facing technical talks',
			href: '/teach'
		},
		{
			label: 'Open source',
			value: 'Code, experiments, and public engineering artifacts',
			href: SOCIAL_URLS.github
		},
		{
			label: 'Delivery mode',
			value: 'Embedded senior IC / tech lead across full stack'
		},
		{
			label: 'Cadence',
			value: 'Shipping work + publishing notes from real engagements',
			href: '/blog'
		}
	];
</script>

<section aria-labelledby="proof-rail-heading" class="py-10 section-border">
	<h2 id="proof-rail-heading" class="section-heading mb-6">
		Public artifacts
		<span class="accent-dot heading-accent-dot" aria-hidden="true">.</span>
	</h2>
	<ul class="proof-rail" aria-label="Public artifacts and authority signals">
		{#each proofRail as item (item.label)}
			<li class="proof-item">
				<p class="proof-label">{item.label}</p>
				{#if item.href}
					<a class="proof-value link-underline" href={item.href}>{item.value}</a>
				{:else}
					<p class="proof-value">{item.value}</p>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	.proof-rail {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 12px;
	}

	.proof-item {
		padding: 14px;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: color-mix(in srgb, var(--color-accent) 4%, var(--color-bg));
	}

	.proof-label {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
		margin-bottom: 6px;
	}

	.proof-value {
		margin: 0;
		font-size: 0.88rem;
		color: var(--color-text);
		text-decoration: none;
	}
</style>
