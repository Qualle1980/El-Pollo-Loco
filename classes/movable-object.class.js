class MovableObject extends DrawableObject {
    // #region properties

    speed = 0.15;
    otherDirection = false;

    // #endregion

    // #region movement

    // Moves the object to the right.
    moveRight() {
        this.x += this.speed;
    }

    // Moves the object to the left.
    moveLeft() {
        this.x -= this.speed;
    }

    // #endregion
}
