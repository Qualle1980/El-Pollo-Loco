class Character extends MovableObject {
    // #region properties

    x = 120;
    y = 180;
    width = 100;
    height = 250;
    speed = 5;
    world;

    // #endregion

    // #region constructor

    // Creates the character and loads its start image.
    constructor() {
        super();
        this.loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
        this.animate();
    }

    // #endregion

    // #region movement

    // Moves the character based on pressed keys.
    animate() {
        IntervalHub.setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
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
}
