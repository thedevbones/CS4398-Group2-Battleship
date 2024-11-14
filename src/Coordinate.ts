class Coordinate {
    x: number;
    y: number;
  
    constructor(X: number, Y: number) {
      this.x = X;
      this.y = Y;
    }

    /*
        function isValid(num, num, num, num)

        Return type: bool
        Return value: Indicates if this Coordinate is valid point on current map

        Parameters:
            minX    Lowest x-value of map grid
            minY    Lowest y-value of map grid
            maxX    Highest x-value of map grid
            maxY    Highest y-value of map grid
    */
    isValid(minX: number, minY:number, maxX: number, maxY: number) {
        let result = true;
        if (this.x > maxX) {
            result = false;
        } else if (this.y > maxY) {
            result = false;
        } else if (this.x < minX) {
            result = false;
        } else if (this.y < minY) {
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
    getTuple() {
        return [this.x,this.y];
    }

  } export default Coordinate;