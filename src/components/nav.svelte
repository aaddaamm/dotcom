<script>
	import Link from './link.svelte';
	import HeaderCard from './header-card.svelte';
</script>

<nav class="w-full text-right flex justify-between items-center mb-8">
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
