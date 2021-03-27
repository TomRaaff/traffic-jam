import GridItem from './types/GridItem';
import { determineType, moveItem } from './app';
import Direction from './types/Direction.enum';
import Collection from './types/util/Collection';
import { addChildren, clearClasses, createElement, focus, getClassList, hasFocus, removeFocus, select, selectAll } from './domApi';
import Type from './types/Type.enum';

// todo: fix eslint vs intellij formatter
function isChanged(element: HTMLElement, type: Type): boolean {
	return determineType(getClassList(element)) !== type;
}

function render(grid: Collection<GridItem>): void {
	grid.forEach((gridItem) => {
		const selector = `[id="${gridItem.id}"]`;
		select(selector).getOrElse(
			() => console.error('could not find element for selector: ', selector),
			(element) => {
				if (isChanged(element, gridItem.type)) {
					removeArrows(element);
					element.removeEventListener('mouseover', () => addArrows(element));
					element.removeEventListener('mouseleave', () => removeArrows(element));
					clearClasses(element);

					element.classList.add(gridItem.type);
					if (gridItem.type !== Type.FREE) {
						element.addEventListener('mouseover', () => addArrows(element));
						element.addEventListener('mouseleave', () => removeArrows(element));
					}
				}
				return element;
			},
		);
	});
}

function getArrowParent(arrowElement: HTMLElement): HTMLElement {
	return arrowElement.parentElement!.parentElement!;
}

function getGridItemId(element: HTMLElement): number {
	const idString = element.id;
	return parseInt(idString, 10);
}

function readGrid(): GridItem[] {
	return selectAll('[data-type="grid-item"]')
			.map((item) => (
					{
						id: parseInt(item.id, 10),
						type: determineType(getClassList(item)),
					} as GridItem
			));
}

const clickArrow = function (direction: Direction): (e: Event) => void {
	return (event: Event): void => {
		const arrowParent = getArrowParent(event.currentTarget as HTMLElement);
		moveItem({
					 type: determineType(getClassList(arrowParent)),
					 locationId: getGridItemId(arrowParent),
					 direction,
					 currentGrid: Collection.of(readGrid()),
				 }).leftOrRight(
			(violation) => console.log(violation),
			(newGrid) => render(newGrid),
		);
	};
};

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
		selectAll('.arrow-container')
				.forEach((container) => {
					carElement.removeChild(container);
				});
		removeFocus(carElement);
	}
}

export default function start() {
	selectAll('.car, .player')
			.forEach((carElement) => {
				carElement.addEventListener('mouseover', () => addArrows(carElement));
				carElement.addEventListener('mouseleave', () => removeArrows(carElement));
			});
}
