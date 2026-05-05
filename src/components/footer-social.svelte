<script lang="ts">
	import { socialLinks } from '$lib/social-links';
</script>

<div class="footer-social mb-6 text-sm" aria-label="Social links">
	<span class="footer-label">Social</span>
	{#each socialLinks as social (social.key)}
		<a
			href={social.url}
			class="footer-link social-link"
			target="_blank"
			rel="noopener noreferrer"
			aria-label={social.label}
		>
			<span class="social-full">{social.label}</span>
			<span class="social-compact" aria-hidden="true">{social.compactLabel}</span>
		</a>
	{/each}
</div>

<style>
	.footer-social {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.footer-label {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
		margin-right: 0.35rem;
	}

	.footer-link {
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.social-compact {
		display: none;
	}

	@media (max-width: 640px) {
		.social-full {
			display: none;
		}

		.social-compact {
			display: inline;
			text-transform: uppercase;
		}

		.social-link {
			padding: 0.2rem 0.35rem;
			border: 1px solid var(--color-border);
			border-radius: 0.25rem;
		}
	}

	.footer-link:hover {
		color: var(--color-accent);
	}
</style>
