import * as gfx from 'gophergfx';
import Ship from './Ship';

export class App extends gfx.GfxApp {
    private playerShips: Ship[];
    private aiShips: Ship[];
    private waterMaterial: gfx.Material2;
    private waterTextures: gfx.Texture[];

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
    }

    createScene(): void {       
        // Set background color
        this.renderer.background.set(0.5, 0.5, 0.9, 1);
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

        // Create grid of water
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                let waterTile = new gfx.Mesh2();
                waterTile = gfx.Geometry2Factory.createBox(0.1, 0.1);
                waterTile.position.set(i * 0.1, j * 0.1);
                waterTile.material = this.waterMaterial;
                this.scene.add(waterTile);
            }
        }
    }

    update(deltaTime: number): void {
        // Update water
        const textureIndex = Math.floor((Date.now() / 60) % this.waterTextures.length);
        this.waterMaterial.texture = this.waterTextures[textureIndex];

        // Game logic goes here
    }
}

const app = new App();
app.start();