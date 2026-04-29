<script lang="ts">
	import SeoHead from '../components/seo-head.svelte';
	import HeroSection from '../components/hero-section.svelte';
	import WorkCard from '../components/work-card.svelte';
	import TrustStrip from '../components/trust-strip.svelte';
	import RecentlyShipped from '../components/recently-shipped.svelte';
	import { selectedWork, techStack } from '$lib/copy';
	import { setupScrollAnimations } from '$lib/animations';
	import { onMount } from 'svelte';

	let mainContainer: HTMLElement;
	let showRuneToast = false;
	let runeToastTimer: ReturnType<typeof setTimeout> | null = null;

	onMount(() => {
		const cleanup = setupScrollAnimations(mainContainer);
		const konami = [
			'ArrowUp',
			'ArrowUp',
			'ArrowDown',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
			'ArrowLeft',
			'ArrowRight',
			'b',
			'a'
		];
		let progress = 0;

		const onKeydown = (event: KeyboardEvent) => {
			const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
			const expected = konami[progress];
			const isKonamiKey = konami.includes(key);

			if (key !== expected) {
				progress = key === konami[0] ? 1 : 0;
				return;
			}

			if (isKonamiKey) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}

			progress += 1;
			if (progress < konami.length) return;

			progress = 0;
			showRuneToast = true;
			if (runeToastTimer) clearTimeout(runeToastTimer);
			runeToastTimer = setTimeout(() => {
				showRuneToast = false;
			}, 4200);
		};

		window.addEventListener('keydown', onKeydown, { capture: true });

		return () => {
			window.removeEventListener('keydown', onKeydown, { capture: true });
			if (runeToastTimer) clearTimeout(runeToastTimer);
			cleanup();
		};
	});
</script>

<SeoHead
	title="Adam Robinson — Senior Software Engineer, Providence RI"
	description="Senior software engineer in Providence, RI. Rails, Node.js, TypeScript. Contract and full-time. Ten-plus years in fintech, healthcare, and enterprise."
	path="/"
/>

<div class="max-w-3xl mx-auto px-6" class:rune-glow={showRuneToast} bind:this={mainContainer}>
	<HeroSection />
	<TrustStrip />
	<RecentlyShipped />

	<!-- Tech Stack -->
	<section aria-labelledby="stack-heading" class="py-14 section-border">
		<h2 id="stack-heading" class="section-heading">
			Stack
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="stack-grid">
			{#each techStack as group (group.category)}
				<div class="stack-group">
					<p class="stack-category">{group.category}</p>
					<ul class="stack-items">
						{#each group.items as item (item)}
							<li>
								<button
									class="stack-item"
									onclick={(e) => {
										const reduceMotion = window.matchMedia(
											'(prefers-reduced-motion: reduce)'
										).matches;
										if (reduceMotion) return;
										e.currentTarget.animate(
											[
												{ transform: 'scale(1)    translateY(0)', color: 'var(--color-muted)' },
												{
													transform: 'scale(1.3)  translateY(-6px)',
													color: 'var(--color-accent)',
													offset: 0.35
												},
												{ transform: 'scale(1.15) translateY(-3px)', offset: 0.65 },
												{ transform: 'scale(1)    translateY(0)', color: 'var(--color-text)' }
											],
											{ duration: 600, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
										);
									}}
								>
									{item}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Selected Work -->
	<section id="work" aria-labelledby="work-heading" class="py-14 section-border">
		<h2 id="work-heading" class="section-heading mb-8">
			Selected Work
			<span class="accent-dot" aria-hidden="true">.</span>
		</h2>
		<div class="grid gap-4">
			{#each selectedWork as project (project.title)}
				<WorkCard {project} variant="preview" />
			{/each}
		</div>
		<a href="/work" class="inline-flex items-center gap-1 text-sm mt-6 accent-link link-underline">
			View all work &rarr;
		</a>
	</section>
	{#if showRuneToast}
		<div class="rune-toast" role="status" aria-live="polite">
			✶ ward accepted ✶ secret phrase: <code>ex codice lumen</code>
		</div>
	{/if}
</div>

<style>
	.rune-toast {
		position: fixed;
		left: 50%;
		top: 84px;
		transform: translateX(-50%);
		z-index: 300;
		padding: 10px 12px;
		border: 1px solid color-mix(in srgb, var(--color-accent) 45%, transparent);
		background: color-mix(in srgb, var(--color-bg) 92%, var(--color-accent) 8%);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		border-radius: 4px;
		box-shadow: 0 8px 20px color-mix(in srgb, var(--color-bg) 50%, transparent);
	}

	.rune-toast code {
		color: var(--color-accent);
		font-family: inherit;
	}

	.rune-glow :global(section:first-of-type) {
		animation: rune-pulse 2.6s ease-out;
	}

	@keyframes rune-pulse {
		0% {
			filter: drop-shadow(0 0 0 color-mix(in srgb, var(--color-accent) 0%, transparent));
		}
		35% {
			filter: drop-shadow(0 0 16px color-mix(in srgb, var(--color-accent) 40%, transparent));
		}
		100% {
			filter: drop-shadow(0 0 0 color-mix(in srgb, var(--color-accent) 0%, transparent));
		}
	}

	.stack-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 24px;
	}

	.stack-group {
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)),
			var(--color-bg)
		);
		border-radius: 4px;
		padding: 16px;
	}

	.stack-category {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-accent);
		margin-bottom: 10px;
	}

	.stack-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.stack-items li {
		font-size: 0.875rem;
	}

	.stack-item {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		font-size: 0.875rem;
		font-family: inherit;
		color: var(--color-muted);
		transition: color 150ms ease;
		display: inline-block;
		text-align: left;
		position: relative;
	}

	.stack-item::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 0;
		height: 1px;
		background-color: var(--color-accent);
		transition: width 400ms ease;
	}

	.stack-item:hover {
		color: var(--color-text);
	}

	.stack-item:hover::after {
		width: 100%;
	}
</style>
