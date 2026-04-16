<script lang="ts">
	let {
		initials = 'AR',
		size = 56,
		src,
		alt = 'Adam Robinson'
	}: {
		initials?: string;
		size?: number;
		src?: string;
		alt?: string;
	} = $props();
</script>

<div
	class="headshot"
	style="width: {size}px; height: {size}px; font-size: {Math.round(size * 0.38)}px;"
>
	{#if src}
		<img {src} {alt} width={size} height={size} loading="lazy" />
	{:else}
		<span class="initials" role="img" aria-label={alt}>{initials}</span>
	{/if}
</div>

<style>
	.headshot {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: color-mix(in srgb, var(--color-accent) 12%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
		font-family: var(--font-mono);
		font-weight: 600;
		color: var(--color-accent);
		flex-shrink: 0;
		overflow: hidden;
	}

	.headshot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.initials {
		letter-spacing: 0.5px;
	}
</style>
