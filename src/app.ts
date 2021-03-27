import Direction from './types/Direction.enum';
import Type from './types/Type.enum';
import GridItem from './types/GridItem';
import Collection from './types/util/Collection';
import Either from './types/util/Either';
import Violation from './types/Violation.enum';

const movement = {
	up: -10,
	right: 1,
	left: -1,
	down: 10,
};

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

function nextLocation(locationId: number, direction: Direction, grid: Collection<GridItem>): Either<Violation, number> {
	const nextLocationId = locationId + movement[direction];
	return grid.findOne({ id: nextLocationId })
			   .toEither(Violation.GRID_BOUNDRY_REACHED)
			   .flatMap((gridItem) => ((gridItem.type === Type.FREE) ? Either.of(gridItem.id) : Either.ofLeft(Violation.BLOCKED_BY_CAR)));
}

export type MoveItemInput = {
	type: Type;
	locationId: number;
	direction: Direction;
	currentGrid: Collection<GridItem>;
}

export function moveItem(input: MoveItemInput): Either<Violation, Collection<GridItem>> {
	const { locationId, direction, currentGrid } = input;
	return nextLocation(locationId, direction, currentGrid)
			.map(
				(location) => currentGrid.map(setType(locationId, Type.FREE))
											 	 .map(setType(location, input.type)),
			);
}
