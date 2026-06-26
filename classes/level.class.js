export class Level {
    // #region properties

    enemies;
    clouds;
    backgroundObjects;
    coins;
    levelEndX = 1440;

    // #endregion

    // #region constructor

    // Creates a level with enemies, clouds, coins, background objects and an end position.
    constructor(enemies, clouds, backgroundObjects, coins, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.levelEndX = levelEndX;
    }

    // #endregion
}
