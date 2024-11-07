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
        // Set background color
        this.renderer.background.set(0.5, 0.5, 0.9, 1);
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
    }

    update(deltaTime: number): void {
        // Game logic goes here
    }
}

const app = new App();
app.start();