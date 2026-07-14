import { MovableObject } from './movable-object.class.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';

/**
 * Represents a moving cloud in the background.
 * @class
 */
export class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    /**
     * Creates a cloud at the given x position.
     * @param {number} x - The x position of the cloud.
     */
    constructor(x) {
        super();
        this.x = x;
        this.loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    /**
     * Moves the cloud continuously to the left.
     */
    animate() {
        IntervalHelper.setStoppableInterval(() => this.moveLeft(), 1000 / 60);
    }

}
