import { track } from '@vercel/analytics'

export function trackCTA(label: string, location: string) {
	track('CTA Clicked', { label, location })
}

export function trackScrollDepth(depth: string, path: string) {
	track('Scroll Depth', { depth, path })
}

export function trackFormSubmit(projectType: string, hasPhone: 'yes' | 'no') {
	track('Contact Form Submitted', { project_type: projectType, has_phone: hasPhone })
}
