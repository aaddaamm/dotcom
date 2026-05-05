<script lang="ts">
	interface FooterNavProps {
		email: string;
		emailCopied: boolean;
		onCopyEmail: () => void;
	}

	let { email, emailCopied, onCopyEmail }: FooterNavProps = $props();
</script>

<div class="footer-nav mb-4 text-sm">
	<a href="/blog" class="footer-link">Blog</a>
	<a href="/work" class="footer-link">Work</a>
	<a href="/hire" class="footer-link">Hire</a>
	<a href="/play" class="footer-link">Reading</a>
	<a href="/teach" class="footer-link">Resources</a>
	<a href="/contact" class="footer-link">Contact</a>
	<button class="footer-link copy-btn" onclick={onCopyEmail}>
		{emailCopied ? 'copied!' : email}
	</button>
</div>

<style>
	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.footer-link {
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.footer-link:hover {
		color: var(--color-accent);
	}

	.copy-btn {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		font-size: inherit;
		font-family: inherit;
	}
</style>
