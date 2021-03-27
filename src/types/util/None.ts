import Maybe from './Maybe';

export default class None<T> {
	map(fn: (t: T) => Maybe<any>) { return this; }

	flatMap(fn: (t: T) => any) { return this; }

	fold(ifEmpty: () => void, fn: (t: T) => any) { return ifEmpty(); }
}
