import Opponent from './Opponent' 

class MedOpponent extends Opponent {
     /*
        1. Choose random until hit
        2. Attack one of 4 adjacent spaces
        3. Continue (2) until sink
        4. Repeat from (1)
    */

    nextMove(): number[] {

        return[0,0]
    }

    
} export default MedOpponent;