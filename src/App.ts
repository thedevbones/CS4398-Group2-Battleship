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
        // Scene setup goes here
    }

    update(deltaTime: number): void {
        // Game logic goes here
    }
}

const app = new App();
app.start();