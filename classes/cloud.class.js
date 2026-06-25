class Cloud extends MovableObject {
    // #region properties

    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    // #endregion

    // #region constructor

    // Creates a cloud at the given x position.
    constructor(x) {
        super();
        this.x = x;
        this.loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    // #endregion

    // #region animation

    // Moves the cloud continuously to the left.
    animate() {
        IntervalHub.setStoppableInterval(() => this.moveLeft(), 1000 / 60);
    }

    // #endregion
}
