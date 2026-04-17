let activeFilter = $state<string | null>(null);

export function getFilter() {
	return activeFilter;
}

export function toggle(tag: string) {
	activeFilter = activeFilter === tag ? null : tag;
}

export function reset() {
	activeFilter = null;
}
