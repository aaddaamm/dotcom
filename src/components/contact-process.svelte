<section class="contact-process" aria-label="What happens after you reach out">
	<h2 class="process-title">What happens next</h2>
	<ol class="process-steps">
		<li>
			<span class="step-number" aria-hidden="true">1</span>
			<div>
				<p class="step-title">Reply within 24 hours</p>
				<p class="step-copy">I review every message personally and send a clear response fast.</p>
			</div>
		</li>
		<li>
			<span class="step-number" aria-hidden="true">2</span>
			<div>
				<p class="step-title">Quick alignment call</p>
				<p class="step-copy">
					If it looks like a fit, we book a short call to align on goals and context.
				</p>
			</div>
		</li>
		<li>
			<span class="step-number" aria-hidden="true">3</span>
			<div>
				<p class="step-title">Scoped next steps</p>
				<p class="step-copy">I send the proposed scope and timeline in writing.</p>
			</div>
		</li>
	</ol>
</section>

<style>
	.contact-process {
		margin: 1.25rem 0 1.5rem;
		padding: 1rem;
		border: 1px solid color-mix(in srgb, var(--color-border) 75%, transparent);
		border-radius: 0.75rem;
		background: color-mix(in srgb, var(--color-surface) 92%, transparent);
	}

	.process-title {
		font-size: 0.9rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-text);
		margin-bottom: 0.75rem;
	}

	.process-steps {
		display: grid;
		gap: 0.85rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.process-steps li {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: start;
		gap: 0.6rem;
	}

	.step-number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.35rem;
		height: 1.35rem;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		background: color-mix(in srgb, var(--color-accent) 14%, transparent);
		color: var(--color-accent);
	}

	.step-title {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--color-text);
	}

	.step-copy {
		font-size: 0.9rem;
		color: var(--color-muted);
		margin-top: 0.15rem;
	}
</style>
