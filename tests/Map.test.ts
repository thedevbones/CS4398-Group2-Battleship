import { describe, it, expect } from 'vitest';
import Map from '../src/Map';

describe('Map Class Tests', () => {
    it('constructor accepts input', () => {
        const grid = new Map(10, 10);
    });
    it('check getX', () => {
      const grid = new Map(12, 10);
      expect(grid.getX()).toBe(12);
    });
    it('check getY', () => {
      const grid = new Map(10, 15);
      expect(grid.getX()).toBe(15);
    });
    it('Check isValid returns bool', () => {
      const grid = new Map(10, 10);
      expect(grid.isValid()).toBeTypeOf('boolean');
    });
    it('Check isValid returns true if within params', () => {
      const grid = new Map(10, 10);
      expect(grid.isValid()).toBe(true);
    });
    it('Check isValid catches X value < minX', () => {
      const grid = new Map(3, 10);
      expect(grid.isValid()).toBe(false);
    });
    it('Check isValid catches Y value < minY', () => {
      const grid = new Map(10, 2);
      expect(grid.isValid()).toBe(false);
    });
    it('Check isValid catches Y value > maxY', () => {
      const grid = new Map(10, 60);
      expect(grid.isValid()).toBe(false);
    });
    it('Check isValid catches X value > maxX', () => {
      const grid = new Map(55, 10);
      expect(grid.isValid()).toBe(false);
    });
    it('Check isValid catches X value < 1', () => {
      const grid = new Map(-2, 10);
      expect(grid.isValid()).toBe(false);
    });
    it('Check isValid catches Y value < 1', () => {
      const grid = new Map(10, 0);
      expect(grid.isValid()).toBe(false);
    });
});
