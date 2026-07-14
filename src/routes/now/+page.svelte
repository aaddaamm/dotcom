<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';
	import PageHeader from '../../components/page-header.svelte';

	const focusAreas = [
		'Staff-level full-stack execution across product teams that need fast ramp + dependable delivery.',
		'Case-study upgrades on this site with clearer constraints, decisions, and results.',
		'Practical writing on engineering judgment, delivery tradeoffs, and AI-assisted workflows.'
	];

	const openTo = [
		'Full-time senior/staff roles with strong product ownership',
		'Select contract embeds where I can ship quickly with an existing team',
		'Speaking and mentoring conversations around delivery and engineering craft'
	];
</script>

<SeoHead
	title="Now — Adam Robinson"
	description="What I am focused on now: current engineering work, experiments, writing themes, and collaboration openings."
	path="/now"
/>

<div class="max-w-3xl mx-auto px-6">
	<PageHeader
		title="Now"
		description="Current focus, what I am building, and where I can help next."
		showBackLink={false}
	/>

	<section class="section-border py-10" aria-labelledby="focus-heading">
		<h2 id="focus-heading" class="section-heading mb-6">Current focus</h2>
		<ul class="now-list">
			{#each focusAreas as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</section>

	<section class="section-border py-10" aria-labelledby="open-heading">
		<h2 id="open-heading" class="section-heading mb-6">Open to</h2>
		<ul class="now-list">
			{#each openTo as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	</section>

	<p class="updated">Last updated: July 2026</p>
</div>

<style>
	.now-list {
		margin: 0;
		padding-left: 1rem;
		display: grid;
		gap: 0.5rem;
		color: var(--color-text);
		font-size: 0.95rem;
	}

	.updated {
		margin: 1.5rem 0 3rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 1.4px;
		color: var(--color-muted);
	}
</style>
