export interface ElementObserverOptions {
	className?: string;
	threshold?: number;
	rootMargin?: string;
}

// General-purpose configurable IntersectionObserver factory
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

// Scroll-triggered animations with accessibility support
export function createScrollObserver() {
	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		// If user prefers reduced motion, don't apply animations
		return {
			observe: () => {},
			disconnect: () => {}
		};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.05,
			rootMargin: '100px 0px 0px 0px'
		}
	);

	return {
		observe: (element: Element) => observer.observe(element),
		disconnect: () => observer.disconnect()
	};
}

// Utility to set up scroll animations on mount
export function setupScrollAnimations(container: HTMLElement) {
	const scrollObserver = createScrollObserver();

	// Find all sections to animate
	const sections = container.querySelectorAll('section[aria-labelledby], section[aria-label]');

	sections.forEach((section, index) => {
		// Add initial state classes
		section.classList.add('scroll-animate');

		// Slight delay for sections after the first
		if (index > 0) {
			(section as HTMLElement).style.setProperty('--animation-delay', `${index * 50}ms`);
		}

		scrollObserver.observe(section);
	});

	// Cleanup function
	return () => scrollObserver.disconnect();
}
