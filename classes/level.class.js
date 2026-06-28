export class Level {
    // #region properties

    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEndX = 1440;

    // #endregion

    // #region constructor

    // Creates a level with enemies, clouds, items, background objects and an end position.
    constructor(enemies, clouds, backgroundObjects, coins, bottles, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.levelEndX = levelEndX;
    }

    // #endregion
}
