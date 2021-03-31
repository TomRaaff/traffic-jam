/* eslint-disable class-methods-use-this */
import Color from './Color.enum';
import Collection from './util/Collection';
import Type from './Type.enum';

export default class Car {
	readonly gridIds: Collection<number>;

	constructor(public readonly id: number,
				public readonly type: Type.PLAYER | Type.CAR,
				public readonly color: Color,
				public readonly ids: number[],
				public readonly alignment?: 'horizontal' | 'vertical') {
		if (ids.length === 1 && alignment == null) throw new Error('Invalid object. Alignment should be set.');
		if (!this.hasValidGridIds(ids)) throw new Error(`Invalid object. Grid ids do not line up correctly: ${ids}`);
		this.alignment = this.determineAlignment(ids);
		this.gridIds = Collection.of(ids);
	}

	private determineAlignment(gridIds: number[]): 'horizontal' | 'vertical' {
		const lowest = gridIds.reduce((acc, cur) => ((cur < acc) ? cur : acc), 100);
		const highest = gridIds.reduce((acc, cur) => ((cur > acc) ? cur : acc), 0);
		return ((highest - lowest) < 10) ? 'horizontal' : 'vertical';
	}

	private hasValidGridIds(gridIds: number[]): boolean {
		if (gridIds.length === 1) return true;
		const num = gridIds.reduce((acc, cur) => {
									   const diff = Math.abs(cur - acc);
									   return (diff === 1 || diff === 10) ? cur : 0;
								   },
								   gridIds[0] - 1);
		return (num !== 0);
	}
}
