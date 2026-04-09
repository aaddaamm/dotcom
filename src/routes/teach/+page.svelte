<script lang="ts">
	import SeoHead from '../../components/seo-head.svelte';

	const learningResources = [
		{
			title: 'Exercism',
			url: 'https://exercism.org',
			description:
				'Practice coding with mentorship in 70+ programming languages. Free, hands-on exercises with real human feedback.',
			category: 'Interactive Practice'
		},
		{
			title: 'freeCodeCamp',
			url: 'https://freecodecamp.org',
			description:
				'Comprehensive full-stack web development curriculum with projects and certifications.',
			category: 'Full Curriculum'
		},
		{
			title: 'The Odin Project',
			url: 'https://theodinproject.com',
			description:
				'Open-source curriculum for learning web development with a focus on building real projects.',
			category: 'Full Curriculum'
		},
		{
			title: 'MDN Web Docs',
			url: 'https://developer.mozilla.org',
			description:
				'Comprehensive documentation and tutorials for web technologies (HTML, CSS, JavaScript).',
			category: 'Reference & Tutorials'
		},
		{
			title: 'LeetCode',
			url: 'https://leetcode.com',
			description: 'Algorithm and data structure problems for technical interview preparation.',
			category: 'Problem Solving'
		},
		{
			title: 'Codecademy',
			url: 'https://codecademy.com',
			description:
				'Interactive coding lessons with hands-on practice in various programming languages.',
			category: 'Interactive Learning'
		}
	];

	const categories = ['All', ...new Set(learningResources.map((r) => r.category))];
	let selectedCategory = $state('All');

	let filteredResources = $derived(
		selectedCategory === 'All'
			? learningResources
			: learningResources.filter((r) => r.category === selectedCategory)
	);
</script>

<SeoHead
	title="Learning Resources — Adam Robinson"
	description="Curated list of the best free and paid resources for learning programming, web development, and software engineering skills."
	path="/teach"
/>

<div class="max-w-4xl mx-auto px-6 pt-20 sm:pt-28 pb-16">
	<a href="/" class="back-link text-sm inline-flex items-center gap-1 mb-8 transition-colors">
		<span aria-hidden="true">&larr;</span>
		Back
	</a>
	<h1 class="page-title text-3xl font-semibold tracking-tight mb-3">Learning Resources</h1>
	<p class="page-description leading-relaxed mb-8">
		The best places to learn programming and develop your skills, curated from years of experience
		in the field.
	</p>

	<div class="mb-8">
		<h2 class="text-lg font-semibold mb-4">Filter by Category</h2>
		<div
			class="flex flex-wrap gap-2"
			role="tablist"
			aria-label="Filter learning resources by category"
		>
			{#each categories as category (category)}
				<button
					class="category-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors"
					class:active={selectedCategory === category}
					onclick={() => (selectedCategory = category)}
					role="tab"
					aria-selected={selectedCategory === category}
					aria-controls="resources-grid"
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid gap-6 md:grid-cols-2" id="resources-grid" role="tabpanel">
		{#each filteredResources as resource (resource.title)}
			<article class="resource-card p-6 rounded-lg border transition-all duration-300">
				<div class="flex items-start justify-between mb-3">
					<h3 class="text-xl font-semibold">
						<a
							href={resource.url}
							target="_blank"
							rel="noopener noreferrer"
							class="resource-link hover:underline"
							aria-label={`Visit ${resource.title} - ${resource.description}`}
						>
							{resource.title}
						</a>
					</h3>
					<span class="category-tag px-2 py-1 text-xs rounded-full" aria-label="Category">
						{resource.category}
					</span>
				</div>
				<p class="body-text mb-4">{resource.description}</p>
				<a
					href={resource.url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 text-sm accent-link"
					aria-label={`Visit ${resource.title} website`}
				>
					Visit Site <span aria-hidden="true">→</span>
				</a>
			</article>
		{/each}
	</div>

	<div class="mt-12 p-6 rounded-lg bg-gradient border">
		<h2 class="text-xl font-semibold mb-3">Need Guidance?</h2>
		<p class="body-text mb-4">
			Learning to code can be overwhelming with so many resources available. If you need help
			choosing the right path or want personalized guidance, I'm happy to help.
		</p>
		<a
			href="/contact"
			class="cta-button px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
		>
			Get Learning Advice
		</a>
	</div>
</div>

<style>
	.category-btn {
		border: 1px solid var(--color-border);
		color: var(--color-muted);
		background-color: var(--color-bg);
	}

	.category-btn:hover {
		color: var(--color-text);
		border-color: var(--color-accent);
	}

	.category-btn.active {
		background-color: var(--color-accent);
		color: white;
		border-color: var(--color-accent);
	}

	.resource-card {
		border-color: var(--color-border);
		background-color: var(--color-bg);
	}

	.resource-card:hover {
		border-color: var(--color-accent);
		background-color: color-mix(in srgb, var(--color-accent) 3%, var(--color-bg));
		transform: translateY(-2px);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.resource-link {
		color: var(--color-text);
	}

	.resource-link:hover {
		color: var(--color-accent);
	}

	.category-tag {
		background-color: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg));
		color: var(--color-accent);
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
	}

	.bg-gradient {
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)) 0%,
			color-mix(in srgb, var(--color-accent) 3%, var(--color-bg)) 100%
		);
		border-color: color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.cta-button {
		background-color: var(--color-accent);
		color: white;
		border: none;
	}

	.cta-button:hover {
		background-color: color-mix(in srgb, var(--color-accent) 85%, white);
	}
</style>
