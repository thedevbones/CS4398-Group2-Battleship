import * as gfx from 'gophergfx';
import Ship from './Ship';
import Map from './Map';
import Coordinate from './Coordinate';
import Button from './Button';

export class App extends gfx.GfxApp {
    private playerShips: Ship[];
    private aiShips: Ship[];
    private waterMaterial: gfx.Material2;
    private waterTextures: gfx.Texture[];
    private map: Map;

    constructor() {
        super();
        this.playerShips = [];
        this.aiShips = [];
        this.waterMaterial = new gfx.Material2();
        this.waterTextures = [];
        for (let i = 1; i < 22; i++) {
            this.waterTextures.push(new gfx.Texture(`assets/ocean/ocean${i}.png`));
        }
        console.log(this.waterTextures);
        this.map = new Map(10, 10);
    }

    createScene(): void {       
        // Set background color
        this.renderer.background.set(0.1, 0.1, 0.1, 1);

        // Create title header
        const titleText = new gfx.Text("BATTLESHIP", 90, 10, "Arial", gfx.Color.WHITE);
        let title = new gfx.Mesh2();
        title = gfx.Geometry2Factory.createBox(3, 0.5);
        title.position.set(0, 0.6);
        title.material.texture = titleText;
        title.material.texture.setMagFilter(false);
        this.scene.add(title);

        // Create start button
        const startButton = new Button("START", 2, 0.25);
        startButton.setPosition(0, 0);
        this.scene.add(startButton.getMesh());

        // TODO: Create a difficulty and start button
        // and move this code after the onClick event

        /*
        this.waterMaterial.texture = this.waterTextures[0];
        this.waterMaterial.drawMode = 5

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
        const numRows = this.map.getWidth();
        const numCols = this.map.getLength();
        const cellSize = 0.1;
        const gridOffsetX = -(numCols * cellSize) / 2;
        const gridOffsetY = -(numRows * cellSize) / 2;

        // Create grid of water
        for (let i = 0; i < numCols; i++) {
            for (let j = 0; j < numRows; j++) {
                let waterTile = new gfx.Mesh2();
                waterTile = gfx.Geometry2Factory.createBox(0.1, 0.1);
                waterTile.position.set(i * cellSize + gridOffsetX + 0.05, j * cellSize + gridOffsetY + 0.05);
                waterTile.material = this.waterMaterial;
                this.scene.add(waterTile);
            }
        }

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
        */
    }

    update(deltaTime: number): void {
        // Update water
        const textureIndex = Math.floor((Date.now() / 60) % this.waterTextures.length);
        this.waterMaterial.texture = this.waterTextures[textureIndex];

        // Game logic goes here
    }

    onMouseDown(event: MouseEvent): void {
        // get click tuple in screen coordinates
        const clickX = event.x;
        const clickY = event.y;

        // convert to coordinate of map grid
        const gridX = clickX / this.map.getWidth();
        const gridY = clickY / this.map.getLength();

        const clickCoordinate = new Coordinate(gridX, gridY);
        
        //debug
        console.log(clickCoordinate);
    } 
}

const app = new App();
app.start();