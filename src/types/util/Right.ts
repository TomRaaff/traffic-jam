export default class Right<R> {
	private constructor(private readonly value: R) {}

	isLeft() { return false; }

	isRight() { return true; }

	map(fn: (r: R) => Right<any>) { return Right.of(fn(this.value)); }

	flatMap(fn: (r: R) => unknown) { return fn(this.value); }

	fold(ifLeft: Function, fn: (r: R) => unknown) { return fn(this.value); }

	static of<R>(value: R) {
		return new Right(value);
	}
}
