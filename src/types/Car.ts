/* eslint-disable class-methods-use-this */
export default class Car {
	constructor(public readonly type: 'player' | 'car',
				public readonly gridIds: number[],
				public readonly alignment?: 'horizontal' | 'vertical') {
		if (gridIds.length === 1 && alignment == null) throw new Error('Invalid object. Alignment should be set.');
		if (!this.hasValidGridIds(gridIds)) throw new Error(`Invalid object. Grid ids do not line up correctly: ${gridIds}`);
		this.alignment = this.determineAlignment(gridIds);
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
