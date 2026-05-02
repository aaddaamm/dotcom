<script lang="ts">
	import SeoHead from '../components/seo-head.svelte';
	import HeroSection from '../components/hero-section.svelte';
	import WorkCard from '../components/work-card.svelte';
	import TrustStrip from '../components/trust-strip.svelte';
	import RecentlyShipped from '../components/recently-shipped.svelte';
	import OutcomeProof from '../components/outcome-proof.svelte';
	import { selectedWork, techStack } from '$lib/copy';
	import { setupScrollAnimations } from '$lib/animations';
	import { onMount } from 'svelte';
	import { unlockSeveredRoute } from '$lib/stores/severance';
	import { pageSeo } from '$lib/seo';
	import { KONAMI_SEQUENCE, normalizeKey } from '$lib/home-easter-egg';

	let mainContainer: HTMLElement;
	let showRuneToast = false;
	let runeToastTimer: ReturnType<typeof setTimeout> | null = null;
	let audioContext: AudioContext | null = null;

	function playRuneChime() {
		try {
			audioContext ??= new AudioContext();
			const now = audioContext.currentTime;
			const notes = [523.25, 659.25, 783.99];

			notes.forEach((freq, i) => {
				const osc = audioContext!.createOscillator();
				const gain = audioContext!.createGain();
				osc.type = 'triangle';
				osc.frequency.setValueAtTime(freq, now + i * 0.07);
				gain.gain.setValueAtTime(0.0001, now + i * 0.07);
				gain.gain.exponentialRampToValueAtTime(0.06, now + i * 0.07 + 0.02);
				gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.22);
				osc.connect(gain);
				gain.connect(audioContext!.destination);
				osc.start(now + i * 0.07);
				osc.stop(now + i * 0.07 + 0.24);
			});
		} catch {
			// no-op
		}
	}

	function triggerRuneReveal() {
		unlockSeveredRoute();
		showRuneToast = true;
		playRuneChime();
		if (runeToastTimer) clearTimeout(runeToastTimer);
		runeToastTimer = setTimeout(() => {
			showRuneToast = false;
		}, 4200);
	}

	onMount(() => {
		const cleanup = setupScrollAnimations(mainContainer);
		let progress = 0;

		const onKeydown = (event: KeyboardEvent) => {
			const key = normalizeKey(event.key);
			const expected = KONAMI_SEQUENCE[progress];
			const isKonamiKey = KONAMI_SEQUENCE.includes(key);

			if (key !== expected) {
				progress = key === KONAMI_SEQUENCE[0] ? 1 : 0;
				return;
			}

			if (isKonamiKey) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}

			progress += 1;
			if (progress < KONAMI_SEQUENCE.length) return;

			progress = 0;
			triggerRuneReveal();
		};

		window.addEventListener('keydown', onKeydown, { capture: true });

		return () => {
			window.removeEventListener('keydown', onKeydown, { capture: true });
			if (runeToastTimer) clearTimeout(runeToastTimer);
			cleanup();
		};
	});
</script>

<SeoHead {...pageSeo.home} />

<div class="max-w-3xl mx-auto px-6" class:rune-glow={showRuneToast} bind:this={mainContainer}>
	<HeroSection />
	<TrustStrip />
	<OutcomeProof />
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
		<div class="rune-light" aria-hidden="true"></div>
		<div class="rune-toast" role="status" aria-live="polite">
			<span class="rune-ring" aria-hidden="true"></span>
			<span class="spark spark-1" aria-hidden="true">✦</span>
			<span class="spark spark-2" aria-hidden="true">✧</span>
			<span class="spark spark-3" aria-hidden="true">✦</span>
			✶ ward accepted ✶ secret phrase:
			<code>ex codice lumen</code>
		</div>
	{/if}
</div>

<style>
	.rune-light {
		position: fixed;
		left: 50%;
		top: 96px;
		width: 520px;
		height: 220px;
		transform: translateX(-50%);
		background: radial-gradient(
			circle at 50% 0%,
			color-mix(in srgb, var(--color-accent) 32%, transparent),
			transparent 70%
		);
		filter: blur(10px);
		pointer-events: none;
		z-index: 280;
		animation: rune-light-emerge 1000ms ease-out;
	}

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
		overflow: hidden;
		animation:
			rune-enter 420ms cubic-bezier(0.22, 1, 0.36, 1),
			rune-float 2200ms ease-in-out 420ms infinite,
			rune-fade 4200ms linear;
	}

	.rune-ring {
		position: absolute;
		inset: -60%;
		background: conic-gradient(
			from 0deg,
			transparent 0 35%,
			color-mix(in srgb, var(--color-accent) 35%, transparent) 45%,
			transparent 60% 100%
		);
		opacity: 0.7;
		animation: rune-spin 2.4s linear infinite;
		pointer-events: none;
	}

	.spark {
		position: absolute;
		color: var(--color-accent);
		opacity: 0;
		animation: spark-burst 900ms ease-out forwards;
		pointer-events: none;
	}

	.spark-1 {
		top: 2px;
		left: 10px;
		animation-delay: 80ms;
	}

	.spark-2 {
		top: 4px;
		right: 14px;
		animation-delay: 140ms;
	}

	.spark-3 {
		bottom: 2px;
		right: 40%;
		animation-delay: 210ms;
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

	@keyframes rune-light-emerge {
		0% {
			opacity: 0;
			transform: translateX(-50%) scale(0.7);
		}
		100% {
			opacity: 1;
			transform: translateX(-50%) scale(1);
		}
	}

	@keyframes rune-enter {
		0% {
			opacity: 0;
			transform: translate(-50%, -16px) scale(0.9);
			filter: blur(4px);
		}
		60% {
			opacity: 1;
			transform: translate(-50%, 2px) scale(1.04);
		}
		100% {
			opacity: 1;
			transform: translate(-50%, 0) scale(1);
			filter: blur(0);
		}
	}

	@keyframes rune-float {
		0%,
		100% {
			transform: translate(-50%, 0);
		}
		50% {
			transform: translate(-50%, -4px);
		}
	}

	@keyframes rune-fade {
		0%,
		85% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes rune-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes spark-burst {
		0% {
			opacity: 0;
			transform: translateY(6px) scale(0.5);
		}
		30% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(-12px) scale(1.1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.rune-light,
		.rune-toast,
		.rune-glow :global(section:first-of-type),
		.rune-ring,
		.spark {
			animation: none;
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
