<script lang="ts">
	interface FooterMetaProps {
		cityLabel: string;
		time: string;
		onOpenTerminal: () => void;
	}

	let { cityLabel, time, onOpenTerminal }: FooterMetaProps = $props();
</script>

<div class="footer-meta flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
	<p>
		&copy; {new Date().getFullYear()} Adam Robinson
		<button class="terminal-hint" onclick={onOpenTerminal} aria-label="Open terminal">&gt;_</button>
	</p>
	{#if time}
		<p class="clock">
			{cityLabel} ·
			<span class="clock-time">{time}</span>
		</p>
	{/if}
	<p>Built with SvelteKit</p>
</div>

<style>
	.footer-meta {
		color: var(--color-muted);
	}

	.clock {
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	.clock-time {
		color: var(--color-text);
	}

	.terminal-hint {
		background: none;
		border: none;
		padding: 0 0 0 0.6em;
		margin: 0;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-muted);
		animation: terminal-pulse 3s ease-in-out infinite;
		transition:
			opacity 150ms ease,
			color 150ms ease;
	}

	.terminal-hint:hover {
		opacity: 1;
		color: var(--color-accent);
		animation: none;
	}

	@keyframes terminal-pulse {
		0%,
		100% {
			opacity: 0.25;
		}
		50% {
			opacity: 0.6;
		}
	}
</style>
