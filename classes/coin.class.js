import { CollectibleObject } from './collectible-object.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';

export class Coin extends CollectibleObject {
    // #region properties

    width = 100;
    height = 100;
    IMAGES_IDLE = ImageHelper.COIN.idle;
    offset = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    };

    // #endregion

    // #region constructor

    // Creates a coin at the given position.
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
    }

    // #endregion

    // #region animation

    // Plays the coin animation continuously.
    animate() {
        IntervalHelper.setStoppableInterval(() => this.playCoin(), 300);
    }

    // Shows the next coin image.
    playCoin() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    // #endregion
}
