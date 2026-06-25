class MovableObject extends DrawableObject {
    // #region properties

    speed = 0.15;
    otherDirection = false;
    currentImage = 0;

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
