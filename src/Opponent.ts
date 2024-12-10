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

}

export class EasyOpponent extends Opponent {
  // chooses a random spot on the map to attack first
  // if hit, choose random spot within 5x5 grid to attack
  // continue until sunk
  // resume searching
  
    constructor() {
      super();
    }

    getRandomValInRange(max: number, min: number): number {
      const random = Math.floor(Math.random() * ((max-min+1) + min)); 
      return random;
    }

    

    nextMove(maxX: number, maxY: number, lastHit: Coordinate | null): Coordinate {
      let xCoord = 2;
      let yCoord = 2;
      let loop = false;

      do {
        // random search if no target ship has been found
        if (this.moves.length == 0 || lastHit == null) {
            xCoord = (Math.floor(Math.random() * (maxX - 0 + 1)) + 0);    // get ranndom int from 0 -> maxX
            yCoord = (Math.floor(Math.random() * (maxY - 0 + 1)) + 0);    // get random int from 0 -> ,axY
        } else if (lastHit instanceof Coordinate) {          // if got a hit, target ship
            xCoord = lastHit.getX() + this.getRandomValInRange(lastHit.getX()-2, lastHit.getX()+2); 
            yCoord = lastHit.getY() + this.getRandomValInRange(lastHit.getY()-2, lastHit.getY()+2); 
        }

        console.log("Before:  ", xCoord, "  ", yCoord);
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
        console.log("After:  ", xCoord, "  ", yCoord);

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

export class MedOpponent extends Opponent {
    // chooses a random spot on the map to attack first
    // if hit, choose random spot within 3x3 grid to attack
    // continue until sunk
    // resume searching

    constructor() {
      super();
    }

    getRandomValInRange(max: number, min: number): number {
      const random = Math.floor(Math.random() * ((max-min+1) + min)); 
      return random;
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



export class HardOpponent extends Opponent {
  // chooses a random spot on the map to attack first
  // if hit, attack adjacent squares until next hit
  // on next hit, attack only squares within that line
  // continue until sunk
  // resume searching

    constructor() {
      super();
    }

    getRandomValInRange(max: number, min: number): number {
      const random = Math.floor(Math.random() * ((max-min+1) + min)); 
      return random;
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

    placeShips(maxX:number, maxY:number, lengths:number[]): Ship[] {
      let shipArray: Ship[] = [];
      let coordArray: Coordinate[] = [];
      for (let i in lengths)  {
        const minXPlacement = 0;
        const maxXPlacement = maxX;
        const minYPlacement = 0;
        const maxYPlacement = maxY;


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