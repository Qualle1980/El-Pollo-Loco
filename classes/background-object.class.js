import { MovableObject } from './movable-object.class.js';

/**
 * Represents one background layer in the game world.
 * @class
 */
export class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    y = 0;

    /**
     * Creates a background layer at the given x position.
     * @param {string} imagePath - The path of the background image.
     * @param {number} x - The x position of the background layer.
     */
    constructor(imagePath, x) {
        super();
        this.x = x;
        this.loadImage(imagePath);
    }

}
