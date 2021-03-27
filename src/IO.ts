import GridItem from './types/GridItem';
import { determineType, moveItem } from './app';
import Direction from './types/Direction.enum';
import Collection from './types/util/Collection';

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

function getGridItemId(element: HTMLElement): number {
	const idString = element.parentElement!.parentElement!.id;
	return parseInt(idString, 10);
}

const clickArrow = function (direction: Direction) {
	return (event: Event) => {
		const gridId = getGridItemId((event.currentTarget as HTMLElement)!);
		moveItem(gridId, direction, Collection.of(readGrid()));
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
		const up = createElement('DIV', [Direction.UP], clickArrow(Direction.UP));
		const down = createElement('DIV', [Direction.DOWN], clickArrow(Direction.DOWN));
		const left = createElement('DIV', [Direction.LEFT], clickArrow(Direction.LEFT));
		const right = createElement('DIV', [Direction.RIGHT], clickArrow(Direction.RIGHT));
		addChildren(arrowContainerTop, [up]);
		addChildren(arrowContainerCenter, [left, right]);
		addChildren(arrowContainerBottom, [down]);
		addChildren(carElement, [arrowContainerTop, arrowContainerCenter, arrowContainerBottom]);
	}
}

function removeArrows(carElement: HTMLElement) {
	if (hasFocus(carElement)) {
		Array.from(document.querySelectorAll('.arrow-container'))
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
