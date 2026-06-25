class Chicken extends MovableObject {
    // #region properties

    y = 360;
    width = 70;
    height = 70;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    // #endregion

    // #region constructor

    // Creates a chicken enemy at the given x position.
    constructor(x) {
        super();
        this.x = x;
        this.speed = 0.6;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    // #endregion

    // #region animation

    // Moves and animates the chicken continuously.
    animate() {
        IntervalHub.setStoppableInterval(() => this.moveLeft(), 1000 / 60);
        IntervalHub.setStoppableInterval(() => this.playAnimation(this.IMAGES_WALKING), 200);
    }

    // #endregion
}
