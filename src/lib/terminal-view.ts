export function shouldCaptureTerminalShortcut(
	event: KeyboardEvent,
	isOpen: boolean,
	fullscreen: boolean,
	pathname: string
): boolean {
	if (isOpen || fullscreen) return false;
	if (pathname === '/terminal') return false;
	if (event.metaKey || event.ctrlKey || event.altKey) return false;
	if (event.key.length !== 1) return false;

	const target = event.target as HTMLElement;
	if (
		target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		target instanceof HTMLSelectElement ||
		target.isContentEditable
	)
		return false;

	return true;
}

export function isIncantationLine(line: string): boolean {
	return line.includes('→ "') || line.includes('translation: "');
}
