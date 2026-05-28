import { inferIntent } from '$lib/contact-form';
import type { ContactIntent } from '$lib/analytics';

export type InquiryIntent = ContactIntent;

export function formatInquirySubject(name: string, intent: string, projectType: string): string {
	const inferred = inferIntent(intent, projectType);
	const labelMap: Record<InquiryIntent, string> = {
		'full-time': 'Full-Time',
		contract: 'Contract',
		consulting: 'Consulting',
		speaking: 'Speaking',
		collaboration: 'Collaboration',
		general: 'General'
	};

	return `[${labelMap[inferred]}] New inquiry from ${name}`;
}
