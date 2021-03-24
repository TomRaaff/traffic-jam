import { GridItem } from './types/DataTypes';

export function determineType(classList: string[]): 'player' | 'car' | 'free' {
	if (classList.includes('player')) return 'player';
	if (classList.includes('car')) return 'car';
	return 'free';
}

// todo: implement this.
export function moveItem(...args: any[]): GridItem[] {
	console.log('moveItem', ...args);
	return [];
}
