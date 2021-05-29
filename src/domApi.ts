import { Maybe, Collection } from 'tr-utilities-lib';

export function select(cssSelector: string): Maybe<HTMLElement> {
	return Maybe.of(document.querySelector(cssSelector) as HTMLElement);
}

export function selectAll(cssSelector: string): Collection<HTMLElement> {
	return Collection.of(Array.from(document.querySelectorAll(cssSelector)));
}

export function getClassList(element: HTMLElement): string[] {
	return Array.from(element.classList.values());
}

export function clearClasses(element: HTMLElement): boolean {
	try {
		// eslint-disable-next-line no-param-reassign
		element.className = '';
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
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
	element.classList.add(...classes);
	if (clickListener) {
		element.addEventListener('click', clickListener);
	}
	return element;
}

export function removeChildren(parent: HTMLElement): HTMLElement {
	while(parent.firstChild && parent.lastChild) {
		parent.removeChild(parent.lastChild);
	}
	return parent;
}

export function addChildren(parent: HTMLElement, children: HTMLElement[] | Collection<HTMLElement>): void {
	children.forEach((child) => {
		parent.appendChild(child);
	});
}
