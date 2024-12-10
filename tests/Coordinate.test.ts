import { describe, it, expect } from 'vitest';
import Coordinate from '../src/Coordinate';

describe('Coordinate class tests', () => {
    it('Constructor', () => {
        const coord = new Coordinate(10, 10);
        expect(coord).toBeInstanceOf(Coordinate);
    });
    it('Check getX', () => {
      const coord = new Coordinate(11, 10);
      expect(coord.getX()).toBe(11);
    });
    it('Check getY', () => {
      const coord = new Coordinate(10, 12);
      expect(coord.getY()).toBe(12);
    });
    it('Check getTuple', () => {
      const coord = new Coordinate(9, 10);
      expect(coord.getTuple()).toEqual([9,10]);
    });
    it('Check isValid returns bool', () => {
      const coord = new Coordinate(10, 10);
      expect(coord.isValid(4, 4, 20, 10)).toBeTypeOf('boolean');
    });
    it('Check isValid returns true if within params', () => {
      const coord = new Coordinate(10, 10);
      expect(coord.isValid(4, 4, 20, 20)).toBe(true);
    });
    it('Check isValid catches X value < minX', () => {
      const coord = new Coordinate(1, 10);
      expect(coord.isValid(4, 4, 20, 20)).toBe(false);
    });
    it('Check isValid catches Y value < minY', () => {
      const coord = new Coordinate(10, 1);
      expect(coord.isValid(4, 4, 20, 20)).toBe(false);
    });
    it('Check isValid catches Y value > maxY', () => {
      const coord = new Coordinate(10, 30);
      expect(coord.isValid(4, 4, 20, 20)).toBe(false);
    });
    it('Check isValid catches X value > maxX', () => {
      const coord = new Coordinate(25, 10);
      expect(coord.isValid(4, 4, 20, 20)).toBe(false);
    });
    it('Check isValid catches X value < 0', () => {
      const coord = new Coordinate(-2, 10);
      expect(coord.isValid(4, 4, 20, 20)).toBe(false);
    });
    it('Check isValid catches Y value < 0', () => {
      const coord = new Coordinate(10, -10);
      expect(coord.isValid(4, 4, 20, 20)).toBe(false);
    });
});
