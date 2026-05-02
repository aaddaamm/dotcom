import type { ContactIntent } from '$lib/analytics';

export const projectTypeOptions = [
	'Full-time opportunity',
	'Contract / Freelance project',
	'Technical consulting',
	'Something else'
];

export const timelineOptions = ['ASAP', '2-4 weeks', '1-2 months', '2+ months'];

export const budgetOptions = ['Under $5k', '$5k-$15k', '$15k-$50k', '$50k+'];

export function inferIntent(projectType: string): ContactIntent {
	const value = projectType.trim().toLowerCase();
	if (value.includes('full-time')) return 'full-time';
	if (value.includes('contract') || value.includes('freelance')) return 'contract';
	if (value.includes('consulting')) return 'consulting';
	return 'general';
}

export function isFallbackSuccessMessage(message: string): boolean {
	const value = message.toLowerCase();
	return value.includes('submission was saved') || value.includes('hiccup on our end');
}

export function getFriendlyErrorMessage(message: string, status?: number): string {
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
