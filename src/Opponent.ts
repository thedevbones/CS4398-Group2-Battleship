import Coordinate from './Coordinate'
import Ship from './Ship'

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
    abstract nextMove(maxX: number, maxY: number, lastHit: Coordinate | null): Coordinate;

    abstract placeShips(maxX: number, maxY:number, lengths:number[]) : Ship[];

    getRandomValInRange(max: number, min: number): number {
      const random = Math.floor(Math.random() * ((max-min+1) + min)); 
      return random;
    }

}

export class EasyOpponent extends Opponent {
  // chooses a random spot on the map to attack first
  // if hit, choose random spot within 5x5 grid to attack
  // continue until sunk
  // resume searching
  
    constructor() {
      super();
    }

    nextMove(maxX: number, maxY: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 0;
      let yCoord = 0;
      let loop = false;

      do {
        // random search if no target ship has been found
        if (this.moves.length == 0 || lastHit == null) {
            xCoord = this.getRandomValInRange(0, maxX);    // get ranndom int from 0 -> maxX
            yCoord = this.getRandomValInRange(0, maxY);    // get random int from 0 -> ,axY
        } else if (lastHit instanceof Coordinate) {          // if got a hit, target ship
            xCoord = lastHit.getX() - this.getRandomValInRange(lastHit.getX()-2, lastHit.getX()+2); 
            yCoord = lastHit.getY() - this.getRandomValInRange(lastHit.getY()-2, lastHit.getY()+2); 
        }

        // clamp to size of map
        if (xCoord < 0) {
          xCoord = 0;
        } else if (xCoord > maxX) {
          xCoord = maxX;
        }
        if (yCoord < 0) {
          yCoord = 0;
        } else if (yCoord > maxY) {
          yCoord = maxY;
        }

        // check if it's the location of a previous move
        if (this.moves.length != 0) {       // if no moves have been made, it can't be a duplicate
            // for each move made, compare coordinates
            for (let i in this.moves) {
              if (xCoord != this.moves[i].getX() && yCoord != this.moves[i].getY()) {
                loop = true;         // if this move has been made before, choose another
              }
            }
        }
      } while (loop == true);

      const newCoord = new Coordinate(xCoord,yCoord);
      this.moves.push(newCoord);
      return newCoord;
    }

    placeShips(maxX:number, maxY:number, lengths:number[]): Ship[] {
      let shipArray: Ship[] = [];
      let coordArray: Coordinate[] = [];
      for (let i in lengths)  {
        // don't use outside portion of map
        let xCoord = this.getRandomValInRange(0+Math.floor((maxX/5)+1), maxX-Math.floor((maxX/5)+1));
        let yCoord = this.getRandomValInRange(0+Math.floor((maxY/5)+1), maxX-Math.floor((maxY/5)+1));

        coordArray.push(new Coordinate(xCoord,yCoord));

        if (lengths[i] > 1) {
          // 0 = horizontal direction, 1 = vertical direction
          const axisDecider = this.getRandomValInRange(0,1);
          for (let j = 0; j < lengths[i]; j++) {
            // 0 = left, 1 = right
            const directionDecider = this.getRandomValInRange(0,1);
            
          }
        }

        shipArray.push(new Ship(lengths[i], 1, coordArray));
      }
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

    nextMove(maxX: number, maxY: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 0;
      let yCoord = 0;
      let loop = false;

      do {
        // random search if no target ship has been found
        if (this.moves.length == 0 || lastHit == null) {
            xCoord = this.getRandomValInRange(0, maxX);    // get ranndom int from 0 -> maxX
            yCoord = this.getRandomValInRange(0, maxY);    // get random int from 0 -> ,axY
        } else if (lastHit instanceof Coordinate) {          // if got a hit, target ship
            xCoord = lastHit.getX() - this.getRandomValInRange(lastHit.getX()-1, lastHit.getX()+1); 
            yCoord = lastHit.getY() - this.getRandomValInRange(lastHit.getY()-1, lastHit.getY()+1); 
        }

        // clamp to size of map
        if (xCoord < 0) {
          xCoord = 0;
        } else if (xCoord > maxX) {
          xCoord = maxX;
        }
        if (yCoord < 0) {
          yCoord = 0;
        } else if (yCoord > maxY) {
          yCoord = maxY;
        }

        // check if it's the location of a previous move
        if (this.moves.length != 0) {       // if no moves have been made, it can't be a duplicate
            // for each move made, compare coordinates
            for (let i in this.moves) {
              if (xCoord != this.moves[i].getX() && yCoord != this.moves[i].getY()) {
                loop = true;         // if this move has been made before, choose another
              }
            }
        }
      } while (loop == true);

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

    nextMove(maxX: number, maxY: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 0;
      let yCoord = 0;
      let loop = false;

      do {
        // random search if no target ship has been found
        if (this.moves.length == 0 || lastHit == null) {
            xCoord = this.getRandomValInRange(0, maxX);    // get ranndom int from 0 -> maxX
            yCoord = this.getRandomValInRange(0, maxY);    // get random int from 0 -> ,axY
        } else if (lastHit instanceof Coordinate) {          // if got a hit, target ship
            xCoord = lastHit.getX() - this.getRandomValInRange(lastHit.getX()-2, lastHit.getX()+2); 
            yCoord = lastHit.getY() - this.getRandomValInRange(lastHit.getY()-2, lastHit.getY()+2); 
        }

        // clamp to size of map
        if (xCoord < 0) {
          xCoord = 0;
        } else if (xCoord > maxX) {
          xCoord = maxX;
        }
        if (yCoord < 0) {
          yCoord = 0;
        } else if (yCoord > maxY) {
          yCoord = maxY;
        }

        // check if it's the location of a previous move
        if (this.moves.length != 0) {       // if no moves have been made, it can't be a duplicate
            // for each move made, compare coordinates
            for (let i in this.moves) {
              if (xCoord != this.moves[i].getX() && yCoord != this.moves[i].getY()) {
                loop = true;         // if this move has been made before, choose another
              }
            }
        }
      } while (loop == true);

      const newCoord = new Coordinate(xCoord,yCoord);
      this.moves.push(newCoord);          // add to array of previous moves
      return newCoord;
    }

    
}