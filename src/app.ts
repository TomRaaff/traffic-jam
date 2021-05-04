import Direction from './types/Direction.enum';
import Type from './types/Type.enum';
import GridItem from './types/GridItem';
import Collection from './types/util/Collection';
import Either from './types/util/Either';
import Violation from './types/Violation.enum';
import Car from './types/Car';
import { Movement } from './types/Movement';

// export function determineType(classList: string[]): Type {
// 	if (classList.includes(Type.PLAYER)) return Type.PLAYER;
// 	if (classList.includes(Type.CAR)) return Type.CAR;
// 	return Type.FREE;
// }
//
// function setType(id: number, type: Type): (a: GridItem) => GridItem {
// 	return (gridItem: GridItem) => {
// 		if (gridItem.id === id) {
// 			return { id, type };
// 		}
// 		return gridItem;
// 	};
// }
//
// function nextLocation(locationId: number, direction: Direction, grid: Collection<GridItem>): Either<Violation, number> {
// 	const nextLocationId = locationId + movement[direction];
// 	return grid.findOne({ id: nextLocationId })
// 			   .toEither(Violation.GRID_BOUNDRY_REACHED)
// 			   .flatMap((gridItem) => ((gridItem.type === Type.FREE) ? Either.of(gridItem.id) : Either.ofLeft(Violation.BLOCKED_BY_CAR)));
// }
//
// export type MoveItemInput = {
// 	type: Type;
// 	locationId: number;
// 	direction: Direction;
// 	currentGrid: Collection<GridItem>;
// }
//
// export function moveItem(input: MoveItemInput): Either<Violation, Collection<GridItem>> {
// 	const {
// 		locationId,
// 		direction,
// 		currentGrid
// 	} = input;
// 	return nextLocation(locationId, direction, currentGrid)
// 			.map((location) => currentGrid.map(setType(locationId, Type.FREE))
// 										  .map(setType(location, input.type))
// 			);
// }
const areAllTrue = (acc: boolean, cur: boolean): boolean => (cur) ? acc : cur;

function isWithinBoundaries(id: number): boolean {
	if (id < 11 || id > 66) return false;
	return id.toString()
			 .split('')
			 .map(char => parseInt(char, 10))
			 .map(num => num >= 1 && num <= 6)
			 .reduce(areAllTrue, true);
}

function checkBoundaryViolation(gridIds: number[]): Either<Violation, number[]> {
	const areAllWithinBoundaries = gridIds.map(isWithinBoundaries)
										  .reduce(areAllTrue, true);
	return (areAllWithinBoundaries) ? Either.of(gridIds) : Either.ofLeft(Violation.GRID_BOUNDRY_REACHED);
}

function determineNextLocation(car: Car, direction: Direction): Either<Violation, number[]> {
	const movement = {
		up: -10,
		right: 1,
		left: -1,
		down: 10,
	};
	return Either.of(car.coordinates
						.map((gridId) => gridId + movement[direction])
						.toArray());
}

export function moveCar(movement: Movement, cars: Collection<Car>): Either<Violation, Collection<Car>> {
	const [car] = cars.find({ id: movement.carId });
	return determineNextLocation(car, movement.direction)
			.flatMap(checkBoundaryViolation)
			.map((gridIds) => car.copy({ gridIds }))
			.map((newCar) => cars.update({ id: newCar.id }, newCar));
}

export function gridToCars(grid: Collection<GridItem>): Collection<Car> {
	const cars = Collection.empty<Car>();
	grid.forEach(gridItem => {
		// make sure the cars contain the right id's
		cars.findOne({ id: gridItem.carId! })
				// Either a new car (L) or the found result(R)
			.toEither(new Car(gridItem.carId!,
							  gridItem.type,
							  gridItem.color!,
							  []))
			.leftOrRight(
					// if new car
					(car) => {
						car.coordinates.push(gridItem.id);
						cars.push(car);
					},
					// if existing car
					(car) => {
						car.coordinates.push(gridItem.id);
					}
			);
	});
	return cars;
}

function carsToGridItems(cars: Collection<Car>): Collection<GridItem> {
	const carGridItems = Collection.empty<GridItem>();
	cars.forEach((car: Car) => {
		const gridItems: Collection<GridItem> = car.coordinates.map((gridId) => ({
			id: gridId,
			type: car.type,
			carId: car.id,
			color: car.color
		}));
		gridItems.forEach(item => carGridItems.push(item));
	});
	return carGridItems;
}

export function carsToGrid(cars: Collection<Car>): Collection<GridItem> {
	const ids = Collection.of([
								  11, 12, 13, 14, 15, 16,
								  21, 22, 23, 24, 25, 26,
								  31, 32, 33, 34, 35, 36,
								  41, 42, 43, 44, 45, 46,
								  51, 52, 53, 54, 55, 56,
								  61, 62, 63, 64, 65, 66,
							  ]);
	const carGridItems = carsToGridItems(cars);
	return ids.map((id) => {
		return carGridItems.findOne({ id })
						   .getOrElse(() => ({ id, type: Type.FREE } as GridItem));
	});
}
