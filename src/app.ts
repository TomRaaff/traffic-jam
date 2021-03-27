// import GridItem from './types/GridItem';
import Direction from './types/Direction.enum';
import Type from './types/Type.enum';
import GridItem from './types/GridItem';
import Collection from './types/util/Collection';

export function determineType(classList: string[]): Type {
	if (classList.includes(Type.PLAYER)) return Type.PLAYER;
	if (classList.includes(Type.CAR)) return Type.CAR;
	return Type.FREE;
}

function setType(id: number, type: Type): (a: GridItem) => GridItem {
	return (gridItem: GridItem) => {
		if (gridItem.id === id) {
			return { id, type };
		}
		return gridItem;
	};
}

function calcNextLocation(current: number, direction: Direction, currentGrid: Collection<GridItem>): number {
	switch (direction) {
	case Direction.UP:
		return current - 10;
	case Direction.RIGHT:
		return current + 1;
	case Direction.LEFT:
		return current - 1;
	case Direction.DOWN:
		return current + 10;
	default:
		return 0;
	}
}

export type MoveItemInput = {
	type: Type;
	locationId: number;
	direction: Direction;
	currentGrid: Collection<GridItem>;
}

// todo: implement this.
export function moveItem(input: MoveItemInput): Collection<GridItem> {
	const { locationId, currentGrid } = input;
	const nextLocation = calcNextLocation(locationId, input.direction, currentGrid);
	return currentGrid.map(setType(locationId, Type.FREE))
					  .map(setType(nextLocation, input.type));
}
