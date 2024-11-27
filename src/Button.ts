import * as gfx from 'gophergfx';

class Button {
    private mesh: gfx.Mesh2;
    private text: string;
    private width: number;
    private height: number;

    constructor(text: string, width: number, height: number) {
        this.text = text;
        this.width = width;
        this.height = height;
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
    
} export default Button;