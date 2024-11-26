import Opponent from './Opponent' 

class EasyOpponent extends Opponent {

    /*
        1. Choose random until hit
        2. Choose next space within surrounding 6(+?) spaces
        3. Continue (2) until sink
        4. Repeat from (1)
    */

    nextMove(): number[] {

        return[0,0]
    }

    
} export default EasyOpponent;