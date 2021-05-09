import Direction from './types/Direction.enum';
import Type from './types/Type.enum';
import GridItem from './types/GridItem';
import Collection from './types/util/Collection';
import Either from './types/util/Either';
import Violation from './types/Violation.enum';
import Car from './types/Car';
import { Movement } from './types/Movement';

const containsBlockage = (acc: boolean, cur: boolean): boolean => (cur) ? cur : acc;
const areAllTrue = (acc: boolean, cur: boolean): boolean => (cur) ? acc : cur;

export function checkBlockingCarViolation(newCoordinates: number[], cars: Collection<Car>, carId: number): Either<Violation, number[]> {
	const isInNewCoordinates = (coordinate: number) => newCoordinates.indexOf(coordinate) != -1;

	const blocked = cars.filter((car) => car.id != carId)
						.map((car) => {
							return car.coordinates
									  .map(isInNewCoordinates)
									  .reduce(containsBlockage, false);
						})
						.reduce(containsBlockage, false);
	return (blocked) ? Either.ofLeft(Violation.BLOCKED_BY_CAR) : Either.of(newCoordinates);
}

function isWithinBoundaries(id: number): boolean {
	if (id < 11 || id > 66) return false;
	return id.toString()
			 .split('')
			 .map(char => parseInt(char, 10))
			 .map(num => num >= 1 && num <= 6)
			 .reduce(areAllTrue, true);
}

function checkBoundaryViolation(newCoordinates: number[]): Either<Violation, number[]> {
	const areAllWithinBoundaries = newCoordinates.map(isWithinBoundaries)
												 .reduce(areAllTrue, true);
	return (areAllWithinBoundaries) ? Either.of(newCoordinates) : Either.ofLeft(Violation.GRID_BOUNDRY_REACHED);
}

// todo: the columns aren't the first number in the coordinate, they are the second.
//		I'm now checking if row no. 7 has been reached.
function checkIfWinning(car: Car, newCoordinates: number[]): Either<Violation, number[]> {
	const reachedColumn7 = newCoordinates.filter((coord) => coord > 70).length > 0;
	return (reachedColumn7 && car.type === Type.PLAYER)
		   ? Either.ofLeft(Violation.YOU_WON)
		   : Either.of(newCoordinates);
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
			.flatMap(coordinates => checkIfWinning(car, coordinates))
			.flatMap(checkBoundaryViolation)
			.flatMap((coordinates) => checkBlockingCarViolation(coordinates, cars, car.id))
			.map((gridIds) => car.copy({ gridIds }))
			.map((newCar) => cars.update({ id: newCar.id }, newCar));
}

export function gridToCars(grid: Collection<GridItem>): Collection<Car> {
	const cars = Collection.empty<Car>();
	grid.forEach(gridItem => {
		const car = cars.findOne({ id: gridItem.carId! })
						.getOrElse(() => new Car(gridItem.carId!,
												 gridItem.type,
												 gridItem.color!,
												 [],
												 gridItem.alignment));
		car.coordinates.push(gridItem.id);
		if (!cars.contains({ id: car.id })) cars.push(car);
	});
	return cars;
}

function carsToGridItems(cars: Collection<Car>): Collection<GridItem> {
	const carGridItems = Collection.empty<GridItem>();
	cars.forEach((car: Car) => {
		const gridItems: Collection<GridItem> = car.coordinates.map((gridId) => GridItem.build({
			id: gridId,
			type: car.type,
			carId: car.id,
			color: car.color,
			alignment: car.alignment!
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
						   .getOrElse(() => GridItem.build({ id, type: Type.FREE }));
	});
}
