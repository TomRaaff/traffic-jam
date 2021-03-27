import Direction from './types/Direction.enum';
import Type from './types/Type.enum';
import GridItem from './types/GridItem';
import Collection from './types/util/Collection';
import Either from './types/util/Either';
import Violation from './types/Violation.enum';

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

// todo: see whether movement is even possible
function calcNextLocation(current: number, direction: Direction, currentGrid: Collection<GridItem>): Either<Violation, number> {
	switch (direction) {
	case Direction.UP:
		return Either.of(current - 10);
	case Direction.RIGHT:
		return Either.of(current + 1);
	case Direction.LEFT:
		return Either.of(current - 1);
	case Direction.DOWN:
		return Either.of(current + 10);
	default:
		return Either.ofLeft(Violation.INVALID_INPUT);
	}
}

export type MoveItemInput = {
	type: Type;
	locationId: number;
	direction: Direction;
	currentGrid: Collection<GridItem>;
}

export function moveItem(input: MoveItemInput): Either<Violation, Collection<GridItem>> {
	const { locationId, currentGrid } = input;
	return calcNextLocation(locationId, input.direction, currentGrid)
			.map((nextLocation) => currentGrid.map(setType(locationId, Type.FREE))
											  .map(setType(nextLocation, input.type)));
}
