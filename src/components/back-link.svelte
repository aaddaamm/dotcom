<script lang="ts">
	let {
		href = '/',
		label = 'Back'
	}: {
		href?: string;
		label?: string;
	} = $props();
</script>

<a {href} class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
	<span aria-hidden="true">&larr;</span>
	{label}
</a>
