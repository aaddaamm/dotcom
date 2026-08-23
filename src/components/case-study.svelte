<script lang="ts">
	import EngineeringTrace from './engineering-trace.svelte';

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

<EngineeringTrace
	heading="Engineering trace"
	steps={[
		{ label: 'Context', text: situation },
		{ label: 'Contribution', text: work },
		{ label: 'Outcome', text: outcome }
	]}
/>
