let open = $state(false);

export function getTerminalOpen() {
	return open;
}

export function setTerminalClosed() {
	open = false;
}

export function openTerminal() {
	open = true;
}

export function syncTerminalOpenState({ open: nextOpen }: { open: boolean }) {
	open = nextOpen;
}
