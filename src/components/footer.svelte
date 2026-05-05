<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { EMAIL } from '$lib/constants';
	import { openTerminal } from '$lib/stores/terminal.svelte';
	import FooterMeta from './footer-meta.svelte';
	import FooterNav from './footer-nav.svelte';
	import FooterSocial from './footer-social.svelte';

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
		<FooterNav email={EMAIL} {emailCopied} onCopyEmail={() => copyToClipboard(EMAIL)} />
		<FooterSocial />
		<FooterMeta cityLabel={city.label} {time} onOpenTerminal={openTerminal} />
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
	}
</style>
