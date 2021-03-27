import {
	beforeEach, describe, expect, it,
} from '@jest/globals';
import { determineType, moveItem } from './app';
import Direction from './types/Direction.enum';
import GridItem from './types/GridItem';
import Type from './types/Type.enum';
import Collection from './types/util/Collection';
import Violation from './types/Violation.enum';

let defaultGrid: Collection<GridItem>;
beforeEach(() => {
	const gridItems: GridItem[] = [
		{ id: 11, type: Type.FREE },
		{ id: 12, type: Type.FREE },
		{ id: 13, type: Type.FREE },
		{ id: 14, type: Type.FREE },
		{ id: 15, type: Type.FREE },
		{ id: 21, type: Type.FREE },
		{ id: 22, type: Type.FREE },
		{ id: 23, type: Type.FREE },
		{ id: 24, type: Type.FREE },
		{ id: 25, type: Type.FREE },
		{ id: 31, type: Type.FREE },
		{ id: 32, type: Type.FREE },
		{ id: 33, type: Type.FREE },
		{ id: 34, type: Type.FREE },
		{ id: 35, type: Type.FREE },
		{ id: 41, type: Type.FREE },
		{ id: 42, type: Type.FREE },
		{ id: 43, type: Type.FREE },
		{ id: 44, type: Type.FREE },
		{ id: 45, type: Type.FREE },
		{ id: 51, type: Type.FREE },
		{ id: 52, type: Type.FREE },
		{ id: 53, type: Type.FREE },
		{ id: 54, type: Type.FREE },
		{ id: 55, type: Type.FREE },
	];
	defaultGrid = Collection.of(gridItems);
});

function setType(id: number, type: Type): (a: GridItem) => GridItem {
	return (gridItem: GridItem) => {
		if (gridItem.id === id) {
			return { id, type };
		}
		return gridItem;
	};
}
describe('App', () => {
	describe('determineType', () => {
		it('should return player', () => {
			const result = determineType([Type.PLAYER]);
			expect(result).toBe(Type.PLAYER);
		});
		it('should return car', () => {
			const result = determineType([Type.CAR]);
			expect(result).toBe(Type.CAR);
		});
		it('should return free', () => {
			const result = determineType([Type.FREE]);
			expect(result).toBe(Type.FREE);
		});
	});

	describe('MoveItem', () => {
		describe('should move the player', () => {
			it('to the left', () => {
				// arrange
				const currentLocation = 22;
				const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
				const expected = inputGrid.map(setType(currentLocation, Type.FREE))
										  .map(setType(21, Type.PLAYER));
				// act
				const result = moveItem({
											 type: Type.PLAYER,
											 locationId: currentLocation,
											 direction: Direction.LEFT,
											 currentGrid: inputGrid,
										 });
				// assert
				result.leftOrRight(
					(violation) => expect(violation).toBeFalsy(),
					(newGrid) => expect(newGrid).toEqual(expected),
				);
			});
			it('to the right', () => {
				// arrange
				const currentLocation = 22;
				const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
				const expected = inputGrid.map(setType(currentLocation, Type.FREE))
										  .map(setType(23, Type.PLAYER));
				// act
				const result = moveItem({
											 type: Type.PLAYER,
											 locationId: currentLocation,
											 direction: Direction.RIGHT,
											 currentGrid: inputGrid,
										 });
				// assert
				result.leftOrRight(
					(violation) => expect(violation).toBeFalsy(),
					(newGrid) => expect(newGrid).toEqual(expected),
				);
			});
			it('up', () => {
				// arrange
				const currentLocation = 22;
				const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
				const expected = inputGrid.map(setType(currentLocation, Type.FREE))
										  .map(setType(12, Type.PLAYER));
				// act
				const result = moveItem({
											 type: Type.PLAYER,
											 locationId: currentLocation,
											 direction: Direction.UP,
											 currentGrid: inputGrid,
										 });
				// assert
				result.leftOrRight(
					(violation) => expect(violation).toBeFalsy(),
					(newGrid) => expect(newGrid).toEqual(expected),
				);
			});
			it('down', () => {
				// arrange
				const currentLocation = 22;
				const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER));
				const expected = inputGrid.map(setType(currentLocation, Type.FREE))
										  .map(setType(32, Type.PLAYER));
				// act
				const result = moveItem({
											 type: Type.PLAYER,
											 locationId: currentLocation,
											 direction: Direction.DOWN,
											 currentGrid: inputGrid,
										 });
				// assert
				result.leftOrRight(
					(violation) => expect(violation).toBeFalsy(),
					(newGrid) => expect(newGrid).toEqual(expected),
				);
			});
		});

		describe('should not move', () => {
			it('when there is a car blockade on the left', () => {
				// arrange
				const currentLocation = 22;
				const inputGrid = defaultGrid.map(setType(currentLocation, Type.PLAYER))
											 .map(setType(currentLocation + 1, Type.CAR));
				// act
				const result = moveItem({
											 type: Type.PLAYER,
											 locationId: currentLocation,
											 direction: Direction.RIGHT,
											 currentGrid: inputGrid,
										 });
				// assert
				result.leftOrRight(
					(violation) => expect(violation).toEqual(Violation.BLOCKED_BY_CAR),
					(grid) => expect(grid).toBeFalsy(),
				);
			});
		});
	});
});
