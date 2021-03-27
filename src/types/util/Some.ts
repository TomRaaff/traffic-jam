import Maybe from './Maybe';

export default class Some<T> {
	constructor(private val: T) {}

	map(fn: (t: T) => Maybe<any>) { return new Some(fn(this.val)); }

	flatMap(fn: (t: T) => any) { return fn(this.val); }

	fold(ifEmpty: () => void, fn: (t: T) => any) { return fn(this.val); }
}
