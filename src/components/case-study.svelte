<script lang="ts">
	let {
		situation,
		work,
		outcome
	}: {
		situation: string;
		work: string;
		outcome: string;
	} = $props();
</script>

<div class="case-study">
	{#each [{ label: 'situation', text: situation }, { label: 'work', text: work }, { label: 'outcome', text: outcome }] as section (section.label)}
		<div class="cs-section">
			<span class="cs-label">{section.label}</span>
			<p class="cs-body">{section.text}</p>
		</div>
	{/each}
</div>

<style>
	.case-study {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.cs-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.cs-label {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
	}

	.cs-body {
		font-size: 1rem;
		color: var(--color-text);
		line-height: 1.8;
		margin: 0;
	}
</style>
