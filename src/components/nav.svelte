<script>
	import HeaderCard from './header-card.svelte';
</script>

<nav
	class="w-full text-right flex justify-between items-center mb-8 bg-slate-800 p-4 shadow-sm border-b-0"
>
	<a href="/">
		<HeaderCard />
	</a>
	<ul class="flex space-x-2">
		<li>
			<a class="anchor" href="/about">About</a>
		</li>
		<li>
			<a class="anchor" href="/contact">Contact</a>
		</li>
	</ul>
</nav>
