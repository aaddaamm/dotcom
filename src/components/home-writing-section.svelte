<script lang="ts">
	import { recentShipped } from '$lib/copy';
	import { SOCIAL_URLS } from '$lib/constants';
	const writing = recentShipped.filter((item) => item.type === 'Writing');
</script>

<section aria-labelledby="writing-heading" class="py-14 section-border">
	<h2 id="writing-heading" class="section-heading">Writing &amp; Thinking</h2>
	<p>Notes on engineering practice, the tools I use, and what I’m learning along the way.</p>
	<ul>
		{#each writing as item (item.href)}
			<li><a href={item.href} class="link-underline">{item.title} →</a></li>
		{/each}
	</ul>
	<div class="links">
		<a href="/blog" class="accent-link link-underline">All writing →</a>
		<a href="/teach" class="link-underline">Talks &amp; resources</a>
		<a href={SOCIAL_URLS.github} class="link-underline">Code &amp; experiments</a>
	</div>
</section>

<style>
	p {
		color: var(--color-muted);
		line-height: 1.8;
	}
	ul {
		list-style: none;
		margin: 24px 0;
		padding: 0;
		display: grid;
		gap: 16px;
	}
	li a {
		color: var(--color-text);
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 16px 24px;
		font-size: 14px;
	}
	.links a:not(.accent-link) {
		color: var(--color-muted);
	}
</style>
