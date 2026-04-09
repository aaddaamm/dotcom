<footer class="footer py-10 px-6 mt-8">
	<div class="max-w-3xl mx-auto">
		<div class="flex flex-wrap gap-6 mb-6 text-sm">
			<a href="/blog" class="footer-link">Blog</a>
			<a href="/work" class="footer-link">Work</a>
			<a href="/hire" class="footer-link">Hire</a>
			<a href="/play" class="footer-link">Reading</a>
			<a href="/teach" class="footer-link">Resources</a>
			<a href="/contact" class="footer-link">Contact</a>
		</div>
		<div class="footer-meta flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
			<p>&copy; {new Date().getFullYear()} Adam Robinson</p>
			<p>Built with SvelteKit</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
	}

	.footer-meta {
		color: var(--color-muted);
	}

	.footer-link {
		color: var(--color-muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.footer-link:hover {
		color: var(--color-accent);
	}
</style>
