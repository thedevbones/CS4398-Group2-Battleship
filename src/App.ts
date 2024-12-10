import * as gfx from 'gophergfx';
import Ship from './Ship';
import Map from './Map';
import Coordinate from './Coordinate';
import Button from './Button';
import { EasyOpponent, MedOpponent, HardOpponent } from './Opponent';

export class App extends gfx.GfxApp {
    private playerShips: Ship[];
    private aiShips: Ship[];
    private shipsPlaced: boolean;
    private menuDone: boolean;
    private selectedShip: Ship | null;

    private waterMaterial: gfx.Material2;
    private waterTextures: gfx.Texture[];

    private map: Map;
    private title: gfx.Mesh2;

    private startButton: Button;
    private difficultyButton: Button;
    private readyButton: Button;

    private hitDecal: gfx.Mesh2;
    private hitTextures: gfx.Texture[];
    private hitTextureIndex: number;
    
    private hitSound: HTMLAudioElement;
    private clickSound: HTMLAudioElement;

    constructor() {
        super();
        this.playerShips = [];
        this.aiShips = [];
        this.shipsPlaced = false;
        this.menuDone = false;

        this.waterMaterial = new gfx.Material2();
        this.waterTextures = [];

        this.title = gfx.Geometry2Factory.createBox(3, 0.5);
        this.startButton = new Button("START", 2, 0.25);
        this.difficultyButton = new Button("DIFFICULTY: EASY", 2, 0.25);
        this.readyButton = new Button("READY", 1, 0.1);
        this.readyButton.setStatus(false);
        for (let i = 1; i < 22; i++) {
            this.waterTextures.push(new gfx.Texture(`assets/ocean/ocean${i}.png`));
        }

        this.map = new Map(10, 10);
        this.selectedShip = null;

        this.hitDecal = gfx.Geometry2Factory.createBox(0.1, 0.1);
        this.hitTextures = [];
        this.hitTextureIndex = 0;
        for (let i = 0; i < 17; i++) {
            this.hitTextures.push(new gfx.Texture(`assets/hit/tile${i.toString().padStart(3, '0')}.png`));
        }

        this.hitSound = new Audio('assets/sfx_hit.wav');
        this.clickSound = new Audio('assets/sfx_click.mp3');
        
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

        // Initialize hit decal
        this.hitDecal.material.texture = this.hitTextures[0];
        this.hitDecal.material.texture.setMagFilter(false);
        this.hitDecal.layer = -1;
        this.hitDecal.visible = false;
        this.scene.add(this.hitDecal);
    }

    update(deltaTime: number): void {
        // Update water
        const textureIndex = Math.floor((Date.now() / 60) % this.waterTextures.length);
        this.waterMaterial.texture = this.waterTextures[textureIndex];

        // Update hit decal
        if (!this.hitDecal.visible) {
            return;
        }
        // If frames left to animate, update texture
        if (this.hitTextureIndex < 15) {
            // Change texture every 3 frames
            if (Date.now() % 3 === 0) {
                this.hitTextureIndex++;
                this.hitDecal.material.texture = this.hitTextures[this.hitTextureIndex];
            }
        // If animation is done, hide the decal
        } else {
            this.hitDecal.visible = false;
            this.hitTextureIndex = 0;
            this.hitDecal.material.texture = this.hitTextures[this.hitTextureIndex];
        }
    }

    loadGame(): void {
        // Remove buttons
        this.startButton.getMesh().remove();
        this.difficultyButton.getMesh().remove();
        this.menuDone = true;

        // Create ready button
        this.readyButton.setStatus(true);
        this.readyButton.setPosition(0.8, -0.6);
        this.scene.add(this.readyButton.getMesh());

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

        // Define ship lengths
        const shipLengths = [5, 4, 3, 3, 2];

        // Create player ships
        let targetY = 0.25;
        for (let length of shipLengths) {
            const playerShip = new Ship(length, 1, [new Coordinate(5,5)]); // Assuming width is always 1
            this.playerShips.push(playerShip);
            playerShip.getMesh().position.set(-0.8, targetY);
            targetY -= 0.2;
            this.scene.add(playerShip.getMesh());
        }

        this.aiShips = [new Ship (1, 1, [new Coordinate(3, 4)]), new Ship (2, 1, [new Coordinate(2, 7), new Coordinate(2, 6)]),  new Ship (3, 1, [new Coordinate(1, 1), new Coordinate(1,2), new Coordinate(1,3)]),  new Ship (4, 1, [new Coordinate(8,9), new Coordinate(8,9), new Coordinate(7,9), new Coordinate(6,9)]), new Ship (5, 1, [new Coordinate(4, 5), new Coordinate(5, 5), new Coordinate (6, 5), new Coordinate (7,5), new Coordinate(8,5)])];

        // Create grid and grid values
        const grid = new gfx.Node2();
        const numRows = this.map.getY();
        const numCols = this.map.getX();
        const cellSize = 0.1;
        const gridOffsetX = -(numCols * cellSize) / 2;
        const gridOffsetY = -(numRows * cellSize) / 2 - 0.2;

        // Add vertical lines to grid
        for (let i = 0; i <= numCols; i++) {    
            const line = new gfx.Line2();
            line.layer = -1;
            line.setVertices([
                i * cellSize + gridOffsetX, gridOffsetY,
                i * cellSize + gridOffsetX, numRows * cellSize + gridOffsetY
            ]);
            setTimeout(() => {  
                grid.add(line);
            }, 50 * i);
        }

        // Add horizontal lines to grid
        for (let j = 0; j <= numRows; j++) {
            const line = new gfx.Line2();
            line.layer = -1;
            line.setVertices([
                gridOffsetX, j * cellSize + gridOffsetY,
                numCols * cellSize + gridOffsetX, j * cellSize + gridOffsetY
            ]);
            setTimeout(() => {
                grid.add(line);
            }, 50 * j);
        }

        // Add water tiles to grid
        this.waterMaterial.texture = this.waterTextures[0];
        this.waterMaterial.drawMode = 5
        
        for (let i = 0; i < numCols; i++) {
            for (let j = 0; j < numRows; j++) {
                let waterTile = new gfx.Mesh2();
                waterTile = gfx.Geometry2Factory.createBox(0.1, 0.1);
                waterTile.position.set(i * cellSize + gridOffsetX + 0.05, j * cellSize + gridOffsetY + 0.05);
                waterTile.material = this.waterMaterial;
                waterTile.layer = 0;
                setTimeout(() => {
                    grid.add(waterTile);
                }, 50 * (i + j));
                
            }
        }

        this.scene.add(grid)
    }

    ready(): void {
        // Remove ready button
        this.readyButton.getMesh().remove();

        // Hide player ships
        for (let ship of this.playerShips) {
            ship.getMesh().remove();
        }

        // Add enemy ships
        let targetY = 0.25;
        for (let ship of this.aiShips) {
            ship.getMesh().position.set(0.8, targetY);
            ship.getMesh().material.color = gfx.Color.RED;
            targetY -= 0.2;
            //this.scene.add(ship.getMesh());
        }

        // Set shipsPlaced to true
        this.shipsPlaced = true;
    }

    onMouseDown(event: MouseEvent): void {
        //this.clickSound.play();
        
        // get click tuple in screen coordinates
        const mousePosition = new gfx.Vector2(event.x, event.y);
        const clickX = event.x;
        const clickY = event.y;

        // convert to coordinate of map grid
        const gridX = clickX / this.map.getX();
        const gridY = clickY / this.map.getY();

        const clickCoordinate = new Coordinate(gridX, gridY);
        
        // Check if mouse collides with any button mesh
        if (!this.menuDone && !this.shipsPlaced) {
            this.startButton.checkClick(mousePosition);
            this.difficultyButton.checkClick(mousePosition);
            return;
        }
        if (!this.shipsPlaced) {
            this.readyButton.checkClick(mousePosition);
            return;
        }

        // Check if a ship is clicked
        for (let ship of app.playerShips) {
            if (ship.checkClick(mousePosition)) {
                if (this.selectedShip === ship) {
                    this.selectedShip.snapToGrid();
                    if (this.selectedShip.isInBounds()) { this.selectedShip = null; } // Deselect the ship
                } else if (this.selectedShip === null) {
                    this.selectedShip = ship; // Select the ship
                }
                return;
            }
        }

        // If a ship is selected, move it to the new position
        if (this.selectedShip) {
            this.selectedShip.getMesh().position.set(gridX, gridY);
            this.selectedShip = null; // Deselect after moving
        }

        let hit = false;
        for (let i in this.aiShips) {
          this.aiShips[i].hit(clickCoordinate);
          for (let j in this.aiShips[i].locationArray) {
            if (this.aiShips[i].locationArray[j].getTuple() == clickCoordinate.getTuple()) {
              hit = true;
            }
          }
        }

        
        if (!this.hitSound.paused) {
            this.hitSound.pause();
            this.hitSound.currentTime = 0;
        }

        if (hit == true) {
            this.showHitDecal(clickX, clickY);
            this.hitSound.play();
          }
        
    }

    showHitDecal(x: number, y: number): void {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        x = (x / screenWidth) * 2 - 1;
        y = -(y / screenHeight) * 2 + 1;

        this.hitDecal.position.set(x, y);
        this.hitDecal.visible = true;
    }

    onMouseMove(event: MouseEvent): void {
        if (this.selectedShip) {
            const clickX = (event.clientX / window.innerWidth) * 2 - 1;
            const clickY = -(event.clientY / window.innerHeight) * 2 + 1;
            this.selectedShip.getMesh().position.set(clickX, clickY);
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        // If user presses 'r', rotate the selected ship
        if (event.key === 'r' && this.selectedShip) {
            this.selectedShip.rotate();
        }
    }

    public static onStart(): void {
        app.loadGame();
    }

    public static onChangeDifficulty(): void {
        const options = ['EASY', 'MED', 'HARD'];
        let currentDifficulty = app.difficultyButton.getText().split(' ')[1];
        let nextDifficulty = options[(options.indexOf(currentDifficulty) + 1) % options.length];
        app.difficultyButton.setText(`DIFFICULTY: ${nextDifficulty}`);
    }

    public static onReady(): void {
        // Check if all ships are placed
        let allShipsPlaced = true;
        for (let ship of app.playerShips) {
            if (!ship.isInBounds()) {
                allShipsPlaced = false;
            }
        }

        if (allShipsPlaced) {
            app.ready();
        } else {
            console.log('Place all ships before starting the game');
        }
    }
}

const app = new App();
app.start();