import * as gfx from 'gophergfx';
class Ship {
    private length: number;
    private width: number;
    private hitArray: number[][];
    private sunk: boolean;
    private mesh: gfx.Mesh2;

    constructor(l:number, w:number) {
        this.length = l;
        this.width = w;
        this.hitArray = Array.from({ length: l }, () => Array<number>(w).fill(0));
        this.sunk = false;
        this.mesh = gfx.Geometry2Factory.createBox(l * 0.1, w * 0.1);
        this.mesh.layer = -1;
    }

    getMesh(): gfx.Mesh2 {
        return this.mesh;
    }

    hit(x:number, y:number): void {
        this.hitArray[x][y] = 1;
    }

    isSunk(): boolean {
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

    checkClick(mousePosition: gfx.Vector2): boolean {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const adjustedMousePosition = new gfx.Vector2(
            (mousePosition.x / screenWidth) * 2 - 1,
            1 - (mousePosition.y / screenHeight) * 2
        );
        mousePosition = adjustedMousePosition;

        const radius = 0.005;
        const circle = gfx.Geometry2Factory.createCircle(radius);
        circle.position = mousePosition;
        
        const intersects = circle.intersects(this.mesh);
        circle.remove();
        return intersects;
    }

} export default Ship;