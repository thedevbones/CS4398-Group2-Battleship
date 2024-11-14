class Ship {
    private length: number;
    private width: number;
    private hitArray: number[][];
    private sunk: boolean;

    constructor(l:number, w:number) {
        this.length = l;
        this.width = w;
        this.hitArray = Array.from({ length: l }, () => Array<number>(w).fill(0));
        this.sunk = false;
    }

    hit(x:number, y:number) {
        this.hitArray[x][y] = 1;
    }

    isSunk() {
        let sunkChecker = true;

        // iterate through columns
        for (let i in this.hitArray) {

            // iterate through column i's rows
            for (let j in this.hitArray) {

                // if any square is not hit, ship is not sunk
                if (this.hitArray[i][j] == 0) {
                    sunkChecker = false;
                }
            }
        }
        return sunkChecker;
    }

} export default Ship;