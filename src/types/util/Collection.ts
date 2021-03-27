export default class Collection<T> {
	readonly collection: Array<T> = [];

	constructor(...items: Array<T>) {
		this.collection.push(...items);
	}

	count(): number {
		return this.collection.length;
	}

	push(...items: Array<T>): boolean {
		return items.every((item) => this.collection.push(item));
	}

	pull(...items: Array<T>): Array<T> {
		return items.reduce((carry, item) => {
			const index: number = this.collection.indexOf(item);

			return carry.concat(this.collection.splice(index, 1));
		}, [] as Array<T>);
	}

	find(seek: Partial<T>): Array<T> {
		const keys = Object.keys(seek) as Array<keyof T>;

		return this.collection.filter((item) => keys.every((key) => item[key] === seek[key]));
	}

	findOne(seek: Partial<T>): T | undefined {
		const keys = Object.keys(seek) as Array<keyof T>;

		for (let i = 0; i < this.collection.length; i += 1) {
			const item = this.collection[i];
			if (keys.every((key) => item[key] === seek[key])) {
				return item;
			}
		}
		return undefined;
	}

	contains(seek: Partial<T>): boolean {
		return !!this.findOne(seek);
	}

	copy(): Collection<T> {
		return Collection.of([...this.collection]);
	}

	filter(fn: (a: T) => boolean): Collection<T> {
		return Collection.of(this.collection.filter(fn));
	}

	map<S>(fn: (a: T) => S): Collection<S> {
		return Collection.of(this.collection.map(fn));
	}

	reduce(fn: (prev: T, cur: T, index: number, array: T[]) => T, initial: T): T {
		return this.collection.reduce(fn, initial);
	}

	static of<T>(array: Array<T>): Collection<T> {
		return new Collection<T>(...array);
	}
}
