type TerminalShortcutContext = {
	event: KeyboardEvent;
	isOpen: boolean;
	fullscreen: boolean;
	pathname: string;
};

export function shouldCaptureTerminalShortcut({
	event,
	isOpen,
	fullscreen,
	pathname
}: TerminalShortcutContext): boolean {
	if (isOpen || fullscreen) return false;
	if (pathname === '/terminal') return false;
	if (event.metaKey || event.ctrlKey || event.altKey) return false;
	if (event.key !== '`' && event.key !== '~') return false;

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

export function terminalInputAction(
	key: string
): 'submit' | 'close' | 'history-up' | 'history-down' | 'tab-complete' | null {
	if (key === 'Enter') return 'submit';
	if (key === 'Escape') return 'close';
	if (key === 'ArrowUp') return 'history-up';
	if (key === 'ArrowDown') return 'history-down';
	if (key === 'Tab') return 'tab-complete';
	return null;
}

export function isIncantationLine(line: string): boolean {
	return line.includes('→ "') || line.includes('translation: "');
}
