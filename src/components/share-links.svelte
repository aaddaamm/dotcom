<script lang="ts">
	interface ShareLinksProps {
		title: string;
		url: string;
	}

	let { title, url }: ShareLinksProps = $props();
	let copied = $state(false);

	let shareText = $derived(`${title} — Adam Robinson`);
	let xShareUrl = $derived(
		`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`
	);
	let linkedInShareUrl = $derived(
		`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
	);

	async function copyPostLink() {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			// noop
		}
	}
</script>

<section class="share-section" aria-label="Share this post">
	<p class="share-heading">Share this post</p>
	<div class="share-links">
		<a href={xShareUrl} target="_blank" rel="noopener noreferrer" class="share-link">X</a>
		<a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" class="share-link">
			LinkedIn
		</a>
		<button class="share-link share-button" onclick={copyPostLink}>
			{copied ? 'Copied' : 'Copy link'}
		</button>
	</div>
</section>

<style>
	.share-section {
		margin-top: 2rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--color-border);
	}

	.share-heading {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--color-muted);
		margin-bottom: 0.9rem;
	}

	.share-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.share-link {
		text-decoration: none;
		font-size: 0.75rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
		padding: 0.35rem 0.6rem;
		border: 1px solid var(--color-border);
		background: transparent;
		transition:
			color 150ms ease,
			border-color 150ms ease;
	}

	.share-link:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}

	.share-button {
		cursor: pointer;
	}
</style>
