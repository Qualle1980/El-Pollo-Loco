/**
 * Base class for all objects that can be drawn on the canvas.
 * @class
 */
export class DrawableObject {
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

    /**
     * Returns the collision rectangle x position.
     * @returns {number} The x position of the collision rectangle.
     */
    get rX() {
        return this.x + this.offset.left;
    }

    /**
     * Returns the collision rectangle y position.
     * @returns {number} The y position of the collision rectangle.
     */
    get rY() {
        return this.y + this.offset.top;
    }

    /**
     * Returns the collision rectangle width.
     * @returns {number} The width of the collision rectangle.
     */
    get rW() {
        return this.width - this.offset.left - this.offset.right;
    }

    /**
     * Returns the collision rectangle height.
     * @returns {number} The height of the collision rectangle.
     */
    get rH() {
        return this.height - this.offset.top - this.offset.bottom;
    }

    // #endregion

    // #region image loading

    /**
     * Loads an image from the given path.
     * @param {string} path - The image path.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads all images from the given array.
     * @param {string[]} paths - The image paths.
     */
    loadImages(paths) {
        paths.forEach((path) => this.addImageToCache(path));
    }

    /**
     * Adds one image to the image cache.
     * @param {string} path - The image path.
     */
    addImageToCache(path) {
        const img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    }

    // #endregion

    // #region drawing

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // #endregion
}
