<script lang="ts">
	let { type, size = 32 }: { type: string; size?: number } = $props();
</script>

<div class="service-icon" style="width: {size}px; height: {size}px;">
	{#if type === 'code'}
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6ZM9.4 16.6L8 18L2 12L8 6L9.4 7.4L4.8 12L9.4 16.6Z"
			/>
		</svg>
	{:else if type === 'globe'}
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A1,1 0 0,0 10,17H11V19.93M17.9,17.39C17.64,16.58 16.9,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39Z"
			/>
		</svg>
	{:else if type === 'lightbulb'}
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z"
			/>
		</svg>
	{/if}
</div>

<style>
	.service-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--color-accent);
		flex-shrink: 0;
	}

	svg {
		width: 100%;
		height: 100%;
	}
</style>
