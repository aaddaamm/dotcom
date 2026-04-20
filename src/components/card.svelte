<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'base',
		hover = true,
		class: className = '',
		children
	}: {
		variant?: 'base' | 'work';
		hover?: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	const variantClasses = {
		base: 'card-base',
		work: 'card-work'
	};

	const classes = $derived(
		`${variantClasses[variant]} ${hover ? 'card-hover-lift' : ''} ${className}`.trim()
	);
</script>

<div class={classes}>
	{@render children()}
</div>
