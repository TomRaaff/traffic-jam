import Type from './Type.enum';
import Color from './Color.enum';

type GridItem = {
	id: number;
	type: Type;
	carId?: number;
	color?: Color
}

export default GridItem;
