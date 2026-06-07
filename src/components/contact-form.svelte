<script lang="ts">
	import {
		trackFormView,
		trackFormStart,
		trackFormSubmit,
		trackFormSubmitOutcome,
		trackFormValidationError
	} from '$lib/analytics';
	import { onMount } from 'svelte';
	import ContactField from './contact-field.svelte';
	import ContactSuccessMessage from './contact-success-message.svelte';
	import {
		budgetOptions,
		inquiryIntentOptions,
		projectTypeOptions,
		timelineOptions
	} from '$lib/contact-form';
	import { submitContactForm } from '$lib/contact-form-logic';

	let name = $state('');
	let email = $state('');
	let intent = $state('');
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
	const SUCCESS_RESET_MS = 8000;

	const isSubmitDisabled = $derived(
		isSubmitting || !name || !email || !intent || !project || !message
	);

	onMount(() => {
		trackFormView('contact-page');
	});

	function trackStart() {
		if (trackedStart) return;
		trackedStart = true;
		trackFormStart('contact-page');
	}

	function resetForm() {
		name = '';
		email = '';
		project = '';
		timeline = '';
		budget = '';
		message = '';
		intent = '';
		phone = '';
	}

	function buildFormState() {
		return {
			name,
			email,
			intent,
			phone,
			project,
			timeline,
			budget,
			message,
			website
		};
	}

	function handleFailedSubmit(
		result: Extract<Awaited<ReturnType<typeof submitContactForm>>, { ok: false }>
	) {
		if (result.reason === 'validation') {
			fieldErrors = result.fieldErrors;
			errorMessage = result.errorMessage;
			trackFormValidationError(Object.keys(result.fieldErrors).length);
			return;
		}

		trackFormSubmitOutcome('error', result.normalizedIntent);
		errorMessage = result.errorMessage;
	}

	function handleSuccessfulSubmit(
		result: Extract<Awaited<ReturnType<typeof submitContactForm>>, { ok: true }>
	) {
		trackFormSubmit(
			result.normalizedIntent,
			result.submittedPayload.phone ? 'yes' : 'no',
			result.submittedPayload.timeline ? 'yes' : 'no',
			result.submittedPayload.budget ? 'yes' : 'no'
		);
		trackFormSubmitOutcome(result.outcome, result.normalizedIntent);

		successMessage = result.successMessage;
		resetForm();
		submitted = true;
		setTimeout(() => {
			submitted = false;
			successMessage = '';
			trackedStart = false;
		}, SUCCESS_RESET_MS);
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		errorMessage = '';
		successMessage = '';
		fieldErrors = {};

		const result = await submitContactForm(buildFormState());
		if (!result.ok) {
			handleFailedSubmit(result);
			isSubmitting = false;
			return;
		}

		handleSuccessfulSubmit(result);
		isSubmitting = false;
	}
</script>

<div class="contact-form-container">
	{#if submitted && successMessage}
		<ContactSuccessMessage message={successMessage} onSendAnother={() => (submitted = false)} />
	{:else}
		<form onsubmit={handleSubmit} class="contact-form">
			{#if errorMessage}
				<div role="alert" class="error-message p-4 rounded-lg mb-4">
					<p class="text-sm font-medium">{errorMessage}</p>
				</div>
			{/if}

			<fieldset class="form-section">
				<legend class="section-legend">Contact details</legend>
				<ContactField
					id="name"
					label="Name *"
					bind:value={name}
					required
					error={fieldErrors.name}
					placeholder="Your name"
					autocomplete="name"
					disabled={isSubmitting}
					onFocus={trackStart}
				/>
				<ContactField
					id="email"
					label="Email *"
					type="email"
					bind:value={email}
					required
					error={fieldErrors.email}
					placeholder="adam@example.com"
					autocomplete="email"
					inputmode="email"
					spellcheck={false}
					disabled={isSubmitting}
					onFocus={trackStart}
				/>
				<ContactField
					id="phone"
					label="Phone (Optional)"
					type="tel"
					bind:value={phone}
					placeholder="(401) 555-0123"
					autocomplete="tel"
					inputmode="tel"
					disabled={isSubmitting}
					onFocus={trackStart}
				/>
			</fieldset>

			<fieldset class="form-section">
				<legend class="section-legend">Project details</legend>
				<ContactField
					id="intent"
					label="Inquiry Type *"
					kind="select"
					bind:value={intent}
					required
					error={fieldErrors.intent}
					placeholder="What kind of inquiry is this…"
					disabled={isSubmitting}
					options={inquiryIntentOptions}
					onFocus={trackStart}
				/>
				<ContactField
					id="project"
					label="Project Type *"
					kind="select"
					bind:value={project}
					required
					error={fieldErrors.project}
					placeholder="What brings you here…"
					disabled={isSubmitting}
					options={projectTypeOptions}
					onFocus={trackStart}
				/>
				<ContactField
					id="timeline"
					label="Preferred Timeline (Optional)"
					kind="select"
					bind:value={timeline}
					placeholder="No preference yet"
					disabled={isSubmitting}
					options={timelineOptions}
					onFocus={trackStart}
				/>
				<ContactField
					id="budget"
					label="Budget Range (Optional)"
					kind="select"
					bind:value={budget}
					placeholder="Prefer not to say"
					disabled={isSubmitting}
					options={budgetOptions}
					onFocus={trackStart}
				/>
				<ContactField
					id="message"
					label="Project Details *"
					kind="textarea"
					bind:value={message}
					required
					error={fieldErrors.message}
					placeholder="Tell me about your project and any specific challenges you're facing…"
					disabled={isSubmitting}
					onFocus={trackStart}
				/>
			</fieldset>

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
				disabled={isSubmitDisabled}
				class="submit-button w-full px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
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
						Sending message…
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

	.form-section {
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		padding: 1rem;
		display: grid;
		gap: 1.25rem;
	}

	.section-legend {
		padding: 0 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: var(--color-muted);
	}

	.submit-button {
		background-color: var(--color-accent);
		color: var(--color-on-accent);
		border: none;
		cursor: pointer;
		transition:
			background-color 200ms ease,
			opacity 200ms ease,
			transform 200ms ease;
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

	.error-message {
		background-color: color-mix(in srgb, var(--color-error) 10%, var(--color-bg));
		border: 1px solid color-mix(in srgb, var(--color-error) 20%, transparent);
		color: var(--color-error);
	}
</style>
