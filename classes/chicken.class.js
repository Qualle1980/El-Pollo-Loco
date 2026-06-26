class Chicken extends MovableObject {
    // #region properties

    y = 360;
    width = 70;
    height = 70;
    hasHitCharacter = false;
    dead = false;
    deadAt = 0;
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    };
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    // #endregion

    // #region constructor

    // Creates a chicken enemy at a random x position.
    constructor(position = 0) {
        super();
        this.x = 600 + position * 300 + Math.random() * 150;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.addImageToCache(this.IMAGE_DEAD);
        this.animate();
    }

    // #endregion

    // #region animation

    // Moves and animates the chicken continuously.
    animate() {
        IntervalHelper.setStoppableInterval(() => this.moveChicken(), 1000 / 60);
        IntervalHelper.setStoppableInterval(() => this.playChicken(), 200);
    }

    // Moves the chicken while it is alive.
    moveChicken() {
        if (!this.dead) this.moveLeft();
    }

    // Plays the matching chicken image.
    playChicken() {
        if (this.dead) this.img = this.imageCache[this.IMAGE_DEAD];
        else this.playAnimation(this.IMAGES_WALKING);
    }

    // Marks the chicken as dead.
    kill() {
        this.dead = true;
        this.deadAt = new Date().getTime();
    }

    // #endregion
}
