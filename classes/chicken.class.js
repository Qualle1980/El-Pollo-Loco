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
        this.loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }

    // #endregion
}
