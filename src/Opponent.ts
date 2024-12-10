import Coordinate from './Coordinate'
import Ship from './Ship'

abstract class Opponent {
    protected moves: Coordinate[];

    constructor() {
      this.moves = [];  // Initialize in the constructor
    }

    // Concrete implementation of nextMove
    nextMove(lastHit: Coordinate | null): Coordinate {
      let newMove: Coordinate | null = null;

      // If lastHit is null, generate a random Coordinate
      if (lastHit === null) {
          newMove = this.generateRandomCoordinate();
      } else {
          // If lastHit is not null, generate a new move around it
          newMove = this.generateNearbyCoordinate(lastHit);
      }

      // Ensure the new coordinate is not a duplicate of one already in moves[]
      while (this.isDuplicate(newMove)) {
          if (lastHit === null) {
              newMove = this.generateRandomCoordinate();
          } else {
              newMove = this.generateNearbyCoordinate(lastHit);
          }
      }

      return newMove!;
  }

  // Generates a random Coordinate, assuming the grid is within certain bounds (e.g., 0-9 for both X and Y)
  protected generateRandomCoordinate(): Coordinate {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      return new Coordinate(x, y);
  }

  protected getRandomValInRange(min: number, max: number): number {
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    return x;
}

  // Generates a coordinate near the lastHit, within a range of 2 units up/down in both x and y directions
  protected generateNearbyCoordinate(lastHit: Coordinate): Coordinate {
      const x = lastHit.getX();
      const y = lastHit.getY();

      // Generate new coordinates within a range of 2 above or below
      let newX = x + (Math.floor(Math.random() * 5) - 2); // Range [-2, 2]
      let newY = y + (Math.floor(Math.random() * 5) - 2); // Range [-2, 2]

      // Ensure the new coordinates are within the valid grid bounds
      newX = Math.max(0, Math.min(newX, 9)); // Assuming the grid size is 0-9
      newY = Math.max(0, Math.min(newY, 9)); // Assuming the grid size is 0-9

      return new Coordinate(newX, newY);
  }

  // Checks if the new coordinate is already in the moves[] array
  protected isDuplicate(newMove: Coordinate): boolean {
      for (const move of this.moves) {
          if (move.getTuple()[0] === newMove.getTuple()[0] && move.getTuple()[1] === newMove.getTuple()[1]) {
              return true;
          }
      }
      return false;
  }

    placeShips(maxX:number, maxY:number, lengths:number[]): Ship[] {
      let shipArray: Ship[] = [];
      let coordArray: Coordinate[] = [];
      for (let i in lengths)  {
        // don't use outside portion of map
        const minXPlacement = 0+Math.floor((maxX/5)+1);
        const maxXPlacement = maxX-Math.floor((maxX/5)+1);
        const minYPlacement = 0+Math.floor((maxY/5)+1);
        const maxYPlacement = maxY-Math.floor((maxY/5)+1);


        let xCoord = this.getRandomValInRange(minXPlacement, maxXPlacement);
        let yCoord = this.getRandomValInRange(minYPlacement, maxYPlacement);

        coordArray.push(new Coordinate(xCoord,yCoord));

        if (lengths[i] > 1) {
          // 0 = horizontal direction, 1 = vertical direction
          const axisDecider = this.getRandomValInRange(0,1);

          for (let k = 0; k < lengths[i]; k++) {          // repeat for full length of ship [i]

            // 0 = left, 1 = right
            const directionDecider = this.getRandomValInRange(0,1);

            // find coordinate in coordArray with smallest value (x or y)
            let minCoord = new Coordinate(maxX, maxY);    // initialize to max values

            // find coordinate in coordArray with largest value (x or y)
            let maxCoord = new Coordinate(0, 0);          // initialize to min values

            if (axisDecider == 0) {     // horizontal
              
            // find current max and min values on x axis
              for (let j in coordArray) {
                if (coordArray[j].getX() < minCoord.getX()) {
                  minCoord = coordArray[j];
                }
                if (coordArray[j].getX() > maxCoord.getX()) {
                  maxCoord = coordArray[j];
                }
              }


              if (directionDecider == 0) {
                xCoord = minCoord.getX()-1;
              } else if (directionDecider == 1) {
                xCoord = maxCoord.getX()+1;
              }

            } else if (axisDecider == 1) {    // vertical

              // find current max and min values on y axis
              for (let j in coordArray) {
                if (coordArray[j].getY() < minCoord.getY()) {
                  minCoord = coordArray[j];
                }
                if (coordArray[j].getY() > maxCoord.getY()) {
                  maxCoord = coordArray[j];
                }
              }

              if (directionDecider == 0) {
                xCoord = minCoord.getY()-1;
              } else if (directionDecider == 1) {
                xCoord = maxCoord.getX()+1;
              }

            }

            // validate new coordinate
            let validChecker = true;

            for (let j in coordArray) {
              if (!coordArray[j].isValid(minXPlacement, minYPlacement, minXPlacement, maxXPlacement)) {
                validChecker = false;
              }

              // check for duplicate in array of this ship's coordinates
              if (coordArray[j].getX() == xCoord && coordArray[j].getY() == yCoord) {
                validChecker = false;
              }
            }
            
            if (validChecker == true) {
              coordArray.push(new Coordinate(xCoord,yCoord));
            } else {
              k--;      // try to place again
            }
          }
        }

        shipArray.push(new Ship(lengths[i], 1, coordArray));
      }
      return shipArray;
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


    
}

export class MedOpponent extends Opponent {
    // chooses a random spot on the map to attack first
    // if hit, choose random spot within 3x3 grid to attack
    // continue until sunk
    // resume searching

    constructor() {
      super();
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
    
}