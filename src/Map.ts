class Map {
  private length: number;
  private width: number;

  constructor(l:number, w:number) {
    this.length = l;
    this.width = w;
  }

  isValid() {
    // min grid size = 4x4
    const minX = 4;
    const minY = 4;
    // max grid size = 30x30
    const maxX = 30;
    const maxY = 30;
      
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }


} export default Map;