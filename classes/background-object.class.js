class BackgroundObject extends MovableObject {
    // #region properties

    width = 720;
    height = 480;
    y = 0;

    // #endregion

    // #region constructor

    // Creates a background layer at the given x position.
    constructor(imagePath, x) {
        super();
        this.x = x;
        this.loadImage(imagePath);
    }

    // #endregion
}
