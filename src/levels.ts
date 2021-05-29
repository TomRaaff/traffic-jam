import { Collection } from 'tr-utilities-lib';
import Type from './types/Type.enum';
import Car from './types/Car';
import Color from './types/Color.enum';
import GridItem from './types/GridItem';
import { carsToGrid } from './app';

/*
	grid id's:
	 11, 12, 13, 14, 15, 16,
	 21, 22, 23, 24, 25, 26,
	 31, 32, 33, 34, 35, 36,
	 41, 42, 43, 44, 45, 46,
	 51, 52, 53, 54, 55, 56,
	 61, 62, 63, 64, 65, 66,
 */
const level0 = Collection.of<Car>([
									  new Car(1, Type.PLAYER, Color.RED, [31, 32]),
									  new Car(2, Type.CAR, Color.BLUE, [11, 21]),
									  new Car(3, Type.CAR, Color.YELLOW, [14, 15, 16]),
									  new Car(4, Type.CAR, Color.GREEN, [24, 34]),
									  new Car(5, Type.CAR, Color.PINK, [35, 45]),
									  new Car(6, Type.CAR, Color.GRAPEFRUIT, [26, 36, 46]),
									  new Car(7, Type.CAR, Color.ORANGE, [41, 42, 43]),
									  new Car(8, Type.CAR, Color.LIME, [55, 56]),
									  new Car(9, Type.CAR, Color.YELLOW, [61, 62]),
									  new Car(10, Type.CAR, Color.PURPLE, [53, 63]),
									  new Car(11, Type.CAR, Color.MARINE, [64, 65]),
								  ]);

// Level 10
const level1 = Collection.of<Car>([
									  new Car(1, Type.PLAYER, Color.RED, [32,33]),
									  new Car(2, Type.CAR, Color.GREEN, [11, 12]),
									  new Car(3, Type.CAR, Color.PINK, [21, 22]),
									  new Car(4, Type.CAR, Color.ORANGE, [13, 23]),
									  new Car(5, Type.CAR, Color.BLUE, [15, 16]),
									  new Car(6, Type.CAR, Color.PURPLE, [31, 41, 51]),
									  new Car(7, Type.CAR, Color.BLUE, [42, 43, 44]),
									  new Car(8, Type.CAR, Color.YELLOW, [26, 36, 46]),
									  new Car(9, Type.CAR, Color.MARINE, [61, 62]),
									  new Car(10, Type.CAR, Color.GRAPEFRUIT, [54, 64]),
									  new Car(11, Type.CAR, Color.LIME, [55, 56]),
									  new Car(12, Type.CAR, Color.PINK, [65, 66]),
								  ]);
// Level 19
const level2 = Collection.of<Car>([
									  new Car(1, Type.PLAYER, Color.RED, [33, 34]),
									  new Car(2, Type.CAR, Color.GREEN, [13, 23]),
									  new Car(3, Type.CAR, Color.ORANGE, [14, 15]),
									  new Car(4, Type.CAR, Color.PINK, [32, 42]),
									  new Car(5, Type.CAR, Color.BLUE, [25, 35]),
									  new Car(6, Type.CAR, Color.PURPLE, [43, 44]),
									  new Car(7, Type.CAR, Color.LIME, [45, 55]),
									  new Car(8, Type.CAR, Color.YELLOW, [52, 53, 54]),
								  ]);

// Level 20
const level3 = Collection.of<Car>([
									  new Car(1, Type.PLAYER, Color.RED, [31,32]),
									  new Car(2, Type.CAR, Color.GREEN, [11, 21]),
									  new Car(3, Type.CAR, Color.ORANGE, [22, 23]),
									  new Car(4, Type.CAR, Color.YELLOW, [14, 15, 16]),
									  new Car(5, Type.CAR, Color.BLUE, [24, 34]),
									  new Car(6, Type.CAR, Color.PINK, [33, 43]),
									  new Car(7, Type.CAR, Color.PURPLE, [53, 63]),
									  new Car(8, Type.CAR, Color.LIME, [54, 55]),
									  new Car(9, Type.CAR, Color.PURPLE, [36, 46, 56]),
									  new Car(10, Type.CAR, Color.GRAPEFRUIT, [64, 65, 66]),
								  ]);

// Level 30
const level4 = Collection.of<Car>([
									  new Car(1, Type.PLAYER, Color.RED, [32, 33]),
									  new Car(2, Type.CAR, Color.YELLOW, [11, 21, 31]),
									  new Car(3, Type.CAR, Color.GREEN, [13, 23]),
									  new Car(4, Type.CAR, Color.PURPLE, [14, 15, 16]),
									  new Car(5, Type.CAR, Color.ORANGE, [24, 34]),
									  new Car(6, Type.CAR, Color.BLUE, [41, 42]),
									  new Car(7, Type.CAR, Color.PINK, [43, 44]),
									  new Car(8, Type.CAR, Color.GRAPEFRUIT, [61, 62]),
									  new Car(9, Type.CAR, Color.LIME, [63, 64]),
									  new Car(10, Type.CAR, Color.MARINE, [46, 56, 66]),
								  ]);

// Level 31
const level5 = Collection.of<Car>([
									  new Car(1, Type.PLAYER, Color.RED, [32, 33]),
									  new Car(2, Type.CAR, Color.LIME, [11, 12]),
									  new Car(3, Type.CAR, Color.YELLOW, [14, 15, 16]),
									  new Car(4, Type.CAR, Color.ORANGE, [24, 34]),
									  new Car(5, Type.CAR, Color.MARINE, [25, 26]),
									  new Car(6, Type.CAR, Color.PINK, [31, 41]),
									  new Car(7, Type.CAR, Color.GREEN, [51, 52]),
									  new Car(8, Type.CAR, Color.BLUE, [43, 53, 63]),
									  new Car(9, Type.CAR, Color.PURPLE, [44, 45]),
									  new Car(10, Type.CAR, Color.GRAPEFRUIT, [36, 46, 56]),
									  new Car(11, Type.CAR, Color.PINK, [64, 65, 66]),
								  ]);


export const levels = [
	level0, level1, level2, level3, level4, level5
];

export function buildLevel(level: number): Collection<GridItem> {
	return carsToGrid(levels[level]);
}
