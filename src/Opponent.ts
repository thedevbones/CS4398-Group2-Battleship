import Coordinate from './Coordinate'

abstract class Opponent {
    private moves: Coordinate[];

    abstract nextMove(): Coordinate;
}

export class EasyOpponent extends Opponent {

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}

export class MedOpponent extends Opponent {

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}



class HardOpponent extends Opponent {

    nextMove(): Coordinate {

        return new Coordinate(0,0);
    }

    
}