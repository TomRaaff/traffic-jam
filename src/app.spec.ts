import { beforeEach, describe, expect, it, } from '@jest/globals';
import { checkBlockingCarViolation, moveCar } from './app';
import Direction from './types/Direction.enum';
import Type from './types/Type.enum';
import Collection from './types/util/Collection';
import Car from './types/Car';
import Color from './types/Color.enum';
import Violation from './types/Violation.enum';



describe('App', () => {

	describe('MoveCar', () => {
		let cars: Collection<Car>;
		describe('should move a car', () => {
			beforeEach(() => {
				cars = Collection.of([
										 new Car(1, Type.CAR, Color.BLUE, [31, 32], 'horizontal'),
										 new Car(2, Type.CAR, Color.RED, [22, 23], 'horizontal'),
										 new Car(3, Type.CAR, Color.GREEN, [25, 35], 'vertical'),
										 new Car(4, Type.CAR, Color.YELLOW, [53, 63], 'vertical'),
									 ]);
			});
			it('to the left', () => {
				// arrange
				const [car] = cars.find({id: 2});
				const movement = { carId: car.id, direction: Direction.LEFT };
				const expected = [21, 22];
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => fail('Violation occurred: ' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:2});
							expect(movingCar.coordinates.toArray()).toEqual(expected);
						}
				)
			});
			it('to the right', () => {
				// arrange
				const [car] = cars.find({id: 1});
				const movement = { carId: car.id, direction: Direction.RIGHT };
				const expected = [32, 33];
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => fail('Violation occurred: ' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:1});
							expect(movingCar.coordinates.toArray()).toEqual(expected);
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
						(violation) => fail('Violation occurred: ' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:4});
							expect(movingCar.coordinates.toArray()).toEqual(expected);
						}
				)
			});
			it('down', () => {
				// arrange
				const [car] = cars.find({id: 3});
				const movement = { carId: car.id, direction: Direction.DOWN };
				const expected = [35, 45];
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => fail('Violation occurred: ' + violation.toString()),
						(carsResult) => {
							const [movingCar] = carsResult.find({id:3});
							expect(movingCar.coordinates.toArray()).toEqual(expected);
						}
				)
			});
		});

		describe('should NOT move a car when out of bounds', () => {
			beforeEach(() => {
				cars = Collection.of([
										 new Car(1, Type.CAR, Color.BLUE, [31, 32], 'horizontal'),
										 new Car(2, Type.CAR, Color.PURPLE, [15, 16], 'horizontal'),
										 new Car(3, Type.CAR, Color.PURPLE, [14, 24], 'vertical'),
										 new Car(4, Type.CAR, Color.GREEN, [56, 66], 'vertical'),
									 ]);
			});
			it('to the left', () => {
				// arrange
				const [car] = cars.find({ id: 1 });
				const movement = { carId: car.id, direction: Direction.LEFT };
				const expected = Violation.GRID_BOUNDRY_REACHED;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be out of bounds')
				);
			});
			it('to the right', () => {
				// arrange
				const [car] = cars.find({ id: 2 });
				const movement = { carId: car.id, direction: Direction.RIGHT };
				const expected = Violation.GRID_BOUNDRY_REACHED;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be out of bounds')
				);
			});
			it('up', () => {
				// arrange
				const [car] = cars.find({ id: 3 });
				const movement = { carId: car.id, direction: Direction.UP };
				const expected = Violation.GRID_BOUNDRY_REACHED;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be out of bounds')
				);
			});
			it('down', () => {
				// arrange
				const [car] = cars.find({ id: 4 });
				const movement = { carId: car.id, direction: Direction.DOWN };
				const expected = Violation.GRID_BOUNDRY_REACHED;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be out of bounds')
				);
			});
		});

		describe('should NOT move a car when there is another car', () => {

			beforeEach(() => {
				cars = Collection.of([
										 new Car(1, Type.CAR, Color.BLUE, [35, 36], 'horizontal'),
										 new Car(2, Type.CAR, Color.PURPLE, [32, 33], 'horizontal'),
										 new Car(3, Type.CAR, Color.PURPLE, [34, 44], 'vertical'),
										 new Car(4, Type.CAR, Color.GREEN, [14, 24], 'vertical'),
									 ]);
			});
			describe('checkBlockingViolation', () => {
				it('should return a BlockingViolation', () => {
					// arrange
					const coordinates = [15, 25, 35];
					const expected = Violation.BLOCKED_BY_CAR;
					// act
					checkBlockingCarViolation(coordinates, cars, 123)
							.leftOrRight(
							(violation) => expect(violation).toBe(expected),
							() => fail('Should be blocked')
					);
				});
				it('should return the new coordinates', () => {
					// arrange
					const coordinates = [61, 62, 63];
					// act
					checkBlockingCarViolation(coordinates, cars, 123)
							.leftOrRight(
							(_) => fail('Should not be blocked'),
							(result) => expect(result).toEqual(coordinates)
					);
				});
			});

			it('to the left', () => {
				// arrange
				const [car] = cars.find({ id: 1 });
				const movement = { carId: car.id, direction: Direction.LEFT };
				const expected = Violation.BLOCKED_BY_CAR;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be blocked')
				);
			});
			it('to the right', () => {
				// arrange
				const [car] = cars.find({ id: 2 });
				const movement = { carId: car.id, direction: Direction.RIGHT };
				const expected = Violation.BLOCKED_BY_CAR;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be blocked')
				);
			});
			it('up', () => {
				// arrange
				const [car] = cars.find({ id: 3 });
				const movement = { carId: car.id, direction: Direction.UP };
				const expected = Violation.BLOCKED_BY_CAR;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be blocked')
				);
			});
			it('down', () => {
				// arrange
				const [car] = cars.find({ id: 4 });
				const movement = { carId: car.id, direction: Direction.DOWN };
				const expected = Violation.BLOCKED_BY_CAR;
				// act
				const result = moveCar(movement, cars);
				// assert
				result.leftOrRight(
						(violation) => expect(violation).toBe(expected),
						() => fail('Should be blocked')
				);
			});
		});
	});

});
