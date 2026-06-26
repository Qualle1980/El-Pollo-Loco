export class Level {
    // #region properties

    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 1440;

    // #endregion

    // #region constructor

    // Creates a level with enemies, clouds, background objects and an end position.
    constructor(enemies, clouds, backgroundObjects, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.levelEndX = levelEndX;
    }

    // #endregion
}
