import * as gfx from 'gophergfx';
import Ship from './Ship';
import Map from './Map';
import Coordinate from './Coordinate'
import {EasyOpponent, MedOpponent, HardOpponent} from './Opponent'

export class App extends gfx.GfxApp {
    private playerShips: Ship[];
    private aiShips: Ship[];
    private map: Map;

    constructor() {
        super();
        this.playerShips = [];
        this.aiShips = [];
        this.map = new Map(4, 4);
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
    }

    update(deltaTime: number): void {
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
        console.log(clickCoordinate);
    } 
}

const app = new App();
app.start();