import { writable } from 'svelte/store';

export const terminalOpen = writable(false);

export function openTerminal() {
	terminalOpen.set(true);
}
