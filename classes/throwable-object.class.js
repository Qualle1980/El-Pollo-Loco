import { MovableObject } from './movable-object.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';

/**
 * Represents a thrown salsa bottle.
 * @class
 */
export class ThrowableObject extends MovableObject {
    // #region properties

    width = 50;
    height = 60;
    groundY = 380;
    bottleAboveGround = false;
    bottleFlying = false;
    bottleSplashing = false;
    splashImageIndex = 0;
    breakSound = SoundHelper.createSound('./audio/throwable/bottleBreak.mp3');
    IMAGES_ROTATION = ImageHelper.BOTTLE.rotation;
    IMAGES_SPLASH = ImageHelper.BOTTLE.splash;

    // #endregion

    // #region constructor

    /**
     * Creates a throwable bottle and starts its movement.
     * @param {number} x - The start x position.
     * @param {number} y - The start y position.
     * @param {boolean} otherDirection - True if the bottle is thrown to the left.
     */
    constructor(x, y, otherDirection) {
        super();
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
        this.animate();
    }

    // #endregion

    // #region movement

    /**
     * Throws the bottle in the character direction.
     */
    throw() {
        this.speedY = 30;
        this.bottleAboveGround = true;
        this.bottleFlying = true;
        if (this.otherDirection) this.x -= 100;
        this.applyGravity();
        IntervalHelper.setStoppableInterval(() => this.moveBottle(), 25);
    }

    /**
     * Moves the bottle horizontally.
     */
    moveBottle() {
        if (!this.bottleFlying) return;
        if (this.otherDirection) this.x -= 10;
        else this.x += 10;
    }

    /**
     * Stops the bottle when it hits the ground.
     */
    setOnGround() {
        super.setOnGround();
        this.breakBottle();
    }

    /**
     * Stops the bottle and plays its break sound once.
     */
    breakBottle() {
        if (!this.bottleFlying) return;
        this.bottleFlying = false;
        this.bottleAboveGround = false;
        this.bottleSplashing = true;
        this.splashImageIndex = 0;
        SoundHelper.playSound(this.breakSound);
    }

    // #endregion

    // #region animation

    /**
     * Plays the bottle animation.
     */
    animate() {
        IntervalHelper.setStoppableInterval(() => this.playBottleAnimation(), 100);
    }

    /**
     * Plays the matching bottle animation.
     */
    playBottleAnimation() {
        if (this.bottleFlying) this.playAnimation(this.IMAGES_ROTATION);
        if (this.bottleSplashing) this.playSplashAnimation();
    }

    /**
     * Plays the splash animation once.
     */
    playSplashAnimation() {
        if (this.splashImageIndex >= this.IMAGES_SPLASH.length) {
            this.bottleSplashing = false;
            return;
        }
        const imagePath = this.IMAGES_SPLASH[this.splashImageIndex];
        this.img = this.imageCache[imagePath];
        this.splashImageIndex++;
    }

    // #endregion
}
