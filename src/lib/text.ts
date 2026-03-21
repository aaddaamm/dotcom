import { type Element } from '$lib/types';

const CHAR_DELAY = 2;
const BATCH_DELAY = 4;

function waitFrame(): Promise<void> {
	return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function waitMs(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function renderText(text: string, node: HTMLElement, target: HTMLElement) {
	let lastFrame = performance.now();
	for (let i = 0; i < text.length; i++) {
		const now = performance.now();
		if (now - lastFrame >= CHAR_DELAY) {
			await waitFrame();
			lastFrame = performance.now();
		}
		node.appendChild(document.createTextNode(text[i]));
		target.appendChild(node);
	}
}

function setElementProps(el: HTMLElement, props: Record<string, string>) {
	for (const [key, value] of Object.entries(props)) {
		el.setAttribute(key, value);
	}
}

export async function renderElement(node: Element, parent: HTMLElement) {
	const el = document.createElement(node.type);

	if (node.props) {
		setElementProps(el, node.props);
	}

	const hasArrayForChildren = Array.isArray(node.children);

	if (hasArrayForChildren) {
		for (const child of node.children) {
			const isString = typeof child === 'string';
			if (isString) {
				await renderText(child, el, parent);
				continue;
			}
			await renderElement(child, el);
		}
		return;
	}

	const hasElementForChildren = typeof node.children === 'object';
	if (hasElementForChildren) {
		await renderElement(node.children as Element, el);
		parent.appendChild(el);
		return;
	}

	const hasStringForChildren = typeof node.children === 'string';
	if (hasStringForChildren) {
		await renderText(node.children as string, el, parent);
		return;
	}
}

export async function renderElements(nodes: Element[], parent: HTMLElement) {
	for (const node of nodes) {
		await renderElement(node, parent);
		await waitMs(BATCH_DELAY);
	}
}
