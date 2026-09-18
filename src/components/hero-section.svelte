<script lang="ts">
	import { trackCTA } from '$lib/analytics';
	import { positioning } from '$lib/copy';
	import { ROLE_TITLE } from '$lib/constants';
</script>

<section aria-label="Introduction" class="pt-20 sm:pt-28 pb-16">
	<div class="wordmark">
		<div class="hero-cursor cursor-blink" aria-hidden="true"></div>
		<p class="hero-name font-mono">adam robinson</p>
	</div>
	<p class="hero-subtitle font-mono">{ROLE_TITLE}</p>
	<h1>{positioning.headline}</h1>
	<p class="summary">{positioning.summary}</p>
	<p class="industries">Fintech · Healthcare · Industrial Technology · Insurance</p>
	<div class="actions">
		<a
			href="#work"
			class="btn-primary text-center"
			onclick={() => trackCTA('Explore my work', 'home-hero-primary')}
		>
			Explore my work
		</a>
		<a
			href="/adam_robinson.pdf"
			class="btn-secondary text-center"
			onclick={() => trackCTA('Download résumé', 'home-hero-resume')}
		>
			Download résumé
		</a>
	</div>
</section>

<style>
	.wordmark {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 24px;
	}
	.hero-cursor {
		width: 18px;
		height: 64px;
		border-radius: 3px;
		background: var(--color-accent);
		flex-shrink: 0;
	}
	.hero-name {
		font-size: clamp(28px, 6vw, 52px);
		font-weight: 500;
		letter-spacing: -1.5px;
		line-height: 1.1;
		margin: 0;
	}
	.hero-subtitle {
		font-size: 12px;
		letter-spacing: 1.5px;
		text-transform: uppercase;
		color: var(--color-muted);
		margin-bottom: 24px;
	}
	h1 {
		font-size: clamp(30px, 5vw, 44px);
		font-weight: 500;
		line-height: 1.18;
		letter-spacing: -1.5px;
		text-wrap: balance;
		margin-bottom: 24px;
	}
	.summary {
		font-size: 17px;
		line-height: 1.8;
		max-width: 42rem;
	}
	.industries {
		color: var(--color-muted);
		font-size: 13px;
		line-height: 1.8;
		margin-top: 24px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-top: 32px;
	}
	@media (max-width: 480px) {
		.actions {
			flex-direction: column;
		}
	}
</style>
