import * as gfx from 'gophergfx';
import { App } from './App';

class Button {
    private mesh: gfx.Mesh2;
    private text: string;
    private width: number;
    private height: number;
    private enabled: boolean;

    constructor(text: string, width: number, height: number) {
        this.text = text;
        this.width = width;
        this.height = height;
        this.enabled = true;
        this.mesh = gfx.Geometry2Factory.createBox(width, height);
        this.mesh.material.texture = new gfx.Text(text, 90, 10, "Arial", gfx.Color.WHITE);
        this.mesh.material.texture.setMagFilter(false);
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        this.text = text;
    }

    public getSize(): { width: number, height: number } {
        return { width: this.width, height: this.height };
    }

    public getMesh(): gfx.Mesh2 {
        return this.mesh;
    }

    public setSize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.mesh = gfx.Geometry2Factory.createBox(width, height);
    }

    public setPosition(x: number, y: number): void {
        this.mesh.position.set(x, y);
    }

    public checkMouseOverButton(mousePosition: gfx.Vector2): void {
        if (!this.enabled) {
            return;
        }

        const bounds = this.mesh.worldBoundingBox;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const adjustedMousePosition = new gfx.Vector2(
            (mousePosition.x / screenWidth) * 2 - 1,
            1 - (mousePosition.y / screenHeight) * 2
        );
        mousePosition = adjustedMousePosition;

        if (mousePosition.x >= bounds.min.x && mousePosition.x <= bounds.max.x && mousePosition.y >= bounds.min.y && mousePosition.y <= bounds.max.y) {
            this.click();
        }
    }

    public click(): void {
        this.enabled = false;
        this.mesh.material.texture = new gfx.Text(this.text, 90, 10, "Arial", gfx.Color.RED);
        this.mesh.material.texture.setMagFilter(false);
        
        if (this.text.toLowerCase() === 'start') {
            setTimeout(() => {
                this.mesh.material.texture = new gfx.Text(this.text, 90, 10, "Arial", gfx.Color.WHITE);
                this.mesh.material.texture.setMagFilter(false);
                App.start();
            }, 200);
        } else if (this.text.startsWith('DIFFICULTY')) {
            setTimeout(() => {
                this.mesh.material.texture = new gfx.Text(this.text, 90, 10, "Arial", gfx.Color.WHITE);
                this.mesh.material.texture.setMagFilter(false);
                this.enabled = true;
                App.changeDifficulty();
            }, 200);
        }
    }
    
} export default Button;