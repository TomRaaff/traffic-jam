import GridItem from './types/GridItem';
import Collection from './types/util/Collection';
import Type from './types/Type.enum';
import Car from './types/Car';
import Color from './types/Color.enum';
import { addChildren, createElement, select } from './domApi';

const ids = [
	11, 12, 13, 14, 15,
	21, 22, 23, 24, 25,
	31, 32, 33, 34, 35,
	41, 42, 43, 44, 45,
	51, 52, 53, 54, 55,
];

const level0 = Collection.of<Car>([
									  new Car(0, Type.PLAYER, Color.RED, [32], 'horizontal'),
									  new Car(1, Type.CAR, Color.BLUE, [24, 34]),
									  new Car(2, Type.CAR, Color.YELLOW, [53, 54, 55]),
									  new Car(3, Type.CAR, Color.GREEN, [42, 52]),
								  ]);

const levels = [
	level0,
];

function carsToGridItems(level: Collection<Car>): Collection<GridItem> {
	const carGridItems = Collection.empty<GridItem>();
	level.forEach((car: Car) => {
		const gridItems = car.ids.map((id) => ({ id, type: car.type, car } as GridItem));
		carGridItems.push(...gridItems);
	});
	return carGridItems;
}

function createLevel(level: number): GridItem[] {
	const carGridItems = carsToGridItems(levels[level]);
	return ids.map((id) => carGridItems.findOne({ id })
									   		   .getOrElse(
									   				   () => ({ id, type: Type.FREE } as GridItem),
													   (gridItem) => gridItem as GridItem,
									   		   ));
}

function toHTMLDiv(gridItem: GridItem): HTMLElement {
	const classes: string[] = [gridItem.type];
	if (gridItem?.car) classes.push(gridItem.car.color);
	const element = createElement('div', classes);
	element.id = gridItem.id.toString();
	return element;
}

export default function buildLevel(index: number): void {
	select('section.car-grid')
			.getOrElse(
				() => console.error('could not find the car grid'),
				(gridContainer) => addChildren(gridContainer, createLevel(index).map(toHTMLDiv)),
			);
}
