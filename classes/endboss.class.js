import { MovableObject } from './movable-object.class.js';
import { ImageHelper } from '../helper_classes/image-helper.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';

/**
 * Represents the stronger endboss enemy.
 * @class
 */
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
    approachSoundPlayed = false;
    approachSound = SoundHelper.createSound('./audio/endboss/endbossApproach.wav', false, 1);
    IMAGES_WALKING = ImageHelper.CHICKEN_BOSS.walk;
    IMAGES_ALERT = ImageHelper.CHICKEN_BOSS.alert;
    IMAGES_ATTACK = ImageHelper.CHICKEN_BOSS.attack;
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

    /**
     * Creates the endboss and loads all endboss animations.
     * @param {number} x - The x position of the endboss.
     */
    constructor(x = 2500) {
        super();
        this.x = x;
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
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
        else if (this.canAttack()) this.playAnimation(this.IMAGES_ATTACK);
        else if (this.isMoving) this.playAnimation(this.IMAGES_WALKING);
        else this.playAnimation(this.IMAGES_ALERT);
    }

    // Moves the endboss when the character is nearby.
    moveEndboss() {
        this.isMoving = this.canMoveEndboss();
        if (this.isMoving) this.startEndbossMovement();
    }

    /**
     * Checks if the endboss should start moving.
     * @returns {boolean} True if the character is close enough.
     */
    canMoveEndboss() {
        return this.world && !this.dead && (this.approachSoundPlayed || this.world.character.x > this.x - 600);
    }

    /**
     * Moves the endboss and starts its approach sound once.
     */
    startEndbossMovement() {
        this.playApproachSound();
        this.moveTowardsCharacter();
    }

    /**
     * Moves the endboss in the direction of the character.
     */
    moveTowardsCharacter() {
        if (this.isCharacterOnRightSide()) return this.moveRightToCharacter();
        this.moveLeftToCharacter();
    }

    /**
     * Checks if the character is on the right side of the endboss.
     * @returns {boolean} True if the character is right of the endboss.
     */
    isCharacterOnRightSide() {
        return this.world.character.x > this.x;
    }

    /**
     * Moves the endboss to the right and turns it around.
     */
    moveRightToCharacter() {
        this.otherDirection = true;
        this.moveRight();
    }

    /**
     * Moves the endboss to the left and uses its normal direction.
     */
    moveLeftToCharacter() {
        this.otherDirection = false;
        this.moveLeft();
    }

    // Plays the approach sound only once.
    playApproachSound() {
        if (this.approachSoundPlayed) return;
        SoundHelper.playSound(this.approachSound);
        this.approachSoundPlayed = true;
    }

    /**
     * Checks if the character is close enough for an attack.
     * @returns {boolean} True if the endboss can attack.
     */
    canAttack() {
        return this.world && !this.dead && this.getCharacterDistance() < 180;
    }

    /**
     * Returns the horizontal distance to the character.
     * @returns {number} The distance between character and endboss.
     */
    getCharacterDistance() {
        return Math.abs(this.world.character.x - this.x);
    }

    // Marks the endboss as dead.
    kill() {
        this.dead = true;
        this.deadAt = new Date().getTime();
    }

    // #endregion
}
