<script>
	import Link from './link.svelte';
	import HeaderCard from './header-card.svelte';
</script>

<nav
	class="w-full text-right flex justify-between items-center mb-8 bg-slate-800 p-4 shadow-sm border-b-0"
>
	<HeaderCard />
	<ul class="flex space-x-2">
		<li>
			<Link href="/" text="Home" />
		</li>
		<li>
			<Link href="/about" text="About" />
		</li>
		<li>
			<Link href="/contact" text="Contact" />
		</li>
	</ul>
</nav>
