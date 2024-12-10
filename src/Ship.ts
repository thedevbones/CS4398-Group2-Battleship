import * as gfx from 'gophergfx';
import Coordinate from './Coordinate'
class Ship {
    private length: number;
    private width: number;
    private hitArray: number[];
    public locationArray: Coordinate[];
    private sunk: boolean;
    private mesh: gfx.Mesh2;
    private isHorizontal: boolean;


    constructor(l:number, w:number, coordinates:Coordinate[]) {
      this.length = l;
      this.width = w;
      this.hitArray = Array<number>(l*w).fill(0);    // initialize all hit indicators in array to 0
      this.locationArray = [...coordinates];          // copy incoming aray for safekeeping
      this.sunk = false;
      this.mesh = gfx.Geometry2Factory.createBox(l * 0.1, w * 0.1);
        this.mesh.material = new gfx.Material2();
        this.mesh.material.texture = new gfx.Texture(`assets/ships/ship-length-${l}.png`);
        this.mesh.material.texture.setMagFilter(false);
        this.mesh.material.drawMode = 5;
      this.mesh.layer = -1;
      this.isHorizontal = true;
  }

    getMesh(): gfx.Mesh2 {
        return this.mesh;
    }

    hit(coord: Coordinate): void {
        for (let i in this.locationArray) {
          if (this.locationArray[i].getTuple() == coord.getTuple()) {
            // if hit coordinate matches a location coordinate, change hitArray indicator
            this.hitArray[i] = 1;
          }
        }
    }

    isSunk(): boolean {
        let sunkChecker = true;

        // iterate through columns
        for (let i in this.hitArray) {    // iterate through hit array
          if (this.hitArray[i] == 0) {
            sunkChecker = false;          // if any location is not hit, ship is not sunk
          }
        }
        return sunkChecker;
    }

    snapToGrid(): void {
        // Offset the ship depending on its length and orientation
        const offsetX = (this.isHorizontal && this.length % 2 == 0) ? 0 : 0.05;
        const offsetY = (this.isHorizontal || this.length % 2 != 0) ? 0.05 : 0;

        // Snap the ship to the nearest grid position
        const gridX = Math.round(this.mesh.position.x * 10) / 10 + offsetX;
        const gridY = Math.floor(this.mesh.position.y * 10) / 10 + offsetY;

        if (!this.isInBounds()) {
            return;
        } 
        this.mesh.position.set(gridX, gridY);
    }

    rotate(): void {
        this.isHorizontal = !this.isHorizontal;
        this.mesh.rotation += Math.PI / 2;
    }

    public isInBounds(): boolean {
        // TODO: Check if ships is within bounds of the grid
        return true;
    }

    checkClick(mousePosition: gfx.Vector2): boolean {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const adjustedMousePosition = new gfx.Vector2(
            (mousePosition.x / screenWidth) * 2 - 1,
            1 - (mousePosition.y / screenHeight) * 2
        );
        mousePosition = adjustedMousePosition;

        const radius = 0.01;
        const circle = gfx.Geometry2Factory.createCircle(radius);
        circle.position = mousePosition;
        
        const intersects = circle.intersects(this.mesh);
        circle.remove();
        return intersects;
    }

} export default Ship;