import jest from '@jest/globals';
import Car from './Car';
import Color from './Color.enum';
import Type from './Type.enum';

const j = jest;
j.describe('Car', () => {
	j.describe('of size 1', () => {
		j.it('should throw an error when its alignment is not set', () => {
			j.expect(() => new Car(1, Type.CAR, Color.GREEN, [11]))
			 .toThrow();
		});
	});
	j.describe('of size 2', () => {
		j.it('should determine its alignment to be horizontal', () => {
			const car = new Car(1, Type.CAR, Color.GREEN, [11, 12]);
			j.expect(car.alignment)
			 .toBe('horizontal');
		});
		j.it('should determine its alignment to be vertical', () => {
			const car = new Car(1, Type.CAR, Color.GREEN, [11, 21]);
			j.expect(car.alignment)
			 .toBe('vertical');
		});
	});
	j.describe('of size 4', () => {
		j.it('should determine its alignment to be horizontal', () => {
			const car = new Car(1, Type.CAR, Color.GREEN, [11, 12, 13, 14]);
			j.expect(car.alignment)
			 .toBe('horizontal');
		});
		j.it('should determine its alignment to be vertical', () => {
			const car = new Car(1, Type.CAR, Color.GREEN, [11, 21, 31, 41]);
			j.expect(car.alignment)
			 .toBe('vertical');
		});
	});

	j.describe('should throw an error', () => {
		j.it('when coordinates contain a horizontal gap', () => {
			j.expect(() => new Car(1, Type.CAR, Color.GREEN, [11, 12, 13, 15]))
			 .toThrow();
		});
		j.it('when coordinates contain a vertical gap', () => {
			j.expect(() => new Car(1, Type.CAR, Color.GREEN, [11, 21, 41]))
			 .toThrow();
		});
		j.it('when coordinates lined up diagonally nw-se', () => {
			j.expect(() => new Car(1, Type.CAR, Color.GREEN, [11, 22, 33]))
			 .toThrow();
		});
		j.it('when coordinates lined up diagonally sw-ne', () => {
			j.expect(() => new Car(1, Type.CAR, Color.GREEN, [31, 22, 13]))
			 .toThrow();
		});
	});
});
