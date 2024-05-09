<script>
	import '../app.css';
	import Link from '../components/link.svelte';
</script>

<div class="bg-slate-800 text-white h-screen p-8">
	<nav class="w-full text-right flex justify-end">
		<ul class="flex space-x-4">
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

	<slot />
</div>
