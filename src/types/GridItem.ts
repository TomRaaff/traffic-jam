import Type from './Type.enum';
import Color from './Color.enum';

export type FreeGridItem = {
	id: number;
	type: Type.FREE;
}

export type CarGridItem = {
	id: number;
	type: Type.CAR | Type.PLAYER;
	carId: number;
	color: Color;
	alignment: 'horizontal' | 'vertical';
}

export default class GridItem {
	constructor(public readonly id: number,
				public readonly type: Type,
				public readonly carId?: number,
				public readonly color?: Color,
				public readonly alignment?: 'horizontal' | 'vertical',
	) {}

	static build(item: CarGridItem | FreeGridItem): GridItem {
		const { id, type } = item;
		if (item.type !== Type.FREE) {
			const { carId, color, alignment } = item;
			return new GridItem(id, type, carId, color, alignment);
		}
		return new GridItem(id, type);
	}
}
