<script lang="ts">
	import HeaderCard from './header-card.svelte';
</script>

<nav
	class="flex-col sm:flex-row w-full text-right flex justify-between items-center mb-4 sm:mb-8 p-4 shadow-md"
>
	<a href="/">
		<HeaderCard />
	</a>
	<ul class="flex space-x-4">
		<li>
			<a class="anchor" href="/work">Work</a>
		</li>
		<li>
			<a class="anchor" href="/play">Play</a>
		</li>
		<li>
			<a class="anchor" href="/contact">Contact</a>
		</li>
	</ul>
</nav>
