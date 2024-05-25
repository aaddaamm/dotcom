import { sleep } from '$lib';
import { type Element } from '$lib/types';

const sleep_time = 4;

export async function renderText(text: string, node: HTMLElement, target: HTMLElement) {
	for (let i = 0; i < text.length; i++) {
		await sleep(sleep_time);
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
	// i need to iterate over each character in the line
	// so that i can slowly render the text to the screen
	const el = document.createElement(node.type);
	el.className = node.props?.className || '';

	if (node.props) {
		setElementProps(el, node.props);
	}

	const hasArrayForChildren = Array.isArray(node.children);

	if (hasArrayForChildren) {
		for (const child of node.children) {
			if (typeof child === 'string') {
				await renderText(child, el, parent);
				continue;
			}
			await renderElement(child, el);
		}
		return;
	}

	const hasElementForChildren = typeof node.children === 'object';

	if (hasElementForChildren) {
		await renderElement(node, el);
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
		await sleep(sleep_time * 2);
	}
}
