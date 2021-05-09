import Direction from './types/Direction.enum';
import Collection from './types/util/Collection';
import { addChildren, createElement, focus, getClassList, hasFocus, removeChildren, removeFocus, select, selectAll } from './domApi';
import Car from './types/Car';
import { buildLevel } from './levels';
import { carsToGrid, gridToCars, moveCar } from './app';
import GridItem, { CarGridItem, FreeGridItem } from './types/GridItem';
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

function findCarElement(arrowElement: HTMLElement): HTMLElement {
	return arrowElement.parentElement!.parentElement!;
}

function readCars(): Collection<Car> {
	const grid = selectAll('[data-car-id]').map(toGridItem);
	return gridToCars(grid);
}

function clickArrow(direction: Direction): (e: Event) => void {
	return ({ currentTarget }): void => {
		const currentGridItem = toGridItem(findCarElement(currentTarget as HTMLElement));
		const movement = { carId: currentGridItem.carId, direction } as Movement;
		moveCar(movement, readCars())
				.map(carsToGrid)
				.leftOrRight(
						renderViolation,
						renderGrid
				);
	};
}

(window as any).addArrows = (carElement: HTMLElement, alignment: 'horizontal' | 'vertical') => {
	if (!hasFocus(carElement)) {
		focus(carElement);
		const children = [];
		if (alignment === 'horizontal') {
			const arrowContainerCenter = createElement('DIV', ['arrow-container', 'center']);
			const left = createElement('DIV', [Direction.LEFT], clickArrow(Direction.LEFT));
			const right = createElement('DIV', [Direction.RIGHT], clickArrow(Direction.RIGHT));
			addChildren(arrowContainerCenter, [left, right]);
			children.push(arrowContainerCenter);
		}
		if (alignment === 'vertical') {
			const arrowContainerTop = createElement('DIV', ['arrow-container', 'top']);
			const arrowContainerBottom = createElement('DIV', ['arrow-container', 'bottom']);
			const up = createElement('DIV', [Direction.UP], clickArrow(Direction.UP));
			const down = createElement('DIV', [Direction.DOWN], clickArrow(Direction.DOWN));
			addChildren(arrowContainerTop, [up]);
			addChildren(arrowContainerBottom, [down]);
			children.push(arrowContainerTop, arrowContainerBottom);
		}
		addChildren(carElement, children);
	}
}

(window as any).removeArrows = (carElement: HTMLElement) => {
	if (hasFocus(carElement)) {
		selectAll('.arrow-container')
				.forEach((container) => {
					carElement.removeChild(container);
				});
		removeFocus(carElement);
	}
}

/**
 * reads from div-elements that look like this:
 * <div class='free' id='number'>
 * or
 * <div class='car|player color' id='number' data-car-id='number' data-alignment='horizontal|vertical'>
 * @param element: HTMLElement
 */
export function toGridItem(element: HTMLElement): GridItem {
	const classes = getClassList(element);
	if (classes[0] === Type.FREE) {
		return GridItem.build({
								  id: parseInt(element.id, 10),
								  type: classes[0] as Type,
							  } as FreeGridItem);
	} else {
		return GridItem.build({
								  id: parseInt(element.id, 10),
								  type: classes[0] as Type,
								  color: classes[1] as Color,
								  carId: parseInt(element.dataset.carId!, 10),
								  alignment: element.dataset.alignment!
							  } as CarGridItem);
	}
}

function createFreeDiv(gridItem: FreeGridItem): string {
	return `<div class='${gridItem.type}' id="${gridItem.id}">`
}

// Rogiers JS magic
// function tag(template: string[], ...values: any[]) {
// 	console.log({template, values});
// }

function createCarDiv(gridItem: CarGridItem): string {
	const { type, color, id, carId, alignment } = gridItem;
	return `<div class='${type} ${color}' 
				 id='${id}' 
				 data-car-id='${carId}' 
				 data-alignment='${alignment}'
				 onmouseover="addArrows(this, '${alignment}')"
				 onmouseleave="removeArrows(this)">`;
}

function toDivString(gridItem: GridItem): string {
	const isFree = gridItem.type === Type.FREE;
	return (isFree) ? createFreeDiv(gridItem as FreeGridItem) : createCarDiv(gridItem as CarGridItem);
}

function renderGrid(grid: Collection<GridItem>): void {
	select('section.car-grid')
			.map(removeChildren)
			.map(gridContainer => grid.map(toDivString)
									  .map(el => gridContainer.insertAdjacentHTML('beforeend', el)));
}

export default function start() {
	// Rogiers JS magic
	// const iets = 3;
	// const verhaal = 'een verhaal';
	// tag`whuttufuk...? ${iets} nog iets anders ${verhaal}`;
	renderGrid(buildLevel(0));
}
