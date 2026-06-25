class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}
