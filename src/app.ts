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

// todo: implement this.
export function moveItem(locationId: number, direction: Direction, currentGrid: Collection<GridItem>): Collection<GridItem> {
	console.log('moveItem', locationId, direction, currentGrid);
	return currentGrid;
}
