class MovableObject extends DrawableObject {
    // #region properties

    speed = 0.15;
    otherDirection = false;
    currentImage = 0;
    speedY = 0;
    acceleration = 2.5;
    groundY = 180;
    energy = 100;
    lastHit = 0;
    damage = 10;

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

    // #region collision

    // Checks if this object touches another object.
    isColliding(object) {
        return this.rX + this.rW > object.rX &&
            this.rY + this.rH > object.rY &&
            this.rX < object.rX + object.rW &&
            this.rY < object.rY + object.rH;
    }

    // Checks if this object touches another object from above.
    isCollidingFromAbove(object) {
        return this.isColliding(object) && this.speedY < 0;
    }

    // #endregion

    // #region damage

    // Reduces energy and stores the hit time.
    hit() {
        this.energy -= this.damage;
        if (this.energy < 0) this.energy = 0;
        this.lastHit = new Date().getTime();
    }

    // Checks if the object was recently hit.
    isHurt() {
        const timePassed = new Date().getTime() - this.lastHit;
        return timePassed / 1000 < 0.5;
    }

    // Checks if the object has no energy left.
    isDead() {
        return this.energy === 0;
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
