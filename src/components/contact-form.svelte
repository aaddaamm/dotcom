<script lang="ts">
	import { trackFormStart, trackFormSubmit, trackFormValidationError } from '$lib/analytics';
	import { EMAIL } from '$lib/constants';
	import { type ContactFormData, validateContactForm } from '$lib/validation';

	let name = $state('');
	let email = $state('');
	let project = $state('');
	let timeline = $state('');
	let budget = $state('');
	let message = $state('');
	let phone = $state('');
	let website = $state(''); // honeypot
	let isSubmitting = $state(false);
	let submitted = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let fieldErrors = $state<Record<string, string>>({});
	let trackedStart = $state(false);

	function trackStart() {
		if (trackedStart) return;
		trackedStart = true;
		trackFormStart('contact-page');
	}

	function getFriendlyErrorMessage(message: string, status?: number): string {
		if (status === 429 || message.toLowerCase().includes('too many submissions')) {
			return 'You’ve hit the submission limit for now. Please wait 15 minutes, then try again.';
		}

		if (
			status === 400 &&
			(message.toLowerCase().includes('missing required') ||
				message.toLowerCase().includes('invalid'))
		) {
			return 'Please review your details and try again.';
		}

		if (status && status >= 500) {
			return 'Thanks — something broke on my side, but your message may still have been received. Please retry or email me directly.';
		}

		return message || 'Something went wrong. Please try again.';
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		errorMessage = '';
		successMessage = '';
		fieldErrors = {};

		// Validate form
		const formData: ContactFormData = {
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			project: project.trim(),
			timeline: timeline.trim(),
			budget: budget.trim(),
			message: message.trim()
		};
		const validation = validateContactForm(formData);
		if (!validation.isValid) {
			fieldErrors = validation.errors;
			errorMessage = 'Please fix the errors below.';
			trackFormValidationError(Object.keys(validation.errors).length);
			isSubmitting = false;
			return;
		}

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...formData, website })
			});

			const result = await response.json();

			if (response.ok && result.success) {
				trackFormSubmit(
					project.trim(),
					phone.trim() ? 'yes' : 'no',
					timeline.trim() ? 'yes' : 'no',
					budget.trim() ? 'yes' : 'no'
				);

				successMessage =
					result.message ||
					"Thanks — message received. I'll follow up within 24 hours with next steps.";
				name = '';
				email = '';
				project = '';
				timeline = '';
				budget = '';
				message = '';
				phone = '';
				submitted = true;

				setTimeout(() => {
					submitted = false;
					successMessage = '';
					trackedStart = false;
				}, 8000);
			} else {
				errorMessage = getFriendlyErrorMessage(result.error || '', response.status);
			}
		} catch (error) {
			console.error('Form submission error:', error);
			errorMessage =
				'Network issue while submitting. Please check your connection and try again, or email me directly.';
		}

		isSubmitting = false;
	}
</script>

<div class="contact-form-container">
	{#if submitted && successMessage}
		<div role="status" aria-live="polite" class="success-message p-6 rounded-lg text-center">
			<h3 class="text-xl font-semibold mb-2">Thanks — your message is in.</h3>
			<p class="body-text mb-4">{successMessage}</p>
			<p class="text-sm muted-text mb-2">What happens next:</p>
			<ul class="next-steps mb-4" aria-label="Next steps">
				<li>I review your message and reply within 24 hours.</li>
				<li>We align on goals, timeline, and constraints.</li>
				<li>If it’s a fit, I’ll propose clear next steps.</li>
			</ul>
			<p class="text-sm muted-text mb-4">
				If you need to reach me urgently, you can also email me directly at
				<a href="mailto:{EMAIL}" class="accent-link">{EMAIL}</a>
			</p>
			<button class="text-sm accent-link underline" onclick={() => (submitted = false)}>
				Send another message
			</button>
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="contact-form">
			{#if errorMessage}
				<div role="alert" class="error-message p-4 rounded-lg mb-4">
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
					class:field-error={fieldErrors.name}
					placeholder="Your name"
					disabled={isSubmitting}
					onfocus={trackStart}
					aria-describedby={fieldErrors.name ? 'name-error' : undefined}
				/>
				{#if fieldErrors.name}<p id="name-error" class="field-error-msg">{fieldErrors.name}</p>{/if}
			</div>

			<div class="form-group">
				<label for="email" class="form-label">Email *</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="form-input"
					class:field-error={fieldErrors.email}
					placeholder="your@email.com"
					disabled={isSubmitting}
					onfocus={trackStart}
					aria-describedby={fieldErrors.email ? 'email-error' : undefined}
				/>
				{#if fieldErrors.email}<p id="email-error" class="field-error-msg">
						{fieldErrors.email}
					</p>{/if}
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
					onfocus={trackStart}
				/>
			</div>

			<div class="form-group">
				<label for="project" class="form-label">Project Type *</label>
				<select
					id="project"
					bind:value={project}
					required
					class="form-input"
					class:field-error={fieldErrors.project}
					disabled={isSubmitting}
					onfocus={trackStart}
					aria-describedby={fieldErrors.project ? 'project-error' : undefined}
				>
					<option value="">What brings you here...</option>
					<option value="Full-time opportunity">Full-time opportunity</option>
					<option value="Contract / Freelance project">Contract / Freelance project</option>
					<option value="Technical consulting">Technical consulting</option>
					<option value="Something else">Something else</option>
				</select>
				{#if fieldErrors.project}<p id="project-error" class="field-error-msg">
						{fieldErrors.project}
					</p>{/if}
			</div>

			<div class="form-group">
				<label for="timeline" class="form-label">Preferred Timeline (Optional)</label>
				<select
					id="timeline"
					bind:value={timeline}
					class="form-input"
					disabled={isSubmitting}
					onfocus={trackStart}
				>
					<option value="">No preference yet</option>
					<option value="ASAP">ASAP</option>
					<option value="2-4 weeks">2-4 weeks</option>
					<option value="1-2 months">1-2 months</option>
					<option value="2+ months">2+ months</option>
				</select>
			</div>

			<div class="form-group">
				<label for="budget" class="form-label">Budget Range (Optional)</label>
				<select
					id="budget"
					bind:value={budget}
					class="form-input"
					disabled={isSubmitting}
					onfocus={trackStart}
				>
					<option value="">Prefer not to say</option>
					<option value="Under $5k">Under $5k</option>
					<option value="$5k-$15k">$5k-$15k</option>
					<option value="$15k-$50k">$15k-$50k</option>
					<option value="$50k+">$50k+</option>
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
					class:field-error={fieldErrors.message}
					placeholder="Tell me about your project and any specific challenges you're facing..."
					disabled={isSubmitting}
					onfocus={trackStart}
					aria-describedby={fieldErrors.message ? 'message-error' : undefined}
				></textarea>
				{#if fieldErrors.message}<p id="message-error" class="field-error-msg">
						{fieldErrors.message}
					</p>{/if}
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
						Sending message...
					{:else}
						Send project details
					{/if}
				</span>
			</button>

			<div class="form-note text-sm mt-4">
				<p class="mb-2">I reply within 24 hours with clear next steps and a rough timeline.</p>
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
		color: var(--color-on-accent);
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

	.next-steps {
		text-align: left;
		list-style: disc;
		padding-left: 1.25rem;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.next-steps li + li {
		margin-top: 0.25rem;
	}

	.error-message {
		background-color: color-mix(in srgb, var(--color-error) 10%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-error) 20%, transparent);
		color: var(--color-error);
	}

	.form-input.field-error {
		border-color: var(--color-error);
	}

	.field-error-msg {
		font-size: 0.8rem;
		color: var(--color-error);
		margin: 0;
	}
</style>
