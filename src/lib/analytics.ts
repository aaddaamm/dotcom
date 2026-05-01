import { track } from '@vercel/analytics';

export type CtaLocation =
	| 'home-hero-primary'
	| 'home-hero-secondary'
	| 'services'
	| 'mobile-fab'
	| 'contact-top-secondary'
	| 'contact-top-secondary-work'
	| 'hire-top-primary'
	| 'hire-top-secondary'
	| 'hire-bottom-primary'
	| 'work-top-primary'
	| 'work-top-secondary'
	| 'teach';

export type ResumeDownloadLocation = 'hire-page';

export function trackCTA(label: string, location: CtaLocation) {
	track('CTA Clicked', { label, location });
}

export function trackScrollDepth(depth: string, path: string) {
	track('Scroll Depth', { depth, path });
}

export function trackFormView(source: 'contact-page') {
	track('Contact Form Viewed', { source });
}

export function trackFormStart(source: 'contact-page') {
	track('Contact Form Started', { source });
}

export function trackFormValidationError(fieldCount: number) {
	track('Contact Form Validation Error', { field_count: fieldCount });
}

export type ContactIntent = 'full-time' | 'contract' | 'consulting' | 'general';

export function trackFormSubmit(
	intent: ContactIntent,
	hasPhone: 'yes' | 'no',
	hasTimeline: 'yes' | 'no',
	hasBudget: 'yes' | 'no'
) {
	track('Contact Form Submitted', {
		intent,
		has_phone: hasPhone,
		has_timeline: hasTimeline,
		has_budget: hasBudget
	});
}

export function trackFormSubmitOutcome(
	status: 'success' | 'fallback' | 'error',
	intent: ContactIntent
) {
	track('Contact Form Submit Outcome', { status, intent });
}

export function trackTerminalOpen(source: 'keyboard' | 'button' | 'page') {
	track('Terminal Opened', { source });
}

export function trackTerminalCommand(command: string, mode: string) {
	track('Terminal Command', { command, mode });
}

export function trackTerminalModeChange(to: string) {
	track('Terminal Mode Changed', { to });
}

export function trackResumeDownload(
	location: ResumeDownloadLocation,
	fileType: 'pdf' | 'docx' = 'pdf'
) {
	track('Resume Downloaded', { location, file_type: fileType });
}
