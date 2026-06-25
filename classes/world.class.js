class World {
    character = new Character();
    canvas;
    ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.character.img.onload = () => this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.character.draw(this.ctx);
    }
}
