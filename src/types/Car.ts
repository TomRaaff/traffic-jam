export default class Car {
	public readonly alignment: 'horizontal' | 'vertical';

	constructor(public readonly type: 'player' | 'car',
							public readonly vertAmt: number,
							public readonly horAmt: number) {
		this.alignment = (horAmt >= 1) ? 'horizontal' : 'vertical';
	}
}
