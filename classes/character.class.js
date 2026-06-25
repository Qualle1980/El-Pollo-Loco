class Character extends MovableObject {
    // #region properties

    x = 120;
    y = 180;
    width = 100;
    height = 250;

    // #endregion

    // #region constructor

    // Creates the character and loads its start image.
    constructor() {
        super();
        this.loadImage('./assets/img/2_character_pepe/2_walk/W-21.png');
    }

    // #endregion
}
