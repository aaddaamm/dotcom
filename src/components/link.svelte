<script>
	export let href = '';
	export let className = '';
</script>

<a
	{href}
	class={`hover:text-slate-200 hover:underline hover:transition-all hover:duration-200 ${className}`}
>
	<slot />
</a>
