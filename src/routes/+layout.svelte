<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { AppShell, AppBar, initializeStores } from '@skeletonlabs/skeleton';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	initializeStores();
	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<AppShell slotHeader="sticky top-0 z-50">
	<svelte:fragment slot="header">
		<AppBar
			background="bg-surface-900/80 backdrop-blur-md"
			border="border-b border-surface-700/30"
			padding="px-6 py-3"
			gridColumns="grid-cols-[auto_1fr_auto]"
			slotDefault="hidden"
		>
			<svelte:fragment slot="lead">
				<a href="/" class="font-semibold text-sm tracking-tight text-surface-50 hover:text-primary-400 transition-colors">
					Adam Robinson
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<nav class="flex items-center gap-1">
					<a class="btn btn-sm variant-soft-surface" href="/#work">Work</a>
					<a class="btn btn-sm variant-soft-surface" href="/play">Reading</a>
					<a class="btn btn-sm variant-soft-surface" href="/#contact">Contact</a>
				</nav>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
