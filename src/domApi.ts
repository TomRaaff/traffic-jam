export function select(cssSelector: string): HTMLElement | null {
	return document.querySelector(cssSelector) as HTMLElement;
}

export function selectAll(cssSelector: string): HTMLElement[] {
	return Array.from(document.querySelectorAll(cssSelector));
}

export function getClassList(element: HTMLElement): string[] {
	return Array.from(element.classList.values());
}

export function hasFocus(element: HTMLElement): boolean {
	return element.classList.contains('focus');
}

export function focus(element: HTMLElement): void {
	element.classList.add('focus');
}

export function removeFocus(element: HTMLElement): void {
	element.classList.remove('focus');
}

export function createElement(type: string, classes: string[], clickListener?: (ev: MouseEvent) => any): HTMLElement {
	const element = document.createElement(type.toUpperCase());
	classes.forEach((c) => element.classList.add(c));
	if (clickListener) {
		element.addEventListener('click', clickListener);
	}
	return element;
}

export function addChildren(parent: HTMLElement, children: HTMLElement[]): void {
	children.forEach((child) => {
		parent.appendChild(child);
	});
}
