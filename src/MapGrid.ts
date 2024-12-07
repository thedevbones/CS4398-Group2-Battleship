

class MapGrid {
    private cols: number;
    private rows: number;

    constructor(c:number, r:number) {
        this.cols = c;
        this.rows = r;

        
    }

    getCols(): number {
        return this.cols
    }

    getRows(): number {
        return this.rows
    }

} export default MapGrid;