import Map from './Map'

class Coordinate {
    private x: number;
    private y: number;
  
    constructor(X: number, Y: number) {
      this.x = X;
      this.y = Y;
    }

    /*
        isValid(num, num, num, num)

        Return type: bool
        Return value: Indicates if this Coordinate is valid point on current map

        Parameters:
            minX    Lowest x-value of map grid
            minY    Lowest y-value of map grid
            maxX    Highest x-value of map grid
            maxY    Highest y-value of map grid
    */
    isValid(minX: number, minY:number, maxX: number, maxY: number): boolean {
        let result = true;
        if (this.x > maxX) {
            result = false;
        } else if (this.y > maxY) {
            result = false;
        } else if (this.x < minX || this.x < 0) {
            result = false;
        } else if (this.y < minY || this.y < 0) {
            result = false;
        }
        return result;
    }

    /*
        function getTuple()

        Return type: number[]
        Return value: 2 values, x and y, indicating position of coordinate

        Parameters: none
    */
    getTuple() : number[] {
        return [this.x,this.y];
    }

    getX() : number {
      return this.x;
    }

    getY() : number {
      return this.y;
    }

  } export default Coordinate;