/* eslint-disable class-methods-use-this */
import Color from './Color.enum';
import { Collection } from 'tr-utilities-lib';
import Type from './Type.enum';

export default class Car {
	readonly coordinates: Collection<number>;

	constructor(public readonly id: number,
				public readonly type: Type,
				public readonly color: Color,
				readonly gridIds: number[],
				public readonly alignment?: 'horizontal' | 'vertical') {
		if (id === 0) throw new Error('Car can not have id: 0');
		if (gridIds.length === 1) throw new Error('Invalid object. Needs more than one gridId');
		if (!this.areGridIdsLinedUp(gridIds)) throw new Error(`Invalid object. Grid ids do not line up correctly: ${gridIds}`);
		this.alignment = (alignment) ? alignment : this.determineAlignment(gridIds);
		this.coordinates = Collection.of(gridIds);
	}

	private determineAlignment(gridIds: number[]): 'horizontal' | 'vertical' {
		const lowest = gridIds.reduce((acc, cur) => ((cur < acc) ? cur : acc), 100);
		const highest = gridIds.reduce((acc, cur) => ((cur > acc) ? cur : acc), 0);
		return ((highest - lowest) < 10) ? 'horizontal' : 'vertical';
	}

	private areGridIdsLinedUp(gridIds: number[]): boolean {
		const num = gridIds.reduce((acc, cur) => {
									   const diff = Math.abs(cur - acc);
									   return (diff === 1 || diff === 10) ? cur : 0;
								   },
								   gridIds[0] - 1);
		return (num !== 0);
	}

	copy(newFields: Partial<Car>): Car {
		return new Car(newFields.id || this.id,
					   newFields.type || this.type,
					   newFields.color || this.color,
					   newFields.coordinates?.toArray() || newFields.gridIds || this.coordinates.toArray(),
					   newFields.alignment || undefined);
	}
}
