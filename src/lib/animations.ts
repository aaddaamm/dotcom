export interface ElementObserverOptions {
	className?: string;
	threshold?: number;
	rootMargin?: string;
}

// Configurable IntersectionObserver factory with reduced-motion support
export function createElementObserver(options: ElementObserverOptions = {}) {
	const { className = 'animate-in', threshold = 0.05, rootMargin = '0px' } = options;

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		return { observe: () => {}, disconnect: () => {} };
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(className);
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold, rootMargin }
	);

	return {
		observe: (element: Element) => observer.observe(element),
		disconnect: () => observer.disconnect()
	};
}

// Utility to set up scroll animations on mount
export function setupScrollAnimations(container: HTMLElement) {
	const scrollObserver = createElementObserver({ rootMargin: '100px 0px 0px 0px' });

	const sections = container.querySelectorAll('section[aria-labelledby], section[aria-label]');

	sections.forEach((section, index) => {
		section.classList.add('scroll-animate');
		if (index > 0) {
			(section as HTMLElement).style.setProperty('--animation-delay', `${index * 50}ms`);
		}
		scrollObserver.observe(section);
	});

	return () => scrollObserver.disconnect();
}
