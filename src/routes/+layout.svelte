<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import Header from '../components/header.svelte';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Footer from '../components/footer.svelte';

	injectSpeedInsights();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex flex-col min-h-screen">
	<Header />
	<div class="px-4 flex-grow max-w-5xl align-center">
		<slot />
	</div>
	<Footer />
</div>
