<script>
	import '../app.css';
	import Nav from '../components/nav.svelte';
</script>

<div class="bg-slate-700 text-white h-screen">
	<Nav />
	<div class="px-4">
		<slot />
	</div>
</div>
