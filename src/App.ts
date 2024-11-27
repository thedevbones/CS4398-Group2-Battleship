import * as gfx from 'gophergfx';
import Ship from './Ship';
import Map from './Map';
import Coordinate from './Coordinate';
import Button from './Button';
import { EasyOpponent, MedOpponent, HardOpponent } from './Opponent';

export class App extends gfx.GfxApp {
    private playerShips: Ship[];
    private aiShips: Ship[];
    private waterMaterial: gfx.Material2;
    private waterTextures: gfx.Texture[];
    private map: Map;
    private title: gfx.Mesh2;
    private startButton: Button;
    private difficultyButton: Button;

    constructor() {
        super();
        this.playerShips = [];
        this.aiShips = [];
        this.waterMaterial = new gfx.Material2();
        this.waterTextures = [];
        this.title = gfx.Geometry2Factory.createBox(3, 0.5);
        this.startButton = new Button("START", 2, 0.25);
        this.difficultyButton = new Button("DIFFICULTY: EASY", 2, 0.25);
        for (let i = 1; i < 22; i++) {
            this.waterTextures.push(new gfx.Texture(`assets/ocean/ocean${i}.png`));
        }
        this.map = new Map(10, 10);
    }

    createScene(): void {       
        // Set background color
        this.renderer.background.set(0.1, 0.1, 0.1, 1);

        // Create title header
        const titleText = new gfx.Text("BATTLESHIP", 90, 10, "Arial", gfx.Color.WHITE);
        
        this.title.position.set(0, 0.7);
        this.title.material.texture = titleText;
        this.title.material.texture.setMagFilter(false);
        this.scene.add(this.title);

        // Create start button
        this.startButton.setPosition(0, 0);
        this.scene.add(this.startButton.getMesh());

        // Create difficulty button
        this.difficultyButton.setPosition(0, -0.5);
        this.scene.add(this.difficultyButton.getMesh());

        // TODO: Create a difficulty and start button
        // and move this code after the onClick event

        
    }

    update(deltaTime: number): void {
        // Update water
        const textureIndex = Math.floor((Date.now() / 60) % this.waterTextures.length);
        this.waterMaterial.texture = this.waterTextures[textureIndex];

        // Game logic goes here
    }

    loadGame(): void {
        // Remove buttons
        this.startButton.getMesh().remove();
        this.difficultyButton.getMesh().remove();

        // Initialize oppenent
        let opponent;
        let difficulty = this.difficultyButton.getText().split(' ')[1];
        switch (difficulty) {
            case 'EASY':
                opponent = new EasyOpponent();
                break;
            case 'MED':
                opponent = new MedOpponent();
                break;
            case 'HARD':
                opponent = new HardOpponent();
                break;
            default:
                opponent = new EasyOpponent();
        }

        // Set water material
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

        // Create grid of water
        for (let i = 0; i < numCols; i++) {
            for (let j = 0; j < numRows; j++) {
                let waterTile = new gfx.Mesh2();
                waterTile = gfx.Geometry2Factory.createBox(0.1, 0.1);
                waterTile.position.set(i * cellSize + gridOffsetX + 0.05, j * cellSize + gridOffsetY + 0.05);
                waterTile.material = this.waterMaterial;
                setTimeout(() => {
                    this.scene.add(waterTile);
                }, 50 * (i + j));
            }
        }
    }

    onMouseDown(event: MouseEvent): void {
        // Check if mouse collides with any button mesh
        const mousePosition = new gfx.Vector2(event.clientX, event.clientY);
        this.startButton.checkMouseOverButton(mousePosition);
        this.difficultyButton.checkMouseOverButton(mousePosition);

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

    public static start(): void {
        app.loadGame();
    }

    public static changeDifficulty(): void {
        const options = ['EASY', 'MED', 'HARD'];
        let currentDifficulty = app.difficultyButton.getText().split(' ')[1];
        let nextDifficulty = options[(options.indexOf(currentDifficulty) + 1) % options.length];
        app.difficultyButton.setText(`DIFFICULTY: ${nextDifficulty}`);
    }
}

const app = new App();
app.start();