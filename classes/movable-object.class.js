class MovableObject extends DrawableObject {
    // #region properties

    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    groundY = 180;

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

    // Makes the object jump.
    jump() {
        this.speedY = 25;
    }

    // Applies gravity to the object.
    applyGravity() {
        IntervalHub.setStoppableInterval(() => this.handleGravity(), 1000 / 25);
    }

    // Updates the vertical position while falling or jumping.
    handleGravity() {
        if (this.isAboveGround() || this.speedY > 0) this.moveVertically();
        if (!this.isAboveGround()) this.y = this.groundY;
    }

    // Moves the object vertically based on its y speed.
    moveVertically() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    // Checks if the object is above the ground.
    isAboveGround() {
        return this.y < this.groundY;
    }

    // #endregion

    // #region animation

    // Plays an animation by cycling through its image paths.
    playAnimation(images) {
        const imageIndex = this.currentImage % images.length;
        const imagePath = images[imageIndex];
        this.img = this.imageCache[imagePath];
        this.currentImage++;
    }

    // #endregion
}
