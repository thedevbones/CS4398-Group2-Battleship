import { describe, it, expect } from 'vitest';
import { EasyOpponent, MedOpponent, HardOpponent } from '../src/Opponent';
import Coordinate from '../src/Coordinate';
import Ship from '../src/Ship';

describe('Opponent class tests', () => {
  it('EasyOpp constructor', () => {
    const opp = new EasyOpponent();
    expect(opp).toBeInstanceOf(EasyOpponent);
  });
  it('EasyOpp nextMove accepts lastHit to be null', () => {
    const opp = new EasyOpponent();
    expect(opp.nextMove(null)).toBeInstanceOf(Coordinate);
  });
});