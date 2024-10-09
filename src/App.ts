import * as gfx from 'gophergfx';
import Ship from './Ship';

export class App extends gfx.GfxApp {
    private playerShips: Ship[];
    private aiShips: Ship[];

    constructor() {
        super();
        this.playerShips = [];
        this.aiShips = [];
    }

    createScene(): void {
        // Define ship lengths
        const shipLengths = [5, 4, 3, 3, 2];

        // Create player ships
        for (let length of shipLengths) {
            const playerShip = new Ship(length, 1); // Assuming width is always 1
            this.playerShips.push(playerShip);
        }

        // Create enemy ships
        for (let length of shipLengths) {
            const enemyShip = new Ship(length, 1); // Assuming width is always 1
            this.aiShips.push(enemyShip);
        }

        // Create grid
        const numRows = 10;
        const numCols = 10;
        const cellSize = 0.1;
        const gridOffsetX = -(numCols * cellSize) / 2;
        const gridOffsetY = -(numRows * cellSize) / 2;

        // vertical lines
        for (let i = 0; i <= numCols; i++) {
            const line = new gfx.Line2();
            line.setVertices([
                i * cellSize + gridOffsetX, gridOffsetY,
                i * cellSize + gridOffsetX, numRows * cellSize + gridOffsetY
            ]);
            this.scene.add(line);
        }

        // horizontal lines
        for (let j = 0; j <= numRows; j++) {
            const line = new gfx.Line2();
            line.setVertices([
                gridOffsetX, j * cellSize + gridOffsetY,
                numCols * cellSize + gridOffsetX, j * cellSize + gridOffsetY
            ]);
            this.scene.add(line);
        }

    }

    update(deltaTime: number): void {
        // Game logic goes here
    }
}

const app = new App();
app.start();