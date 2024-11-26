import Opponent from './Opponent' 

class HardOpponent extends Opponent {
     /*
        1. Choose random from most common spaces until hit
            1a. If more than 40% of spaces are not hits, switch to true random
        2. Attack one of four adjacent spaces
        3. If hit, attack spaces parallel to created line
        4. Continue until sunk
        5. Repeat from 1
    */

    nextMove(): number[] {

        return[0,0]
    }

    
} export default HardOpponent;