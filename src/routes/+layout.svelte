<script lang="ts">
	import { dev } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.css';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });

	afterNavigate((navigation) => {
		const hash = navigation.to?.url.hash;
		if (hash) {
			const el = document.querySelector(hash);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
				return;
			}
		}
		window.scrollTo({ top: 0 });
	});
</script>

<div class="min-h-screen flex flex-col font-sans">
	<header class="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-md">
		<div class="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
			<a href="/" class="text-sm font-semibold tracking-tight text-slate-100 hover:text-accent-400 transition-colors">
				Adam Robinson<span class="text-accent-500">.</span>
			</a>
			<nav class="flex items-center gap-6">
				<a href="/#work" class="text-sm text-slate-400 hover:text-accent-400 transition-colors">Work</a>
				<a href="/play" class="text-sm text-slate-400 hover:text-accent-400 transition-colors">Reading</a>
				<a href="/#contact" class="text-sm text-slate-400 hover:text-accent-400 transition-colors">Contact</a>
			</nav>
		</div>
	</header>
	<main class="flex-1">
		<slot />
	</main>
</div>
