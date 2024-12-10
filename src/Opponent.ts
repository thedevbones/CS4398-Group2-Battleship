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
  // if hit, choose random spot within 5x5 grid to attack
  // continue until sunk
  // resume searching
  
    constructor() {
      super();
    }

    nextMove(x: number, y: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 0;
      let yCoord = 0;
      let loop = true;

      while (loop == true) {
        // random search if no target ship has been found
        if (this.moves.length == 0 || lastHit == null) {
            xCoord = Math.floor(Math.random() * (x + 1));    // get ranndom int from 0 -> x
            yCoord = Math.floor(Math.random() * (y + 1));    // get random int from 0 -> y
        } else if (lastHit instanceof Coordinate) {          // if got a hit, target ship
            xCoord = lastHit.getX() - (Math.floor(Math.random() * (((x+4)-(x-4)+1) + (x-4)))); 
            yCoord = lastHit.getX() - (Math.floor(Math.random() * (((y+4)-(y-4)+1) + (y-4)))); 
        }

        // clamp to size of map
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

        // check if it's the location of a previous move
        if (this.moves.length == 0) {
          loop = false;             // if no moves have been made, must be valid
        } else {
          // for each move made, compare coordinates
          for (let i = 0; i < this.moves.length; i++) {
            if (xCoord != this.moves[i].getX() && yCoord != this.moves[i].getY()) {
              loop = false;         // if this move has been made before, choose another
            }
          }
        }
      }

      const newCoord = new Coordinate(xCoord,yCoord);
      this.moves.push(newCoord);
      return newCoord;
    }

    
}

export class MedOpponent extends Opponent {
    // chooses a random spot on the map to attack first
    // if hit, choose random spot within 3x3 grid to attack
    // continue until sunk
    // resume searching

    constructor() {
      super();
    }

    nextMove(x: number, y: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 0;
      let yCoord = 0;
      let loop = true;

      while (loop == true) {
        // random search if no target ship has been found
        if (this.moves.length == 0 || lastHit == null) {
            xCoord = Math.floor(Math.random() * (x + 1));    // get ranndom int from 0 -> x
            yCoord = Math.floor(Math.random() * (y + 1));    // get random int from 0 -> y
        } else if (lastHit instanceof Coordinate) {          // if got a hit, target ship
            xCoord = lastHit.getX() - (Math.floor(Math.random() * (((x+1)-(x-1)+1) + (x-1)))); 
            yCoord = lastHit.getX() - (Math.floor(Math.random() * (((y+1)-(y-1)+1) + (y-1)))); 
        }

        // clamp to size of map
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

        // check if it's the location of a previous move
        if (this.moves.length == 0) {
          loop = false;             // if no moves have been made, must be valid
        } else {
          // for each move made, compare coordinates
          for (let i = 0; i < this.moves.length; i++) {
            if (xCoord != this.moves[i].getX() && yCoord != this.moves[i].getY()) {
              loop = false;         // if this move has been made before, choose another
            }
          }
        }
      }

      const newCoord = new Coordinate(xCoord,yCoord);
      this.moves.push(newCoord);          // add to array of previous moves
      return newCoord;
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

    nextMove(x: number, y: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 0;
      let yCoord = 0;
      let loop = true;

      while (loop == true) {
        // random search if no target ship has been found
        if (this.moves.length == 0 || lastHit == null) {

            xCoord = Math.floor(Math.random() * (x + 1));    // get ranndom int from 0 -> x
            yCoord = Math.floor(Math.random() * (y + 1));    // get random int from 0 -> y

        } else if (lastHit instanceof Coordinate) {          // if got a hit, target ship

          // decide which axis to attack: x if aD == 0, y if aD == 1
          const axisDecider = Math.floor(Math.random() * (1-0 + 1) + 0);

          // decide which tile to attack on axis: left/down if dD == 0, up/right if dD == 1
          const directionDecider = Math.floor(Math.random() * (1-0 + 1) + 0);

          if (axisDecider == 0) {
            // attack horizontally adjacent tiles
            yCoord = lastHit.getY();      // copy y to get adjacent tiles
            if (directionDecider == 0) {
              xCoord = lastHit.getX() - 1;      // attack left
            } else if (directionDecider == 1) {
              xCoord = lastHit.getX() + 1;      // attack right
            }
          } else if (axisDecider == 1) {
            // attack vertically adjacent tiles
            xCoord = lastHit.getX();    // copy x to get adjacent tiles
            if (directionDecider == 0) {
              yCoord = lastHit.getY() - 1;      // attack below
            } else if (directionDecider == 1) {
              yCoord = lastHit.getY() + 1;      // attack above
            }
          }
        }

        // clamp to size of map
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

        // check if it's the location of a previous move
        if (this.moves.length == 0) {
          loop = false;             // if no moves have been made, must be valid
        } else {
          // for each move made, compare coordinates
          for (let i = 0; i < this.moves.length; i++) {
            if (xCoord != this.moves[i].getX() && yCoord != this.moves[i].getY()) {
              loop = false;         // if this move has been made before, choose another
            }
          }
        }
      }

      const newCoord = new Coordinate(xCoord,yCoord);
      this.moves.push(newCoord);          // add to array of previous moves
      return newCoord;
    }

    
}