<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let emailCopied = $state(false);
	let githubCopied = $state(false);

	async function copyToClipboard(text: string, which: 'email' | 'github') {
		try {
			await navigator.clipboard.writeText(text);
			if (which === 'email') {
				emailCopied = true;
				setTimeout(() => (emailCopied = false), 1500);
			} else {
				githubCopied = true;
				setTimeout(() => (githubCopied = false), 1500);
			}
		} catch {
			// clipboard unavailable — no feedback shown
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
		<div class="flex flex-wrap gap-6 mb-6 text-sm">
			<a href="/blog" class="footer-link">Blog</a>
			<a href="/work" class="footer-link">Work</a>
			<a href="/hire" class="footer-link">Hire</a>
			<a href="/play" class="footer-link">Reading</a>
			<a href="/teach" class="footer-link">Resources</a>
			<a href="/contact" class="footer-link">Contact</a>
			<button
				class="footer-link copy-btn"
				onclick={() => copyToClipboard('adam@adamrobinson.tech', 'email')}
			>
				{emailCopied ? 'copied!' : 'adam@adamrobinson.tech'}
			</button>
			<button
				class="footer-link copy-btn"
				onclick={() => copyToClipboard('https://github.com/aaddaamm', 'github')}
			>
				{githubCopied ? 'copied!' : 'github'}
			</button>
		</div>
		<div class="footer-meta flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
			<p>&copy; {new Date().getFullYear()} Adam Robinson</p>
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

	.footer-link {
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
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
