<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-row items-center justify-between p-4">
	<ul class="flex flex-row items-center">
		<li class="mr-4">
			<a
				aria-label="Github Profile"
				href="https://github.com/aaddaamm"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon icon="logos:github-icon" />
			</a>
		</li>
		<li class="mr-4">
			<a
				aria-label="LinkedIn Profile"
				href="https://www.linkedin.com/in/adam-robinson-software/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Icon icon="logos:linkedin-icon" />
			</a>
		</li>
		<li class="mr-4">
			<a
				aria-label="Goodreads Profile"
				href="https://www.goodreads.com/user/show/92024399-adam-robinson"
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1024 1024"
					fill="currentColor"
					class="h-6 w-6"
					aria-hidden="true"
				>
					<path
						d="M663.8 382.4c10.2 74.6-9.4 158-71.8 201.4-44.6 31-105.6 28.2-141.6 11.4-74.2-34.6-99-117.2-93.6-194.4 8.6-121.8 81.8-175.8 150.6-175 93.8-0.4 143.6 63.6 156.4 156.6zM960 176v672c0 61.8-50.2 112-112 112H176c-61.8 0-112-50.2-112-112V176c0-61.8 50.2-112 112-112h672c61.8 0 112 50.2 112 112zM724 626.4s-0.2-68-0.2-434.6h-58v80.6c-1.6 0.6-2.4-1-3.2-2.4-19.2-41.4-71.8-92.6-152-92-103.8 0.8-174.4 62.4-201.2 155.6-8.6 29.8-11.6 60.2-11 91.2 3.4 155.8 90.2 235.6 224.8 230.4 57.8-2.2 109-34 138-90.4 1-2 2.2-3.8 3.4-5.8 0.4 0.2 0.8 0.2 1.2 0.4 0.6 7.6 0.4 61.4 0.2 69-0.4 29.6-4 59-14.4 87-15.6 42-44.6 69.4-89 79-35.6 7.8-71.2 7.6-106.4-2.4-43-12.2-73-38-82.2-83.6-0.6-3.2-2.6-2.6-4.6-2.6h-53.6c1.6 21.2 6.4 40.6 17 58.4 48.4 81 165.4 97 256.4 74.8 99.8-24.6 134.6-109.8 134.8-212.6z"
						fill=""
					></path>
				</svg>
			</a>
		</li>
	</ul>
	<p class="flex text-xs text-center items-center">
		<span class="pr-1">&copy;</span>
		{new Date().getFullYear()} Adam Robinson
	</p>
	<p class="flex flex-col sm:flex-row text-xs text-right">
		<span class="mr-1">Tech:</span>
		<a href="https://kit.svelte.dev/" target="_blank" rel="noopener noreferrer">SvelteKit</a>
		<span class="hidden sm:flex mx-1">&middot;</span>
		<a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">tailwindcss</a>
		<span class="hidden sm:flex mx-1">&middot;</span>
		<a href="https://www.skeleton.dev/" target="_blank" rel="noopener noreferrer">Skeleton ui</a>
	</p>
</div>
