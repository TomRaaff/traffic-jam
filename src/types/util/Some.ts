import Maybe from './Maybe';

export default class Some<T> {
	constructor(private val: T) {}

	map<S>(fn: (t: T) => S): Maybe<S> {
		return Maybe.of(fn(this.val));
	}

	flatMap<S>(fn: (t: T) => Maybe<S>): Maybe<S> {
		return fn(this.val);
	}

	getOrElse<S>(ifEmpty: () => S, fn: (t: T) => S): S {
		return fn(this.val);
	}
}
