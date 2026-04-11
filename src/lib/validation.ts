// Form validation utilities

export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}

export interface ContactFormData {
	name: string;
	email: string;
	phone?: string;
	project?: string;
	message: string;
	website?: string; // honeypot — must remain empty
}

export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validateContactForm(data: ContactFormData): ValidationResult {
	const errors: Record<string, string> = {};

	if (!data.name || data.name.trim().length < 2) {
		errors.name = 'Name must be at least 2 characters';
	}

	if (!data.email) {
		errors.email = 'Email is required';
	} else if (!validateEmail(data.email)) {
		errors.email = 'Please enter a valid email address';
	}

	if (!data.message || data.message.trim().length < 10) {
		errors.message = 'Message must be at least 10 characters';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}
