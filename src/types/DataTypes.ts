import Car from './Car';

export type GridItem = {
	id: number;
	type: 'player' | 'car' | 'free';
}

export type Grid = {
	gridItems: GridItem[];
	cars: Car[];
}
