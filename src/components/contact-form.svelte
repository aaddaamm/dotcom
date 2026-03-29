<script lang="ts">
	let name = $state('');
	let email = $state('');
	let project = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let submitted = $state(false);

	function sanitizeText(text: string): string {
		return text.replace(/[<>&"']/g, (match) => {
			switch (match) {
				case '<':
					return '&lt;';
				case '>':
					return '&gt;';
				case '&':
					return '&amp;';
				case '"':
					return '&quot;';
				case "'":
					return '&#x27;';
				default:
					return match;
			}
		});
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;

		// Sanitize inputs to prevent XSS
		const safeName = sanitizeText(name.trim());
		const safeEmail = sanitizeText(email.trim());
		const safeProject = sanitizeText(project.trim());
		const safeMessage = sanitizeText(message.trim());

		// Validate inputs
		if (!safeName || !safeEmail || !safeProject || !safeMessage) {
			isSubmitting = false;
			return;
		}

		// Create mailto link with sanitized data
		const subject = encodeURIComponent(`Project Inquiry from ${safeName}`);
		const body = encodeURIComponent(`Name: ${safeName}
Email: ${safeEmail}
Project Type: ${safeProject}

Message:
${safeMessage}

---
Sent from adamrobinson.tech contact form`);

		const mailtoLink = `mailto:adam@adamrobinson.tech?subject=${subject}&body=${body}`;

		// Use a more secure method to open mailto
		try {
			const link = document.createElement('a');
			link.href = mailtoLink;
			link.target = '_blank';
			link.rel = 'noopener noreferrer';
			link.click();
		} catch {
			// Fallback for browsers that don't support the above
			window.open(mailtoLink, '_blank', 'noopener,noreferrer');
		}

		// Reset form and show success
		setTimeout(() => {
			name = '';
			email = '';
			project = '';
			message = '';
			isSubmitting = false;
			submitted = true;

			// Hide success message after 5 seconds
			setTimeout(() => {
				submitted = false;
			}, 5000);
		}, 1000);
	}
</script>

<div class="contact-form-container">
	{#if submitted}
		<div class="success-message p-6 rounded-lg text-center">
			<h3 class="text-xl font-semibold mb-2">Thanks for reaching out!</h3>
			<p class="body-text mb-4">
				Your email client should have opened with the message pre-filled. If not, feel free to email
				me directly at
				<a href="mailto:adam@adamrobinson.tech" class="accent-link">adam@adamrobinson.tech</a>
			</p>
			<button class="text-sm accent-link underline" onclick={() => (submitted = false)}>
				Send Another Message
			</button>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="contact-form">
			<div class="form-group">
				<label for="name" class="form-label">Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					required
					class="form-input"
					placeholder="Your name"
				/>
			</div>

			<div class="form-group">
				<label for="email" class="form-label">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="form-input"
					placeholder="your@email.com"
				/>
			</div>

			<div class="form-group">
				<label for="project" class="form-label">Project Type</label>
				<select id="project" bind:value={project} required class="form-input">
					<option value="">Select project type...</option>
					<option value="Website Fix/Update">Website Fix/Update</option>
					<option value="Custom Software Development">Custom Software Development</option>
					<option value="Technical Consultation">Technical Consultation</option>
					<option value="Ongoing Support">Ongoing Support</option>
					<option value="Not Sure - Need Advice">Not Sure - Need Advice</option>
				</select>
			</div>

			<div class="form-group">
				<label for="message" class="form-label">Project Details</label>
				<textarea
					id="message"
					bind:value={message}
					required
					rows="4"
					class="form-input"
					placeholder="Tell me about your project, timeline, and any specific challenges you're facing..."
				></textarea>
			</div>

			<button
				type="submit"
				disabled={isSubmitting || !name || !email || !project || !message}
				class="submit-button w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
			>
				<span class="flex items-center justify-center gap-2">
					{#if isSubmitting}
						<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
								fill="none"
								opacity="0.25"
							/>
							<path
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Opening Email...
					{:else}
						Send Message
					{/if}
				</span>
			</button>

			<div class="form-note text-sm mt-4">
				<p class="mb-2">
					This will open your email client with the message pre-filled. I typically respond within
					24 hours.
				</p>
				<p class="text-xs muted-text">
					Email client not working? You can send me a message directly at the email above.
				</p>
			</div>
		</form>
	{/if}
</div>

<style>
	.contact-form-container {
		max-width: 600px;
		margin: 0 auto;
	}

	.contact-form {
		display: grid;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-weight: 500;
		color: var(--color-text);
		font-size: 0.95rem;
	}

	.form-input {
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: inherit;
		font-size: 0.95rem;
		transition:
			border-color 300ms ease,
			box-shadow 300ms ease;
	}

	.form-input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 15%, transparent);
	}

	.form-input::placeholder {
		color: var(--color-muted);
	}

	.submit-button {
		background-color: var(--color-accent);
		color: white;
		border: none;
		cursor: pointer;
	}

	.submit-button:hover:not(:disabled) {
		background-color: color-mix(in srgb, var(--color-accent) 85%, white);
	}

	.submit-button:disabled {
		cursor: not-allowed;
	}

	.form-note {
		color: var(--color-muted);
		text-align: center;
	}

	.success-message {
		background-color: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
	}

	.success-message h3 {
		color: var(--color-text);
	}
</style>
