import { MovableObject } from './movable-object.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';

export class ThrowableObject extends MovableObject {
    // #region properties

    width = 50;
    height = 60;
    groundY = 380;
    bottleAboveGround = false;
    bottleFlying = false;
    breakSound = SoundHelper.createSound('./audio/throwable/bottleBreak.mp3');
    IMAGES_ROTATION = ImageHelper.BOTTLE.rotation;

    // #endregion

    // #region constructor

    // Creates a throwable bottle and starts its movement.
    constructor(x, y, otherDirection) {
        super();
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.throw();
        this.animate();
    }

    // #endregion

    // #region movement

    // Throws the bottle in the character direction.
    throw() {
        this.speedY = 30;
        this.bottleAboveGround = true;
        this.bottleFlying = true;
        if (this.otherDirection) this.x -= 100;
        this.applyGravity();
        IntervalHelper.setStoppableInterval(() => this.moveBottle(), 25);
    }

    // Moves the bottle horizontally.
    moveBottle() {
        if (!this.bottleFlying) return;
        if (this.otherDirection) this.x -= 10;
        else this.x += 10;
    }

    // Stops the bottle when it hits the ground.
    setOnGround() {
        super.setOnGround();
        this.breakBottle();
    }

    // Stops the bottle and plays its break sound once.
    breakBottle() {
        if (!this.bottleFlying) return;
        this.bottleFlying = false;
        this.bottleAboveGround = false;
        SoundHelper.playSound(this.breakSound);
    }

    // #endregion

    // #region animation

    // Plays the bottle rotation animation.
    animate() {
        IntervalHelper.setStoppableInterval(() => this.playFlyingBottle(), 150);
    }

    // Plays the animation while the bottle is flying.
    playFlyingBottle() {
        if (this.bottleFlying) this.playAnimation(this.IMAGES_ROTATION);
    }

    // #endregion
}
