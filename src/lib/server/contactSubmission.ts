import { validateContactForm, type ContactFormData } from '$lib/validation';

type RequiredContactFields = ContactFormData & {
	name: string;
	email: string;
	intent: string;
	project: string;
	message: string;
};

export function hasRequiredContactFields(data: ContactFormData): data is RequiredContactFields {
	return Boolean(data.name && data.email && data.intent && data.project && data.message);
}

export function sanitizeContactData(data: RequiredContactFields): ContactFormData {
	return {
		name: data.name.trim().slice(0, 100),
		email: data.email.trim().slice(0, 100),
		intent: data.intent.trim().slice(0, 60),
		project: data.project.trim().slice(0, 100),
		timeline: data.timeline?.trim().slice(0, 60) || '',
		budget: data.budget?.trim().slice(0, 60) || '',
		message: data.message.trim().slice(0, 2000),
		phone: data.phone?.trim().slice(0, 20) || ''
	};
}

export function getContactValidationError(data: ContactFormData): string | null {
	const validation = validateContactForm(data);
	if (validation.isValid) return null;
	return Object.values(validation.errors)[0] || 'Invalid form data';
}

type FailedSubmissionBodyOptions = {
	data: ContactFormData;
	ip: string;
	userAgent: string | null;
};

export function buildFailedSubmissionBody({
	data,
	ip,
	userAgent
}: FailedSubmissionBodyOptions): string {
	return [
		'New contact form submission from adamrobinson.tech:',
		`Name: ${data.name}`,
		`Email: ${data.email}`,
		`Phone: ${data.phone || 'Not provided'}`,
		`Inquiry Type: ${data.intent || 'Not provided'}`,
		`Project Type: ${data.project}`,
		`Timeline: ${data.timeline || 'Not provided'}`,
		`Budget: ${data.budget || 'Not provided'}`,
		'',
		'Message:',
		data.message,
		'---',
		`Submitted at: ${new Date().toISOString()}`,
		`IP: ${ip}`,
		`User-Agent: ${userAgent || 'Unknown'}`
	].join('\n');
}
