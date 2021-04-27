import { beforeEach, describe, expect, it, } from '@jest/globals';
import { moveCar } from './app';
import Direction from './types/Direction.enum';
// import GridItem from './types/GridItem';
import Type from './types/Type.enum';
import Collection from './types/util/Collection';
// import Violation from './types/Violation.enum';
import Car from './types/Car';
import Color from './types/Color.enum';

// let defaultGrid: Collection<GridItem>;
beforeEach(() => {
	// const gridItems: GridItem[] = [
	// 	{ id: 11, type: Type.FREE },
	// 	{ id: 12, type: Type.FREE },
	// 	{ id: 13, type: Type.FREE },
	// 	{ id: 14, type: Type.FREE },
	// 	{ id: 15, type: Type.FREE },
	// 	{ id: 16, type: Type.FREE },
	// 	{ id: 21, type: Type.FREE },
	// 	{ id: 22, type: Type.FREE },
	// 	{ id: 23, type: Type.FREE },
	// 	{ id: 24, type: Type.FREE },
	// 	{ id: 25, type: Type.FREE },
	// 	{ id: 26, type: Type.FREE },
	// 	{ id: 31, type: Type.FREE },
	// 	{ id: 32, type: Type.FREE },
	// 	{ id: 33, type: Type.FREE },
	// 	{ id: 34, type: Type.FREE },
	// 	{ id: 35, type: Type.FREE },
	// 	{ id: 36, type: Type.FREE },
	// 	{ id: 41, type: Type.FREE },
	// 	{ id: 42, type: Type.FREE },
	// 	{ id: 43, type: Type.FREE },
	// 	{ id: 44, type: Type.FREE },
	// 	{ id: 45, type: Type.FREE },
	// 	{ id: 46, type: Type.FREE },
	// 	{ id: 51, type: Type.FREE },
	// 	{ id: 52, type: Type.FREE },
	// 	{ id: 53, type: Type.FREE },
	// 	{ id: 54, type: Type.FREE },
	// 	{ id: 55, type: Type.FREE },
	// 	{ id: 56, type: Type.FREE },
	// 	{ id: 61, type: Type.FREE },
	// 	{ id: 62, type: Type.FREE },
	// 	{ id: 63, type: Type.FREE },
	// 	{ id: 64, type: Type.FREE },
	// 	{ id: 65, type: Type.FREE },
	// 	{ id: 66, type: Type.FREE },
	// ];
	// defaultGrid = Collection.of(gridItems);
});

// function setType(id: number, type: Type): (a: GridItem) => GridItem {
// 	return (gridItem: GridItem) => {
// 		if (gridItem.id === id) {
// 			return { id, type };
// 		}
// 		return gridItem;
// 	};
// }

describe('App', () => {
	// describe('determineType', () => {
	// 	it('should return player', () => {
	// 		const result = determineType([Type.PLAYER]);
	// 		expect(result).toBe(Type.PLAYER);
	// 	});
	// 	it('should return car', () => {
	// 		const result = determineType([Type.CAR]);
	// 		expect(result).toBe(Type.CAR);
	// 	});
	// 	it('should return free', () => {
	// 		const result = determineType([Type.FREE]);
	// 		expect(result).toBe(Type.FREE);
	// 	});
	// });

	describe('MoveCar', () => {
		let cars: Collection<Car>;
		beforeEach(() => {
			cars = Collection.of([
									 new Car(1, Type.CAR, Color.BLUE, [11, 12]),
									 new Car(2, Type.CAR, Color.RED, [22, 23, 24]),
									 new Car(3, Type.CAR, Color.GREEN, [25, 35, 45]),
									 new Car(4, Type.CAR, Color.YELLOW, [53, 63]),
								 ]);
		});

		describe('should move a car', () => {
			it('to the left', () => {
				// arrange
				const [car] = cars.find({id: 2});
				const movement = { carId: car.id, direction: Direction.LEFT };
				const expected = [21, 22, 23];
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => fail('Violation occured' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:2});
							expect(movingCar.gridIds.toArray()).toEqual(expected);
						}
				)
			});
			it('to the right', () => {
				// arrange
				const [car] = cars.find({id: 1});
				const movement = { carId: car.id, direction: Direction.RIGHT };
				const expected = [12, 13];
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => fail('Violation occured' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:1});
							expect(movingCar.gridIds.toArray()).toEqual(expected);
						}
				)
			});
			it('up', () => {
				// arrange
				const [car] = cars.find({id: 4});
				const movement = { carId: car.id, direction: Direction.UP };
				const expected = [43, 53];
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => fail('Violation occured' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:4});
							expect(movingCar.gridIds.toArray()).toEqual(expected);
						}
				)
			});
			it('down', () => {
				// arrange
				const [car] = cars.find({id: 3});
				const movement = { carId: car.id, direction: Direction.DOWN };
				const expected = [35, 45, 55];
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => fail('Violation occured' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:3});
							expect(movingCar.gridIds.toArray()).toEqual(expected);
						}
				)
			});
		});
	});

	// describe('MoveItem', () => {
	// 	describe('should move the a car', () => {
	// 		it('to the left', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			const expected = inputGrid.map(setType(currentLocation, Type.FREE))
	// 									  .map(setType(21, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.LEFT,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toBeFalsy(),
	// 				(newGrid) => expect(newGrid).toEqual(expected),
	// 			);
	// 		});
	// 		it('to the right', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			const expected = inputGrid.map(setType(currentLocation, Type.FREE))
	// 									  .map(setType(23, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.RIGHT,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toBeFalsy(),
	// 				(newGrid) => expect(newGrid).toEqual(expected),
	// 			);
	// 		});
	// 		it('up', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			const expected = inputGrid.map(setType(currentLocation, Type.FREE))
	// 									  .map(setType(12, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.UP,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toBeFalsy(),
	// 				(newGrid) => expect(newGrid).toEqual(expected),
	// 			);
	// 		});
	// 		it('down', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			const expected = inputGrid.map(setType(currentLocation, Type.FREE))
	// 									  .map(setType(32, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.DOWN,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toBeFalsy(),
	// 				(newGrid) => expect(newGrid).toEqual(expected),
	// 			);
	// 		});
	// 	});
	//
	// 	describe('should not move when there is a car blockade', () => {
	// 		it('on the right', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER))
	// 										 .map(setType(currentLocation + 1, Type.CAR));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.RIGHT,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.BLOCKED_BY_CAR),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 		it('on the left', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER))
	// 										 .map(setType(currentLocation - 1, Type.CAR));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.LEFT,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.BLOCKED_BY_CAR),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 		it('above', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER))
	// 										 .map(setType(currentLocation - 10, Type.CAR));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.UP,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.BLOCKED_BY_CAR),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 		it('below', () => {
	// 			// arrange
	// 			const currentLocation = 22;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER))
	// 										 .map(setType(currentLocation + 10, Type.CAR));
	// 			// act
	// 			const result = moveItem({
	// 										 type: Type.PLAYER,
	// 										 locationId: currentLocation,
	// 										 direction: Direction.DOWN,
	// 										 currentGrid: inputGrid,
	// 									 });
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.BLOCKED_BY_CAR),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 	});
	//
	// 	describe('should not move when the boundry has been reached', () => {
	// 		it('above', () => {
	// 			// arrange
	// 			const currentLocation = 14;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 				type: Type.PLAYER,
	// 				locationId: currentLocation,
	// 				direction: Direction.UP,
	// 				currentGrid: inputGrid,
	// 			});
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.GRID_BOUNDRY_REACHED),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 		it('below', () => {
	// 			// arrange
	// 			const currentLocation = 54;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 				type: Type.PLAYER,
	// 				locationId: currentLocation,
	// 				direction: Direction.DOWN,
	// 				currentGrid: inputGrid,
	// 			});
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.GRID_BOUNDRY_REACHED),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 		it('left', () => {
	// 			// arrange
	// 			const currentLocation = 31;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 				type: Type.PLAYER,
	// 				locationId: currentLocation,
	// 				direction: Direction.LEFT,
	// 				currentGrid: inputGrid,
	// 			});
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.GRID_BOUNDRY_REACHED),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 		it('right', () => {
	// 			// arrange
	// 			const currentLocation = 35;
	// 			const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
	// 			// act
	// 			const result = moveItem({
	// 				type: Type.PLAYER,
	// 				locationId: currentLocation,
	// 				direction: Direction.RIGHT,
	// 				currentGrid: inputGrid,
	// 			});
	// 			// assert
	// 			result.leftOrRight(
	// 				(violation) => expect(violation).toEqual(Violation.GRID_BOUNDRY_REACHED),
	// 				(grid) => expect(grid).toBeFalsy(),
	// 			);
	// 		});
	// 	});
	// });
});
