import { getFriendlyErrorMessage, inferIntent, isFallbackSuccessMessage } from '$lib/contact-form';
import { type ContactFormData, validateContactForm } from '$lib/validation';

export type ContactFormState = {
	name: string;
	email: string;
	intent: string;
	phone: string;
	project: string;
	timeline: string;
	budget: string;
	message: string;
	website: string;
};

export type ContactFormSubmitResult =
	| {
			ok: true;
			normalizedIntent: ReturnType<typeof inferIntent>;
			submittedPayload: ContactFormData;
			successMessage: string;
			outcome: 'success' | 'fallback';
	  }
	| {
			ok: false;
			reason: 'validation';
			fieldErrors: Record<string, string>;
			errorMessage: string;
	  }
	| {
			ok: false;
			reason: 'api' | 'network';
			normalizedIntent: ReturnType<typeof inferIntent>;
			errorMessage: string;
	  };

function toContactPayload(state: ContactFormState): ContactFormData {
	return {
		name: state.name.trim(),
		email: state.email.trim(),
		intent: state.intent.trim(),
		phone: state.phone.trim(),
		project: state.project.trim(),
		timeline: state.timeline.trim(),
		budget: state.budget.trim(),
		message: state.message.trim()
	};
}

export async function submitContactForm(state: ContactFormState): Promise<ContactFormSubmitResult> {
	const payload = toContactPayload(state);
	const validation = validateContactForm(payload);

	if (!validation.isValid) {
		return {
			ok: false,
			reason: 'validation',
			fieldErrors: validation.errors,
			errorMessage: 'Please fix the errors below.'
		};
	}

	const normalizedIntent = inferIntent(payload.intent ?? '', payload.project ?? '');

	try {
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...payload, website: state.website })
		});

		const result = (await response.json()) as {
			success?: boolean;
			message?: string;
			error?: string;
		};
		const resultMessage = result.message ?? '';

		if (response.ok && result.success) {
			return {
				ok: true,
				normalizedIntent,
				submittedPayload: payload,
				successMessage:
					result.message ||
					"Thanks — message received. I'll follow up within 24 hours with next steps.",
				outcome: isFallbackSuccessMessage(resultMessage) ? 'fallback' : 'success'
			};
		}

		return {
			ok: false,
			reason: 'api',
			normalizedIntent,
			errorMessage: getFriendlyErrorMessage(result.error || '', response.status)
		};
	} catch {
		return {
			ok: false,
			reason: 'network',
			normalizedIntent,
			errorMessage:
				'Network issue while submitting. Please check your connection and try again, or email me directly.'
		};
	}
}
