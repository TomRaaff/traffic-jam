import Direction from './types/Direction.enum';
import Collection from './types/util/Collection';
import { addChildren, createElement, focus, getClassList, hasFocus, removeChildren, removeFocus, select, selectAll } from './domApi';
import Car from './types/Car';
import { buildLevel } from './levels';
import { gridToCars, moveCar, carsToGrid } from './app';
import GridItem from './types/GridItem';
import Type from './types/Type.enum';
import Color from './types/Color.enum';
import { Movement } from './types/Movement';
import Violation from './types/Violation.enum';

function renderViolation(violation: Violation): void {
	select('.popup')
			.map((element) => {
					 element.classList.add('show');
					 element.innerText = violation;
					 setTimeout(
							 () => {
								 element.classList.remove('show');
							 },
							 3000,
					 );
				 },
			);
}

function getCarElement(arrowElement: HTMLElement): HTMLElement {
	return arrowElement.parentElement!.parentElement!;
}

function readCars(): Collection<Car> {
	const grid = selectAll('[data-car-id]')
			.map(element => toGridItem(element));
	return gridToCars(grid);
}

function clickArrow(direction: Direction): (e: Event) => void {
	return ({ currentTarget }): void => {
		const gridItem = toGridItem(getCarElement(currentTarget as HTMLElement));
		const movement = { carId: gridItem.carId, direction } as Movement;
		moveCar(movement, readCars())
				.map(carsToGrid)
				.leftOrRight(
						renderViolation,
						renderGrid
				);
	};
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
		selectAll('.arrow-container')
				.forEach((container) => {
					carElement.removeChild(container);
				});
		removeFocus(carElement);
	}
}

/*
 reads from div-elements that look like this:
 <div class='car|player color' id='number' data-car-id='number'>
 or
 <div class='free' id='number'>
 */
export function toGridItem(element: HTMLElement): GridItem {
	const classes = getClassList(element);
	return {
		id: parseInt(element.id, 10),
		type: classes[0] as Type,
		color: classes[1] as Color,
		carId: (element.dataset.carId)
			   ? parseInt(element.dataset.carId, 10)
			   : undefined
	};
}

/*
 creates a div-element that looks like this:
 <div class='car|player color' id='number' data-car-id='number'>
 or
 <div class='free' id='number'>
 */
function toHTMLDiv(gridItem: GridItem): HTMLElement {
	const classes: string[] = [gridItem.type];
	if (gridItem?.color) classes.push(gridItem.color);
	const element = createElement('div', classes);
	element.id = gridItem.id.toString();
	if (gridItem?.carId) {
		element.dataset.carId = gridItem.carId.toString();
		element.addEventListener('mouseover', () => addArrows(element));
		element.addEventListener('mouseleave', () => removeArrows(element));
	}
	return element;
}

function renderGrid(grid: Collection<GridItem>) {
	select('section.car-grid')
			.map(removeChildren)
			.map(gridContainer => addChildren(gridContainer,
											  grid.map(toHTMLDiv))
			);
}

/*
 Todo:
 - Fix that when a car moves, it should move all of its parts
 */
export default function start() {
	renderGrid(buildLevel(0));
}
