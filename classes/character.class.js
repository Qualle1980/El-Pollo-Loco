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

    // #endregion

    // #region constructor

    // Creates the character and loads its walking images.
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    // #endregion

    // #region movement

    // Moves and animates the character based on pressed keys.
    animate() {
        IntervalHub.setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        IntervalHub.setStoppableInterval(() => this.playCharacter(), 100);
    }

    // Handles horizontal character movement.
    moveCharacter() {
        if (this.canMoveRight()) this.moveRight();
        if (this.canMoveLeft()) this.moveLeft();
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
        return this.world.keyboard.RIGHT && this.x < this.world.canvas.width - this.width;
    }

    // Checks if the character can move left.
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    // #endregion

    // #region animation

    // Plays the walking animation while the character moves.
    playCharacter() {
        if (this.isMoving()) this.playAnimation(this.IMAGES_WALKING);
    }

    // Checks if the character is currently moving.
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    // #endregion
}
