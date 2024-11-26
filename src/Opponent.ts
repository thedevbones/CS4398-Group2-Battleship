import Coordinate from './Coordinate'

abstract class Opponent {
    private moves: Coordinate[];

    constructor() {
      this.moves = [];  // Initialize in the constructor
    }

    abstract nextMove(): Coordinate;
}

export class EasyOpponent extends Opponent {
  
    constructor() {
      super();
    }

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}

export class MedOpponent extends Opponent {

    constructor() {
      super();
    }

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}



export class HardOpponent extends Opponent {

    constructor() {
      super();
    }

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}