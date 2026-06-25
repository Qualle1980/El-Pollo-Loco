class DrawableObject {
    // #region properties

    x = 120;
    y = 180;
    width = 100;
    height = 250;
    img;

    // #endregion

    // #region image loading

    // Loads an image from the given path.
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // #endregion

    // #region drawing

    // Draws the object on the canvas.
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // #endregion
}
