let open = $state(false);

export function getTerminalOpen() {
	return open;
}

export function setTerminalOpen(value: boolean) {
	open = value;
}

export function openTerminal() {
	open = true;
}
