// Form validation utilities

export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}

export interface ContactFormData {
	name: string;
	email: string;
	phone?: string;
	budget?: string;
	project?: string;
	message: string;
}

export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
	if (!phone) return true; // Phone is optional
	const phoneRegex = /^[+]?[(]?[\d\s\-()]{10,}$/;
	return phoneRegex.test(phone);
}

export function validateContactForm(data: ContactFormData): ValidationResult {
	const errors: Record<string, string> = {};

	// Name validation
	if (!data.name || data.name.trim().length < 2) {
		errors.name = 'Name must be at least 2 characters';
	}

	// Email validation
	if (!data.email) {
		errors.email = 'Email is required';
	} else if (!validateEmail(data.email)) {
		errors.email = 'Please enter a valid email address';
	}

	// Phone validation (optional)
	if (data.phone && !validatePhone(data.phone)) {
		errors.phone = 'Please enter a valid phone number';
	}

	// Message validation
	if (!data.message || data.message.trim().length < 10) {
		errors.message = 'Message must be at least 10 characters';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}

export function sanitizeInput(input: string): string {
	return input.trim().replace(/[<>]/g, '');
}

export function sanitizeContactForm(data: ContactFormData): ContactFormData {
	return {
		name: sanitizeInput(data.name),
		email: sanitizeInput(data.email),
		phone: data.phone ? sanitizeInput(data.phone) : undefined,
		budget: data.budget,
		message: sanitizeInput(data.message)
	};
}
