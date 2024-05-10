<script>
	import '../app.css';
	import Nav from '../components/nav.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="bg-slate-700 text-white h-screen">
	<Nav />
	<div class="px-4">
		<slot />
	</div>
</div>
