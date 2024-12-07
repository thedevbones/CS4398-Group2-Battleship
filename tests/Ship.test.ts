import { describe, it, expect } from 'vitest';
import Ship from '../src/Ship';

describe('Ship Class Tests', () => {
    it('marks a position as hit', () => {
        const ship = new Ship(3, 1);
        
        // check all positions start at 0
        for (let i = 0; i < 3; i++) {
            expect(ship['hitArray'][i][0]).toBe(0);
        }

        // apply hit
        ship.hit(1, 0);

        // check position marked as hit
        expect(ship['hitArray'][1][0]).toBe(1);

        // check other positions are not hit
        expect(ship['hitArray'][0][0]).toBe(0);
        expect(ship['hitArray'][2][0]).toBe(0);
    });

    it('detects when the ship is sunk', () => {
        const ship = new Ship(3, 1);

        // apply hits
        ship.hit(0, 0);
        ship.hit(1, 0);
        ship.hit(2, 0);

        // check ship has been sunk
        expect(ship.isSunk()).toBe(true);
    });
});
