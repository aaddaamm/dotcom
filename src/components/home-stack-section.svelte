<script lang="ts">
	import { animateStackItem } from '$lib/home-easter-egg';
	const foundation = [
		{
			category: 'Engineering',
			tools:
				'TypeScript, React, Node.js, Ruby on Rails, SQL, Java, Vue, Next.js, Svelte, Express, Elixir/Phoenix, PHP'
		},
		{
			category: 'Platforms',
			tools:
				'AWS, Auth0, PostgreSQL, Redis, Strapi, Contentful, Docker, GitHub Actions, Vercel, Netlify'
		},
		{
			category: 'Architecture & delivery',
			tools:
				'Technical discovery, service boundaries, modernization, authentication, CMS architecture, localization, mentoring'
		}
	];
</script>

<section aria-labelledby="stack-heading" class="py-14 section-border">
	<h2 id="stack-heading" class="section-heading">Technical Foundation</h2>
	<dl>
		{#each foundation as group (group.category)}
			<div>
				<dt>{group.category}</dt>
				<dd>
					{#each group.tools.split(', ') as tool, index (tool)}
						{#if index > 0}<span aria-hidden="true">,</span>{/if}
						<button
							type="button"
							class="stack-item"
							onclick={(event) => animateStackItem(event.currentTarget)}
						>
							{tool}
						</button>
					{/each}
				</dd>
			</div>
		{/each}
	</dl>
</section>

<style>
	.stack-item {
		display: inline-block;
		border: 0;
		padding: 0;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: color 150ms ease;
	}
	.stack-item:hover {
		color: var(--color-text);
	}

	dl {
		display: grid;
		gap: 16px;
		margin: 0;
	}
	dt {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 4px;
	}
	dd {
		color: var(--color-muted);
		font-size: 14px;
		line-height: 1.8;
		margin: 0;
	}
</style>
