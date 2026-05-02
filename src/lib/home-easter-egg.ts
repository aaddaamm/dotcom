export const KONAMI_SEQUENCE = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a'
];

export function normalizeKey(eventKey: string): string {
	return eventKey.length === 1 ? eventKey.toLowerCase() : eventKey;
}

export function animateStackItem(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return;
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduceMotion) return;
	target.animate(
		[
			{ transform: 'scale(1)    translateY(0)', color: 'var(--color-muted)' },
			{
				transform: 'scale(1.3)  translateY(-6px)',
				color: 'var(--color-accent)',
				offset: 0.35
			},
			{ transform: 'scale(1.15) translateY(-3px)', offset: 0.65 },
			{ transform: 'scale(1)    translateY(0)', color: 'var(--color-text)' }
		],
		{ duration: 600, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
	);
}
