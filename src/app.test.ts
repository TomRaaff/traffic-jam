import { describe, it, expect } from '@jest/globals';
import { determineType } from './app';

describe('App', () => {
	describe('determineType', () => {
		it('should return player', () => {
			const result = determineType(['player']);
			expect(result).toBe('player');
		});
		it('should return car', () => {
			const result = determineType(['car']);
			expect(result).toBe('car');
		});
		it('should return free', () => {
			const result = determineType(['free']);
			expect(result).toBe('free');
		});
	});
});
