import { describe, it, expect } from 'vitest';
import { EasyOpponent, MedOpponent, HardOpponent } from '../src/Opponent';
import Coordinate from '../src/Coordinate';

describe('Map Class Tests', () => {
    it('EasyOpp constructor', () => {
        const opp = new EasyOpponent();
        expect(opp).toBeInstanceOf(EasyOpponent);
    });
    it('EasyOpp nextMove accepts lastHit to be null', () => {
      const opp = new EasyOpponent();
      expect(opp.nextMove(10, 10, null)).toBeInstanceOf(Coordinate);
    });
    it('EasyOpp nextMove accepts lastHit to be Coordinate', () => {
      const opp = new EasyOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      expect(opp.nextMove(10, 10, lastHit)).toBeInstanceOf(Coordinate);
    });
    it('EasyOpp nextMove X value within 5-tile search radius of last hit', () => {
      const opp = new EasyOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      const next = opp.nextMove(10, 10, lastHit);
      let isWithinRadius = false;
      if ((lastHit.getX()-2) < next.getX() && next.getX() < (lastHit.getX()+2)) {
        isWithinRadius = true;
      }
      expect(isWithinRadius).toBe(true);
    });
    it('EasyOpp nextMove Y value within 3-tile search radius of last hit', () => {
      const opp = new EasyOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      const next = opp.nextMove(10, 10, lastHit);
      let isWithinRadius = false;
      if ((lastHit.getY()-2) < next.getY() && next.getY() < (lastHit.getY()+2)) {
        isWithinRadius = true;
      }
      expect(isWithinRadius).toBe(true);
    });

    it('MedOpp constructor', () => {
      const opp = new MedOpponent();
      expect(opp).toBeInstanceOf(MedOpponent);
    });
    it('MedOpp nextMove accepts lastHit to be null', () => {
      const opp = new MedOpponent();
      expect(opp.nextMove(10, 10, null)).toBeInstanceOf(Coordinate);
    });
    it('MedOpp nextMove accepts lastHit to be Coordinate', () => {
      const opp = new MedOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      expect(opp.nextMove(10, 10, lastHit)).toBeInstanceOf(Coordinate);
    });
    it('MedOpp nextMove X value within 3-tile search radius of last hit', () => {
      const opp = new MedOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      const next = opp.nextMove(10, 10, lastHit);
      let isWithinRadius = false;
      if ((lastHit.getX()-1) < next.getX() && next.getX() < (lastHit.getX()+1)) {
        isWithinRadius = true;
      }
      expect(isWithinRadius).toBe(true);
    });
    it('MedOpp nextMove Y value within 3-tile search radius of last hit', () => {
      const opp = new MedOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      const next = opp.nextMove(10, 10, lastHit);
      let isWithinRadius = false;
      if ((lastHit.getY()-1) < next.getY() && next.getY() < (lastHit.getY()+1)) {
        isWithinRadius = true;
      }
      expect(isWithinRadius).toBe(true);
    });

    it('HardOpp constructor', () => {
      const opp = new HardOpponent();
      expect(opp).toBeInstanceOf(HardOpponent);
    });
    it('HardOpp nextMove accepts lastHit to be null', () => {
      const opp = new HardOpponent();
      expect(opp.nextMove(10, 10, null)).toBeInstanceOf(Coordinate);
    });
    it('HardOpp nextMove accepts lastHit to be Coordinate', () => {
      const opp = new HardOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      expect(opp.nextMove(10, 10, lastHit)).toBeInstanceOf(Coordinate);
    });
    it('HardOpp nextMove X value adjacent to last hit', () => {
      const opp = new HardOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      const next = opp.nextMove(10, 10, lastHit);
      let isWithinRadius = false;
      if (next.getX() == (lastHit.getX()+1) || next.getX() == (lastHit.getX()-1)) {
        isWithinRadius = true;
      }
      expect(isWithinRadius).toBe(true);
    });
    it('HardOpp nextMove Y value adjacent to last hit', () => {
      const opp = new HardOpponent();
      const lastHit = opp.nextMove(10, 10, null);
      const next = opp.nextMove(10, 10, lastHit);
      let isWithinRadius = false;
      if (next.getY() == (lastHit.getY()+1) || next.getY() == (lastHit.getY()-1)) {
        isWithinRadius = true;
      }
      expect(isWithinRadius).toBe(true);
    });
});