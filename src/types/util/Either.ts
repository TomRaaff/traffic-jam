import Right from './Right';
import Left from './Left';

export default class Either<L, R> {
	private constructor(private readonly left: Left<L> | undefined,
						private readonly right: Right<R> | undefined) {
		if (!(left) && !(right)) {
			throw new Error('invalid creation of Either. L & R are both undefined');
		}
	}

	map<S>(fn: (a: R) => S): Either<L|undefined, S|undefined> {
		return new Either(this.left?.map(fn), this.right?.map(fn));
	}

	flatMap<S>(fn: (a: R) => Either<L|undefined, S|undefined>): Either<L|undefined, S|undefined> {
		if (this.left) {
			return new Either(this.left, undefined);
		}
		return this.right!.flatMap(fn);
	}

	fold(ifLeft: (l:L) => L | void, ifRight: (r: R) => R | void): L | R | void {
		return (this.left) ? this.left?.fold(ifLeft) : this.right?.fold(ifRight);
	}

	static of<T>(val: T): Either<undefined, T> {
		return new Either(undefined, Right.of(val));
	}

	static ofLeft<T>(val: T): Either<T, undefined> {
		return new Either(Left.of(val), undefined);
	}
}
