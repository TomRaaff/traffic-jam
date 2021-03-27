import Right from './Right';
import Left from './Left';

export default class Either<L, R> {
	private constructor(private readonly value: Left<L> | Right<R>) {}

	isLeft() { return this.value.isLeft(); }

	isRight() { return this.value.isRight(); }

	map(fn: (a: L|R) => any) { return this.value.map(fn); }

	flatMap(fn: (a: L|R) => any) { return this.value.flatMap(fn); }

	fold(ifLeft: (l:L) => unknown, fn: (r: R) => unknown) { return this.value.fold(ifLeft, fn); }

	static of<R>(val: R) { return new Either(Right.of(val)); }

	static ofLeft<L>(val: L) { return new Either(Left.of(val)); }
}
