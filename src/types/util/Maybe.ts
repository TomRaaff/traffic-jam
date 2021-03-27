import Some from './Some';
import None from './None';

export default class Maybe<T> {
	private val: Some<T> | None<T>;

	private constructor(input?: T | undefined) {
		let value: T | undefined;
		if (input) {
			if (input instanceof Maybe) {
				value = input.getOrElse(
					() => undefined,
					(val: T) => val,
				);
			} else {
				value = input;
			}
		}
		this.val = (value) ? new Some(value) : new None();
	}

	map<S>(fn: (t: T) => S): Maybe<S> {
		return this.val.map(fn);
	}

	flatMap<S>(fn: (t: T) => Maybe<S>): Maybe<S> {
		return this.val.flatMap(fn);
	}

	getOrElse(ifEmpty: () => undefined | void, fn: (t: T) => T): T | undefined | void {
		return this.val.getOrElse(ifEmpty, fn);
	}

	static of<S>(val: S | undefined) {
		return new Maybe<S>(val);
	}

	static empty<S>() {
		return new Maybe<S>();
	}
}
