import { CollectibleObject } from './collectible-object.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

export class Bottle extends CollectibleObject {
    // #region properties

    y = 360;
    width = 100;
    height = 90;
    IMAGES_GROUND = ImageHelper.BOTTLE.ground;
    offset = {
        top: 10,
        right: 40,
        bottom: 5,
        left: 40
    };

    // #endregion

    // #region constructor

    // Creates a bottle at the given x position.
    constructor(x) {
        super();
        this.x = x;
        this.loadImage(this.getRandomBottleImage());
    }

    // #endregion

    // #region images

    // Returns one random bottle ground image.
    getRandomBottleImage() {
        const index = Math.floor(Math.random() * this.IMAGES_GROUND.length);
        return this.IMAGES_GROUND[index];
    }

    // #endregion
}
