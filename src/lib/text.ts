import { sleep } from '$lib';

export async function renderLine(line: string, target: HTMLElement, classes: string) {
	// i need to iterate over each character in the line
	// so that i can slowly render the text to the screen
	const p = document.createElement('p');
	p.className = classes;

	for (let i = 0; i <= line.length; i++) {
		await sleep(8);
		p.textContent = line.slice(0, i);
		target.appendChild(p);
	}
}

export async function renderLines(lines: string[], target: HTMLElement) {
	for (const line of lines) {
		await renderLine(line, target, 'pb-4');
		await sleep(400);
	}
}
