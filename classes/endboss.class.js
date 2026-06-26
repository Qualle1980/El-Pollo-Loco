import { MovableObject } from './movable-object.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';

export class Endboss extends MovableObject {
    // #region properties

    x = 2500;
    y = -40;
    width = 300;
    height = 500;
    hasHitCharacter = false;
    dead = false;
    deadAt = 0;
    IMAGES_ALERT = ImageHelper.CHICKEN_BOSS.alert;
    offset = {
        top: 60,
        right: 40,
        bottom: 0,
        left: 40
    };

    // #endregion

    // #region constructor

    // Creates the endboss and loads its alert animation.
    constructor() {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.animate();
    }

    // #endregion

    // #region animation

    // Plays the alert animation continuously.
    animate() {
        IntervalHelper.setStoppableInterval(() => this.playAnimation(this.IMAGES_ALERT), 200);
    }

    // Prevents the endboss from being removed like a chicken.
    kill() {}

    // #endregion
}
