import { track } from '@vercel/analytics';

export function trackCTA(label: string, location: string) {
	track('CTA Clicked', { label, location });
}

export function trackScrollDepth(depth: string, path: string) {
	track('Scroll Depth', { depth, path });
}

export function trackFormSubmit(projectType: string, hasPhone: 'yes' | 'no') {
	track('Contact Form Submitted', { project_type: projectType, has_phone: hasPhone });
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
