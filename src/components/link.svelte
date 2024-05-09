<script>
	export let href = '';
</script>

<a {href} class="hover:text-slate-200 hover:underline hover:transition-all hover:duration-200">
	<slot />
</a>
