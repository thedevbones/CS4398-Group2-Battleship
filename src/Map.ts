class Map {
  private x: number;
  private y: number;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  isValid() {
    // min grid size = 4x4
    const minX = 4;
    const minY = 4;
    // max grid size = 30x30
    const maxX = 30;
    const maxY = 30;

    let result = true;
    if (this.x > maxX) {
        result = false;
    } else if (this.y > maxY) {
        result = false;
    } else if (this.x < minX || this.x < 1) {
        result = false;
    } else if (this.y < minY || this.y < 1) {
        result = false;
    }
    return result;
      
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }


} export default Map;