import {
	beforeEach, describe, expect, it,
} from '@jest/globals';
import { determineType, moveItem } from './app';
import Direction from './types/Direction.enum';
import GridItem from './types/GridItem';
import Type from './types/Type.enum';
import Collection from './types/util/Collection';

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
		it('should move the player to the left', () => {
			// arrange
			const inputGrid = defaultGrid.map(setType(22, Type.PLAYER));
			const expected = inputGrid.map(setType(21, Type.PLAYER))
									  .map(setType(22, Type.FREE));
			// act
			const newGrid = moveItem(2, Direction.LEFT, inputGrid);
			// assert
			expect(newGrid).toEqual(expected);
		});
	});
});
