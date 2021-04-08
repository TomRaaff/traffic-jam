import GridItem from './types/GridItem';
import Collection from './types/util/Collection';
import Type from './types/Type.enum';
import Car from './types/Car';
import Color from './types/Color.enum';
import { addChildren, createElement, select } from './domApi';

const ids = [
	11, 12, 13, 14, 15, 16,
	21, 22, 23, 24, 25, 26,
	31, 32, 33, 34, 35, 36,
	41, 42, 43, 44, 45, 46,
	51, 52, 53, 54, 55, 56,
	61, 62, 63, 64, 65, 66,
];

const level0 = Collection.of<Car>([
									  new Car(0, Type.PLAYER, Color.RED, [31, 32]),
									  new Car(1, Type.CAR, Color.BLUE, [11, 21]),
									  new Car(2, Type.CAR, Color.YELLOW, [14, 15, 16]),
									  new Car(3, Type.CAR, Color.GREEN, [24, 34]),
									  new Car(4, Type.CAR, Color.PINK, [35, 45]),
									  new Car(5, Type.CAR, Color.GRAPEFRUIT, [26, 36, 46]),
									  new Car(6, Type.CAR, Color.ORANGE, [41, 42, 43]),
									  new Car(7, Type.CAR, Color.LIME, [55, 56]),
									  new Car(8, Type.CAR, Color.ORANGE, [61, 62]),
									  new Car(9, Type.CAR, Color.PURPLE, [53, 63]),
									  new Car(10, Type.CAR, Color.MARINE, [64, 65]),
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
													   (gridItem) => gridItem,
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
