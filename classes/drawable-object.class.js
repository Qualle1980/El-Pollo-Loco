class DrawableObject {
    x = 120;
    y = 180;
    width = 100;
    height = 250;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
