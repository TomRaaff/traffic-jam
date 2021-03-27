import Some from './Some';
import None from './None';
import Either from './Either';

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

	getOrElse<S>(ifEmpty: () => S, fn: (t: T) => S): S {
		return this.val.getOrElse(ifEmpty, fn);
	}

	static of<S>(val: S | undefined) {
		return new Maybe<S>(val);
	}

	static empty<S>() {
		return new Maybe<S>();
	}

	toEither<L>(left: L): Either<L, T> {
		return this.val.getOrElse(() => Either.ofLeft(left), (value) => Either.of(value));
	}
}
