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
        if (this.world.keyboard.RIGHT) this.moveRight();
        if (this.world.keyboard.LEFT) this.moveLeft();
    }

    // #endregion
}
