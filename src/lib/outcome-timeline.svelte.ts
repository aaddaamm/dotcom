export function createOutcomeTimeline(length: number) {
	let activeIndex = $state(0);

	function activate(index: number) {
		activeIndex = index;
	}

	function clamp(index: number): number {
		if (index < 0) return length - 1;
		if (index >= length) return 0;
		return index;
	}

	function onTabKeydown(event: KeyboardEvent, index: number) {
		if (
			event.key !== "ArrowDown" &&
			event.key !== "ArrowUp" &&
			event.key !== "Home" &&
			event.key !== "End"
		) {
			return;
		}

		event.preventDefault();

		if (event.key === "Home") {
			activeIndex = 0;
			return;
		}

		if (event.key === "End") {
			activeIndex = length - 1;
			return;
		}

		const delta = event.key === "ArrowDown" ? 1 : -1;
		activeIndex = clamp(index + delta);
	}

	return {
		get activeIndex() {
			return activeIndex;
		},
		activate,
		onTabKeydown,
	};
}
