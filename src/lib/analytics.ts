import { track } from '@vercel/analytics';

export function trackCTA(label: string, location: string) {
	track('CTA Clicked', { label, location });
}

export function trackScrollDepth(depth: string, path: string) {
	track('Scroll Depth', { depth, path });
}

export function trackFormStart(source: string) {
	track('Contact Form Started', { source });
}

export function trackFormValidationError(fieldCount: number) {
	track('Contact Form Validation Error', { field_count: fieldCount });
}

export function trackFormSubmit(
	projectType: string,
	hasPhone: 'yes' | 'no',
	hasTimeline: 'yes' | 'no',
	hasBudget: 'yes' | 'no'
) {
	track('Contact Form Submitted', {
		project_type: projectType,
		has_phone: hasPhone,
		has_timeline: hasTimeline,
		has_budget: hasBudget
	});
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
