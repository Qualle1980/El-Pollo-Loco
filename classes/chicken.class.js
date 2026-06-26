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
    constructor() {
        super();
        this.x = 200 + Math.random() * 500;
        this.speed = 0.6;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.addImageToCache(this.IMAGE_DEAD);
        this.animate();
    }

    // #endregion

    // #region animation

    // Moves and animates the chicken continuously.
    animate() {
        IntervalHub.setStoppableInterval(() => this.moveChicken(), 1000 / 60);
        IntervalHub.setStoppableInterval(() => this.playChicken(), 200);
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
