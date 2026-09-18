<script lang="ts">
	import { positioning } from '$lib/copy';
	const principles = [
		{
			title: 'Understand the problem',
			detail:
				'Learn the domain, read the existing code, and work with stakeholders to turn ambiguous requirements into a useful scope.'
		},
		{
			title: 'Make the technical decisions clear',
			detail:
				'Define service boundaries, evaluate tradeoffs, and break modernization work into changes the team can implement and support.'
		},
		{ title: 'Build alongside the team', detail: positioning.workingStyle }
	];
</script>

<section aria-labelledby="how-i-work-heading" class="py-14 section-border">
	<h2 id="how-i-work-heading" class="section-heading">How I Work</h2>
	<div class="principles">
		{#each principles as principle (principle.title)}
			<div>
				<h3>{principle.title}</h3>
				<p>{principle.detail}</p>
			</div>
		{/each}
	</div>
	<p class="ai-practice">{positioning.aiPractice}</p>
</section>

<style>
	.principles {
		display: grid;
		gap: 24px;
	}
	h3 {
		font-size: 17px;
		font-weight: 500;
		margin-bottom: 8px;
	}
	p {
		color: var(--color-muted);
		line-height: 1.8;
		margin: 0;
	}
	.ai-practice {
		border-top: 1px solid var(--color-border);
		padding-top: 24px;
		margin-top: 24px;
		font-size: 14px;
	}
</style>
