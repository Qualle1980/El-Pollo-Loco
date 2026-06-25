class Chicken extends MovableObject {
    // #region properties

    y = 360;
    width = 70;
    height = 70;

    // #endregion

    // #region constructor

    // Creates a chicken enemy at the given x position.
    constructor(x) {
        super();
        this.x = x;
        this.speed = 0.5 + Math.random() * 0.5;
        this.loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.animate();
    }

    // #endregion

    // #region animation

    // Moves the chicken continuously to the left.
    animate() {
        IntervalHub.setStoppableInterval(() => this.moveLeft(), 1000 / 60);
    }

    // #endregion
}
