<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { openTerminal } from '$lib/stores/terminal.svelte';
	import { EMAIL, GITHUB_USERNAME } from '$lib/constants';

	let emailCopied = $state(false);

	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			emailCopied = true;
			setTimeout(() => (emailCopied = false), 1500);
		} catch {
			// noop
		}
	}

	const cities = [
		{ label: 'New York', tz: 'America/New_York' },
		{ label: 'London', tz: 'Europe/London' },
		{ label: 'Tokyo', tz: 'Asia/Tokyo' },
		{ label: 'Berlin', tz: 'Europe/Berlin' },
		{ label: 'São Paulo', tz: 'America/Sao_Paulo' },
		{ label: 'Sydney', tz: 'Australia/Sydney' },
		{ label: 'Singapore', tz: 'Asia/Singapore' },
		{ label: 'Lagos', tz: 'Africa/Lagos' },
		{ label: 'Toronto', tz: 'America/Toronto' },
		{ label: 'Dubai', tz: 'Asia/Dubai' }
	];

	let city = $state(cities[0]);
	let time = $state('');
	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		city = cities[Math.floor(Math.random() * cities.length)];
		const fmt = new Intl.DateTimeFormat('en-US', {
			timeZone: city.tz,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
		time = fmt.format(new Date());
		interval = setInterval(() => {
			time = fmt.format(new Date());
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<footer class="footer py-10 px-6 mt-8">
	<div class="max-w-3xl mx-auto">
		<div class="footer-nav mb-4 text-sm">
			<a href="/blog" class="footer-link">Blog</a>
			<a href="/work" class="footer-link">Work</a>
			<a href="/hire" class="footer-link">Hire</a>
			<a href="/play" class="footer-link">Reading</a>
			<a href="/teach" class="footer-link">Resources</a>
			<a href="/contact" class="footer-link">Contact</a>
			<button class="footer-link copy-btn" onclick={() => copyToClipboard(EMAIL)}>
				{emailCopied ? 'copied!' : EMAIL}
			</button>
		</div>

		<div class="footer-social mb-6 text-sm" aria-label="Social links">
			<span class="footer-label">Social</span>
			<a
				href="https://github.com/{GITHUB_USERNAME}"
				class="footer-link social-link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
			>
				<span class="social-full">github</span>
				<span class="social-compact" aria-hidden="true">gh</span>
			</a>
			<a
				href="https://x.com/Adam623753"
				class="footer-link social-link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="X"
			>
				<span class="social-full">x</span>
				<span class="social-compact" aria-hidden="true">x</span>
			</a>
			<a
				href="https://www.instagram.com/adamrobinson7251/"
				class="footer-link social-link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
			>
				<span class="social-full">instagram</span>
				<span class="social-compact" aria-hidden="true">ig</span>
			</a>
			<a
				href="https://www.facebook.com/profile.php?id=61573468237603"
				class="footer-link social-link"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Facebook"
			>
				<span class="social-full">facebook</span>
				<span class="social-compact" aria-hidden="true">fb</span>
			</a>
		</div>
		<div class="footer-meta flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
			<p>
				&copy; {new Date().getFullYear()} Adam Robinson
				<button class="terminal-hint" onclick={openTerminal} aria-label="Open terminal">
					&gt;_
				</button>
			</p>
			{#if time}
				<p class="clock">
					{city.label} ·
					<span class="clock-time">{time}</span>
				</p>
			{/if}
			<p>Built with SvelteKit</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
	}

	.footer-meta {
		color: var(--color-muted);
	}

	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.footer-social {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.footer-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
		margin-right: 0.35rem;
	}

	.footer-link {
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.social-compact {
		display: none;
	}

	@media (max-width: 640px) {
		.social-full {
			display: none;
		}

		.social-compact {
			display: inline;
			text-transform: uppercase;
		}

		.social-link {
			padding: 0.2rem 0.35rem;
			border: 1px solid var(--color-border);
			border-radius: 0.25rem;
		}
	}

	.footer-link:hover {
		color: var(--color-accent);
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

	.copy-btn {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		font-size: inherit;
		font-family: inherit;
	}
</style>
