<script lang="ts">
	import { GITHUB_USERNAME, INSTAGRAM_HANDLE, X_HANDLE } from '$lib/constants';
</script>

<div class="footer-social mb-6 text-sm" aria-label="Social links">
	<span class="footer-label">Social</span>
	<a
		href="https://github.com/{GITHUB_USERNAME}"
		class="footer-link social-link"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="GitHub"
	>
		<span class="social-full">github</span>
		<span class="social-compact" aria-hidden="true">gh</span>
	</a>
	<a
		href="https://x.com/{X_HANDLE}"
		class="footer-link social-link"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="X"
	>
		<span class="social-full">x</span>
		<span class="social-compact" aria-hidden="true">x</span>
	</a>
	<a
		href="https://www.instagram.com/{INSTAGRAM_HANDLE}/"
		class="footer-link social-link"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Instagram"
	>
		<span class="social-full">instagram</span>
		<span class="social-compact" aria-hidden="true">ig</span>
	</a>
	<a
		href="https://www.facebook.com/profile.php?id=61573468237603"
		class="footer-link social-link"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Facebook"
	>
		<span class="social-full">facebook</span>
		<span class="social-compact" aria-hidden="true">fb</span>
	</a>
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
