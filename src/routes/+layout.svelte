<script>
	import '../app.css';
	import Nav from '../components/nav.svelte';
</script>

<div class="bg-slate-800 text-white h-screen p-8">
	<Nav />
	<slot />
</div>
