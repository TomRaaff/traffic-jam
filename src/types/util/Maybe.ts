import Some from './Some';
import None from './None';

export default class Maybe<T> {
	private val: Some<T> | None<T>;

	private constructor(input?: T | undefined) {
		const value: T = (input instanceof Maybe)
			? input.fold(() => undefined,
					   (val: T) => val)
			: input;
		this.val = (value) ? new Some(value) : new None();
	}

	map(fn: (t: T) => Maybe<any>) { return this.val.map(fn); }

	flatMap(fn: (t: T) => any) { return this.val.flatMap(fn); }

	fold(ifEmpty: () => void, fn: (t: T) => any) { return this.val.fold(ifEmpty, fn); }

	static of<T>(val: T | undefined) { return new Maybe(val); }

	static empty<T>() { return new Maybe<T>(); }
}
