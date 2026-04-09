<!-- Hero -->
<section aria-label="Introduction" class="pt-20 sm:pt-28 pb-10">
	<div class="flex items-center gap-4 mb-4">
		<div class="hero-cursor cursor-blink" aria-hidden="true"></div>
		<h1 class="hero-name font-mono">adam robinson</h1>
	</div>
	<p class="hero-subtitle font-mono" role="doc-subtitle">SENIOR SOFTWARE ENGINEER</p>
	<p class="body-text">
		I don't just write software — I develop solutions to real problems. Full-stack engineer with a
		backend lean, I build systems that are meant to be maintained, extended, and handed off cleanly.
		I ship user-facing products, untangle complex codebases, and care as much about the commit
		history as the feature itself. Ten-plus years across fintech, healthcare, and enterprise.
	</p>
	<div class="hero-stats flex flex-wrap gap-6 mt-4 mb-2">
		<div class="stat-item">
			<span class="stat-number">10+</span>
			<span class="stat-label">Years Experience</span>
		</div>
		<div class="stat-item">
			<span class="stat-number">Full</span>
			<span class="stat-label">Stack</span>
		</div>
		<div class="stat-item">
			<span class="stat-number">Team</span>
			<span class="stat-label">Lead</span>
		</div>
	</div>

	<div class="flex flex-col sm:flex-row gap-3 mt-6">
		<a href="/work" class="btn-primary text-center">See My Work</a>
		<a href="/contact" class="btn-secondary text-center">Get In Touch</a>
	</div>
</section>

<style>
	.hero-cursor {
		width: 18px;
		height: 64px;
		border-radius: 3px;
		background-color: var(--color-accent);
		flex-shrink: 0;
	}

	.hero-name {
		font-size: 52px;
		font-weight: 500;
		letter-spacing: -1.5px;
		color: var(--color-text);
		line-height: 1;
	}

	.hero-subtitle {
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 3px;
		color: var(--color-accent);
		text-transform: uppercase;
		margin-bottom: 24px;
	}

	.hero-stats {
		margin-top: 1.5rem;
		margin-bottom: 1rem;
	}

	.stat-item {
		text-align: center;
		min-width: 80px;
	}

	.stat-number {
		display: block;
		font-weight: 600;
		font-size: 1.125rem;
		color: var(--color-accent);
		font-family: var(--font-mono);
	}

	.stat-label {
		display: block;
		font-size: 0.75rem;
		color: var(--color-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 0.25rem;
	}
</style>
