import Type from './Type.enum';
import Car from './Car';

type GridItem = {
	id: number;
	type: Type;
	car?: Car;
}

export default GridItem;
