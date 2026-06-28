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
    damage = 20;
    speed = 0.4;
    world;
    isMoving = false;
    IMAGES_WALKING = ImageHelper.CHICKEN_BOSS.walk;
    IMAGES_ALERT = ImageHelper.CHICKEN_BOSS.alert;
    IMAGES_HURT = ImageHelper.CHICKEN_BOSS.hurt;
    IMAGES_DEAD = ImageHelper.CHICKEN_BOSS.dead;
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
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    // #endregion

    // #region animation

    // Plays the matching endboss animation.
    animate() {
        IntervalHelper.setStoppableInterval(() => this.moveEndboss(), 1000 / 60);
        IntervalHelper.setStoppableInterval(() => this.playEndboss(), 200);
    }

    // Selects the animation for the current endboss state.
    playEndboss() {
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.isMoving) this.playAnimation(this.IMAGES_WALKING);
        else this.playAnimation(this.IMAGES_ALERT);
    }

    // Moves the endboss when the character is nearby.
    moveEndboss() {
        this.isMoving = this.canMoveEndboss();
        if (this.isMoving) this.moveLeft();
    }

    // Checks if the endboss should start moving.
    canMoveEndboss() {
        return this.world && !this.dead && this.world.character.x > this.x - 600;
    }

    // Marks the endboss as dead.
    kill() {
        this.dead = true;
        this.deadAt = new Date().getTime();
    }

    // #endregion
}
