import { describe, it, expect } from 'vitest';
import MapGrid from '../src/MapGrid';

describe('MapGrid Class Tests', () => {
    it('initializes with correct dimensions', () => {
        const grid = new MapGrid(10, 10);
        expect(grid.getCols()).toBe(10);
        expect(grid.getRows()).toBe(10);
    });
});
