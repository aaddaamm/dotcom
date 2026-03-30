<script lang="ts">
	import type { Snippet } from 'svelte';
	
	let { 
		variant = 'base',
		hover = true,
		class: className = '',
		children 
	}: {
		variant?: 'base' | 'work' | 'service' | 'benefit';
		hover?: boolean;
		class?: string;
		children: Snippet;
	} = $props();
	
	const variantClasses = {
		base: 'card-base',
		work: 'card-work',
		service: 'card-base card-accent-border',
		benefit: 'card-base'
	};
	
	const hoverClass = hover ? 'card-hover-lift' : '';
	const classes = `${variantClasses[variant]} ${hoverClass} ${className}`.trim();
</script>

<div class={classes}>
	{@render children()}
</div>