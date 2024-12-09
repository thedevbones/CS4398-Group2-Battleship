import Coordinate from './Coordinate'

abstract class Opponent {
    protected moves: Coordinate[];

    constructor() {
      this.moves = [];  // Initialize in the constructor
    }

    /* nextMove
        Params:
          x   number representing width of map grid in unites
          y   number representing height of map grid in units
    */
    abstract nextMove(x: number, y: number, lastHit: Coordinate | null): Coordinate;

}

export class EasyOpponent extends Opponent {
  // chooses a random spot on the map to attack first
  // if hit, choose random spot within 4x4 grid to attack
  // continue until sunk
  // resume searching
  
    constructor() {
      super();
    }

    // get value of last hit
    nextMove(x: number, y: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 0;
      let yCoord = 0;
      if (this.moves.length == 0 || lastHit == null) {
          xCoord = Math.floor(Math.random() * (x + 1));    // get ranndom int from 0 -> x
          yCoord = Math.floor(Math.random() * (y + 1));    // get random int from 0 -> y
      } else if (lastHit instanceof Coordinate) {
          xCoord = lastHit.getX() - (Math.floor(Math.random() * (((x+4)-(x-4)+1) + (x-4)))); 
          yCoord = lastHit.getX() - (Math.floor(Math.random() * (((y+4)-(y-4)+1) + (y-4)))); 
      }

      // clamping/error checking
      if (xCoord < 0) {
        xCoord = 0;
      } else if (xCoord > x) {
        xCoord = x;
      }
      if (yCoord < 0) {
        yCoord = 0;
      } else if (yCoord > y) {
        yCoord = 0;
      }

        return new Coordinate(xCoord, yCoord);
    }

    
}

export class MedOpponent extends Opponent {
    // chooses a random spot on the map to attack first
    // if hit, choose random spot within 2x2 grid to attack
    // continue until sunk
    // resume searching

    constructor() {
      super();
    }

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}



export class HardOpponent extends Opponent {
  // chooses a random spot on the map to attack first
  // if hit, attack adjacent squares until next hit
  // on next hit, attack only squares within that line
  // continue until sunk
  // resume searching

    constructor() {
      super();
    }

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}