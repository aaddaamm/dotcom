<script lang="ts">
	import { trackCTA } from '$lib/analytics';
</script>

<section aria-labelledby="contact-heading" class="py-16 section-border">
	<h2 id="contact-heading" class="section-heading">Let’s build something that matters.</h2>
	<p>
		I’m open to senior and staff engineering roles where I can help shape the technical direction
		and stay close to the code. I also consider select longer-term embedded consulting engagements.
	</p>
	<div class="actions">
		<a
			href="/contact"
			class="btn-primary text-center"
			onclick={() => trackCTA('Start a conversation', 'home-bottom-primary')}
		>
			Start a conversation
		</a>
		<a
			href="/adam_robinson.pdf"
			class="btn-secondary text-center"
			onclick={() => trackCTA('Download résumé', 'home-bottom-resume')}
		>
			Download résumé
		</a>
	</div>
</section>

<style>
	p {
		line-height: 1.8;
		color: var(--color-muted);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-top: 24px;
	}
	@media (max-width: 480px) {
		.actions {
			flex-direction: column;
		}
	}
</style>
