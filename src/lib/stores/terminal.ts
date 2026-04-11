import { writable } from 'svelte/store';
export const terminalOpen = writable(false);
// Increment to trigger the terminal to open from outside the component
export const terminalOpenTrigger = writable(0);
