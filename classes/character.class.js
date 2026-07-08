import { MovableObject } from './movable-object.class.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';

export class Character extends MovableObject {
    // #region properties

    x = 120;
    y = 180;
    width = 100;
    height = 250;
    speed = 5;
    coins = 0;
    bottles = 0;
    maxBottles = 5;
    idleImageIndex = 0;
    idleFrameCounter = 0;
    longIdleImageIndex = 0;
    longIdleFrameCounter = 0;
    lastAction = new Date().getTime();
    deadImageIndex = 0;
    jumpSound = SoundHelper.createSound('./audio/character/characterJump.wav');
    damageSound = SoundHelper.createSound('./audio/character/characterDamage.mp3');
    world;
    offset = {
        top: 80,
        right: 20,
        bottom: 10,
        left: 20
    };
    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    // #endregion

    // #region constructor

    // Creates the character and loads its animation images.
    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    // #endregion

    // #region movement

    // Moves and animates the character based on pressed keys.
    animate() {
        IntervalHelper.setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        IntervalHelper.setStoppableInterval(() => this.playCharacter(), 100);
    }

    // Handles horizontal movement and jumping.
    moveCharacter() {
        if (this.isDead()) return;
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
        if (this.canJump()) this.jump();
        this.updateCamera();
    }

    // Moves the character right and sets its direction.
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
    }

    // Moves the character left and sets its direction.
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
    }

    // Makes the character jump and plays its jump sound.
    jump() {
        super.jump();
        SoundHelper.playSound(this.jumpSound);
    }

    // Checks if the character can move right.
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.levelEndX;
    }

    // Checks if the character can move left.
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    // Checks if the character can jump.
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }

    // Updates the world camera position.
    updateCamera() {
        this.world.cameraX = -this.x + 120;
    }

    // #endregion

    // #region collecting

    // Increases the collected coin amount.
    collectCoin() {
        this.coins++;
    }

    // Increases the collected bottle amount.
    collectBottle() {
        if (this.canCollectBottle()) this.bottles++;
    }

    // Checks if another bottle can be collected.
    canCollectBottle() {
        return this.bottles < this.maxBottles;
    }

    // Reduces the collected bottle amount after throwing.
    throwBottle() {
        if (this.bottles > 0) this.bottles--;
    }

    // #endregion

    // #region damage

    // Damages the character and plays its hurt sound.
    hit(damage = this.damage) {
        super.hit(damage);
        if (!this.isDead()) SoundHelper.playSound(this.damageSound);
    }

    // #endregion

    // #region animation

    // Plays the current character animation.
    playCharacter() {
        if (this.isDead()) this.playDeathAnimation();
        else if (this.isHurt()) this.playMovingAnimation(this.IMAGES_HURT);
        else if (this.isAboveGround()) this.playMovingAnimation(this.IMAGES_JUMPING);
        else if (this.isMoving()) this.playMovingAnimation(this.IMAGES_WALKING);
        else this.playIdleAnimation();
    }

    // Plays an active animation and resets the idle sequence.
    playMovingAnimation(images) {
        this.resetIdleAnimations();
        this.playAnimation(images);
    }

    // Plays the idle animation once and keeps the last image.
    playIdleAnimation() {
        if (!this.isIdle()) return;
        if (this.isLongIdle()) return this.playLongIdleAnimation();
        if (this.waitForIdleFrame()) return;
        const lastIndex = this.IMAGES_IDLE.length - 1;
        const imagePath = this.IMAGES_IDLE[this.idleImageIndex];
        this.img = this.imageCache[imagePath];
        if (this.idleImageIndex < lastIndex) this.idleImageIndex++;
    }

    // Slows down the idle animation to about two seconds.
    waitForIdleFrame() {
        this.idleFrameCounter++;
        if (this.idleFrameCounter >= 2) this.idleFrameCounter = 0;
        return this.idleFrameCounter !== 0;
    }

    // Plays the sleeping animation once and keeps the last image.
    playLongIdleAnimation() {
        if (this.waitForLongIdleFrame()) return;
        const imageIndex = this.longIdleImageIndex % this.IMAGES_LONG_IDLE.length;
        const imagePath = this.IMAGES_LONG_IDLE[imageIndex];
        this.img = this.imageCache[imagePath];
        this.longIdleImageIndex++;
    }

    // Slows down the long idle animation.
    waitForLongIdleFrame() {
        this.longIdleFrameCounter++;
        if (this.longIdleFrameCounter >= 2) this.longIdleFrameCounter = 0;
        return this.longIdleFrameCounter !== 0;
    }

    // Checks if the character has been idle long enough to sleep.
    isLongIdle() {
        return new Date().getTime() - this.lastAction > 4000;
    }

    // Checks if the character has been idle long enough.
    isIdle() {
        return new Date().getTime() - this.lastAction > 2000;
    }

    // Resets idle animations after an action.
    resetIdleAnimations() {
        this.lastAction = new Date().getTime();
        this.idleImageIndex = 0;
        this.idleFrameCounter = 0;
        this.longIdleImageIndex = 0;
        this.longIdleFrameCounter = 0;
    }

    // Plays the death animation once and keeps the last image.
    playDeathAnimation() {
        const lastIndex = this.IMAGES_DEAD.length - 1;
        const imagePath = this.IMAGES_DEAD[this.deadImageIndex];
        this.img = this.imageCache[imagePath];
        if (this.deadImageIndex < lastIndex) this.deadImageIndex++;
    }

    // Checks if the character is currently moving.
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    // #endregion
}
