class DrawableObject {
    // #region properties

    x = 120;
    y = 180;
    width = 100;
    height = 250;
    img;
    imageCache = {};
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    // #endregion

    // #region collision rectangle

    // Returns the collision rectangle x position.
    get rX() {
        return this.x + this.offset.left;
    }

    // Returns the collision rectangle y position.
    get rY() {
        return this.y + this.offset.top;
    }

    // Returns the collision rectangle width.
    get rW() {
        return this.width - this.offset.left - this.offset.right;
    }

    // Returns the collision rectangle height.
    get rH() {
        return this.height - this.offset.top - this.offset.bottom;
    }

    // #endregion

    // #region image loading

    // Loads an image from the given path.
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    // Loads all images from the given array.
    loadImages(paths) {
        paths.forEach((path) => this.addImageToCache(path));
    }

    // Adds one image to the image cache.
    addImageToCache(path) {
        const img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }

    // #endregion

    // #region drawing

    // Draws the object on the canvas.
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // #endregion
}
