import { GridItem } from './types/DataTypes';
import { determineType, moveItem } from './app';

// todo: fix eslint vs intellij formatter
function readGrid(): GridItem[] {
	return Array.from(document.querySelectorAll('[data-type="grid-item"]'))
				.map((item: unknown) => item as HTMLDivElement)
				.map((item) => {
					const classes = Array.from(item.classList.values());
					const gridItem = {
						id: parseInt(item.id, 10),
						type: determineType(classes),
					} as GridItem;
					return gridItem;
				});
}

const clickArrow = function (direction: 'up' | 'down' | 'left' | 'right') {
	return (event: Event) => {
		const gridId = (event.currentTarget as HTMLElement)?.parentNode?.parentElement?.id;
		moveItem(direction, gridId, readGrid());
		// render(newGrid);
	};
};

function createElement(type: string, classes: string[], clickListener?: (ev: MouseEvent) => any): HTMLElement {
	const element = document.createElement(type.toUpperCase());
	classes.forEach((c) => element.classList.add(c));
	if (clickListener) {
		element.addEventListener('click', clickListener);
	}
	return element;
}

function hasFocus(element: HTMLElement): boolean {
	return element.classList.contains('focus');
}
function focus(element: HTMLElement): void {
	element.classList.add('focus');
}
function removeFocus(element: HTMLElement): void {
	element.classList.remove('focus');
}

function addChildren(parent: HTMLElement, children: HTMLElement[]): void {
	children.forEach((child) => {
		parent.appendChild(child);
	});
}

function addArrows(carElement: HTMLElement) {
	if (!hasFocus(carElement)) {
		focus(carElement);
		const arrowContainerTop = createElement('DIV', ['arrow-container', 'top']);
		const arrowContainerCenter = createElement('DIV', ['arrow-container', 'center']);
		const arrowContainerBottom = createElement('DIV', ['arrow-container', 'bottom']);
		const up = createElement('DIV', ['up'], clickArrow('up'));
		const down = createElement('DIV', ['down'], clickArrow('down'));
		const left = createElement('DIV', ['left'], clickArrow('left'));
		const right = createElement('DIV', ['right'], clickArrow('right'));
		addChildren(arrowContainerTop, [up]);
		addChildren(arrowContainerCenter, [left, right]);
		addChildren(arrowContainerBottom, [down]);
		addChildren(carElement, [arrowContainerTop, arrowContainerCenter, arrowContainerBottom]);
	}
}

function removeArrows(carElement: HTMLElement) {
	if (hasFocus(carElement)) {
		Array.from(document.getElementsByClassName('arrow-container'))
			 .forEach((container) => {
				 carElement.removeChild(container);
			 });
		removeFocus(carElement);
	}
}

export default function start() {
	// todo: write a custom DOM-api. Like the focus functions.
	document.querySelectorAll('.car, .player')
			.forEach((carElement) => {
				carElement.addEventListener('mouseover', () => addArrows(carElement as HTMLElement));
				carElement.addEventListener('mouseleave', () => removeArrows(carElement as HTMLElement));
			});
}
