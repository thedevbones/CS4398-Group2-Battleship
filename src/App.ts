import * as gfx from 'gophergfx'


export class App extends gfx.GfxApp {
    constructor() {
        super();
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