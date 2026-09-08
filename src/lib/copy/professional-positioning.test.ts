import { describe, expect, it } from 'vitest';
import { positioning } from '$lib/copy';

describe('professional positioning copy', () => {
	it('leads with senior ownership while keeping consulting selective', () => {
		expect(positioning.headline).toContain('Senior software engineer');
		expect(positioning.summary).toContain('lead delivery');
		expect(positioning.consultingNote).toContain('select');
		expect(positioning.consultingNote).toContain('embedded');
	});

	it('makes mentoring and careful AI practice explicit', () => {
		expect(positioning.workingStyle).toContain('mentor');
		expect(positioning.aiPractice).toContain('review');
	});
});
