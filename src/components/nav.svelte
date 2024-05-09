<script>
	import Link from './link.svelte';
	import HeaderCard from './header-card.svelte';
</script>

<nav
	class="w-full text-right flex justify-between items-center mb-8 bg-slate-800 p-4 shadow-sm border-b-0"
>
	<Link href="/">
		<HeaderCard />
	</Link>
	<ul class="flex space-x-2">
		<li>
			<Link href="/about">About</Link>
		</li>
		<li>
			<Link href="/contact">Contact</Link>
		</li>
	</ul>
</nav>
