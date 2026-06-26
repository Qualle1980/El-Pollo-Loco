class Character extends MovableObject {
    // #region properties

    x = 120;
    y = 180;
    width = 100;
    height = 250;
    speed = 5;
    world;
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

    // #endregion

    // #region constructor

    // Creates the character and loads its animation images.
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    // #endregion

    // #region movement

    // Moves and animates the character based on pressed keys.
    animate() {
        IntervalHub.setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        IntervalHub.setStoppableInterval(() => this.playCharacter(), 100);
    }

    // Handles horizontal movement and jumping.
    moveCharacter() {
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

    // #region animation

    // Plays the current character animation.
    playCharacter() {
        if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
        else if (this.isMoving()) this.playAnimation(this.IMAGES_WALKING);
        else this.img = this.imageCache[this.IMAGES_WALKING[0]];
    }

    // Checks if the character is currently moving.
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    // #endregion
}
