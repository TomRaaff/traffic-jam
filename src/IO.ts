import Direction from './types/Direction.enum';
import Collection from './types/util/Collection';
import { addChildren, createElement, focus, getClassList, hasFocus, removeFocus, select, selectAll } from './domApi';
import Car from './types/Car';
import { buildLevel } from './levels';
import { putCarsOnTheGrid } from './app';
import GridItem from './types/GridItem';
import Type from './types/Type.enum';
import Color from './types/Color.enum';

// function isChanged(element: HTMLElement, type: Type): boolean {
// 	return determineType(getClassList(element)) !== type;
// }
//
// function renderGrid(grid: Collection<GridItem>): void {
// 	grid.forEach((gridItem) => {
// 		const selector = `[id="${gridItem.id}"]`;
// 		select(selector)
// 				.map((element) => {
// 						 if (isChanged(element, gridItem.type)) {
// 							 removeArrows(element);
// 							 element.removeEventListener('mouseover', () => addArrows(element));
// 							 element.removeEventListener('mouseleave', () => removeArrows(element));
// 							 clearClasses(element);
//
// 							 element.classList.add(gridItem.type);
// 							 if (gridItem.type !== Type.FREE) {
// 								 element.addEventListener('mouseover', () => addArrows(element));
// 								 element.addEventListener('mouseleave', () => removeArrows(element));
// 							 }
// 						 }
// 						 return element;
// 					 },
// 				);
// 	});
// }
//
// function renderViolation(violation: Violation): void {
// 	select('.popup')
// 			.map((element) => {
// 					 element.classList.add('show');
// 					 element.innerText = violation;
// 					 setTimeout(
// 							 () => {
// 								 element.classList.remove('show');
// 							 },
// 							 3000,
// 					 );
// 				 },
// 			);
// }
//
// function getArrowParent(arrowElement: HTMLElement): HTMLElement {
// 	return arrowElement.parentElement!.parentElement!;
// }
//
// function getGridItemId(element: HTMLElement): number {
// 	const idString = element.id;
// 	return parseInt(idString, 10);
// }

// function readGrid(): Collection<GridItem> {
// 	return selectAll('div.free, div.car, div.player')
// 			.map((item) => (
// 					{
// 						id: parseInt(item.id, 10),
// 						type: determineType(getClassList(item)),
// 					} as GridItem
// 			));
// }

function readCars(): Collection<Car> {
	const cars = Collection.empty<Car>();
	selectAll('[data-car-id]')
			.map(element => toGridItem(element))
			.forEach(gridItem => {
				cars.findOne({ id: gridItem.carId! })
					.toEither(new Car(gridItem.carId!,
									  gridItem.type,
									  gridItem.color!,
									  []))
					.leftOrRight(
							(car) => {
								car.gridIds.push(gridItem.id);
								cars.push(car);
							},
							(car) => {
								car.gridIds.push(gridItem.id);
							}
					);
			});
	return cars;
}

function clickArrow(direction: Direction): (e: Event) => void {
	return (event: Event): void => {
		// const arrowParent = getArrowParent(event.currentTarget as HTMLElement);
		const cars = readCars();
		console.log(cars);
		renderGrid(putCarsOnTheGrid(cars));
		// TODO: what of the following function can I reuse?
		//		beware: by commenting out and auto-formatting, all imports are gone.
		// moveItem({
		// 			 type: determineType(getClassList(arrowParent)),
		// 			 locationId: getGridItemId(arrowParent),
		// 			 direction,
		// 			 currentGrid: readGrid(),
		// 		 })
		// 		.leftOrRight(
		// 				renderViolation,
		// 				renderGrid,
		// 		);
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

// TODO
//  create two subclasses for gridItem: CarGridItem and FreeGridItem
//  this way, you don't have to deal with the optional parameters.
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
			.map(gridContainer => addChildren(gridContainer,
											  grid.map(toHTMLDiv))
			);
}

/*
 Todo:
 - Fix that when a car moves, it should move all of its parts
 */
export default function start() {
	renderGrid(buildLevel(0))
}
