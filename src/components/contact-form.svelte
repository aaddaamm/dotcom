<script lang="ts">
	import { validateContactForm, type ContactFormData } from '$lib/validation';

	let name = $state('');
	let email = $state('');
	let project = $state('');
	let message = $state('');
	let phone = $state('');
	let budget = $state('');
	let website = $state(''); // honeypot
	let isSubmitting = $state(false);
	let submitted = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		errorMessage = '';
		successMessage = '';
		// Create form data object
		const formData: ContactFormData = {
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			budget,
			message: `${project.trim()}\n\n${message.trim()}`
		};

		// Validate form
		const validation = validateContactForm(formData);
		if (!validation.isValid) {
			errorMessage = 'Please fix the errors below.';
			isSubmitting = false;
			return;
		}

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: name.trim(),
					email: email.trim(),
					project: project.trim(),
					message: message.trim(),
					phone: phone.trim(),
					budget: budget.trim(),
					website
				})
			});

			const result = await response.json();

			if (response.ok && result.success) {
				// Track successful form submission
				if (typeof window !== 'undefined' && (window as { va?: { track: (e: string, p?: Record<string, string>) => void } }).va) {
					(window as { va?: { track: (e: string, p?: Record<string, string>) => void } }).va!.track('Contact Form Submitted', {
						project_type: project.trim(),
						budget_range: budget.trim() || 'Not specified',
						has_phone: phone.trim() ? 'yes' : 'no'
					});
				}

				// Success - reset form and show success message
				successMessage = result.message || "Thank you! I'll respond within 24 hours.";
				name = '';
				email = '';
				project = '';
				message = '';
				phone = '';
				budget = '';
				submitted = true;

				// Hide success message after 8 seconds
				setTimeout(() => {
					submitted = false;
					successMessage = '';
				}, 8000);
			} else {
				errorMessage = result.error || 'Something went wrong. Please try again.';
			}
		} catch (error) {
			console.error('Form submission error:', error);
			errorMessage = 'Network error. Please check your connection and try again.';
		}

		isSubmitting = false;
	}
</script>

<div class="contact-form-container">
	{#if submitted && successMessage}
		<div class="success-message p-6 rounded-lg text-center">
			<h3 class="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
			<p class="body-text mb-4">
				{successMessage}
			</p>
			<p class="text-sm muted-text mb-4">
				If you need to reach me urgently, you can also email me directly at
				<a href="mailto:adam@adamrobinson.tech" class="accent-link">adam@adamrobinson.tech</a>
			</p>
			<button class="text-sm accent-link underline" onclick={() => (submitted = false)}>
				Send Another Message
			</button>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="contact-form">
			{#if errorMessage}
				<div class="error-message p-4 rounded-lg mb-4">
					<p class="text-sm font-medium">{errorMessage}</p>
				</div>
			{/if}

			<div class="form-group">
				<label for="name" class="form-label">Name *</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					required
					class="form-input"
					placeholder="Your name"
					disabled={isSubmitting}
				/>
			</div>

			<div class="form-group">
				<label for="email" class="form-label">Email *</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="form-input"
					placeholder="your@email.com"
					disabled={isSubmitting}
				/>
			</div>

			<div class="form-group">
				<label for="phone" class="form-label">Phone (Optional)</label>
				<input
					type="tel"
					id="phone"
					bind:value={phone}
					class="form-input"
					placeholder="(401) 555-0123"
					disabled={isSubmitting}
				/>
			</div>

			<div class="form-group">
				<label for="project" class="form-label">Project Type *</label>
				<select
					id="project"
					bind:value={project}
					required
					class="form-input"
					disabled={isSubmitting}
				>
					<option value="">Select project type...</option>
					<option value="Website Fix/Update">Website Fix/Update</option>
					<option value="Custom Software Development">Custom Software Development</option>
					<option value="Technical Consultation">Technical Consultation</option>
					<option value="Ongoing Support">Ongoing Support</option>
					<option value="Not Sure - Need Advice">Not Sure - Need Advice</option>
				</select>
			</div>

			<div class="form-group">
				<label for="budget" class="form-label">Budget Range (Optional)</label>
				<select id="budget" bind:value={budget} class="form-input" disabled={isSubmitting}>
					<option value="">Select budget range...</option>
					<option value="$500-$1,000">$500-$1,000</option>
					<option value="$1,000-$3,000">$1,000-$3,000</option>
					<option value="$3,000-$5,000">$3,000-$5,000</option>
					<option value="$5,000+">$5,000+</option>
					<option value="Not Sure">Not Sure</option>
				</select>
			</div>

			<div class="form-group">
				<label for="message" class="form-label">Project Details *</label>
				<textarea
					id="message"
					bind:value={message}
					required
					rows="4"
					class="form-input"
					placeholder="Tell me about your project, timeline, and any specific challenges you're facing..."
					disabled={isSubmitting}
				></textarea>
			</div>

			<div class="honeypot" aria-hidden="true">
				<label for="website">Website</label>
				<input
					type="text"
					id="website"
					name="website"
					bind:value={website}
					tabindex="-1"
					autocomplete="off"
				/>
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
						Sending Message...
					{:else}
						Send Message
					{/if}
				</span>
			</button>

			<div class="form-note text-sm mt-4">
				<p class="mb-2">
					I typically respond within 24 hours with next steps and a rough timeline.
				</p>
				<p class="text-xs muted-text">All information is kept confidential. No spam, ever.</p>
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

	.form-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
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

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
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

	.error-message {
		background-color: color-mix(in srgb, #ef4444 10%, var(--color-bg));
		border: 1px solid color-mix(in srgb, #ef4444 20%, transparent);
		color: #ef4444;
	}
</style>
