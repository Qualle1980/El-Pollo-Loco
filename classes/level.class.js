/**
 * Stores all objects and the end position of one level.
 * @class
 */
export class Level {

    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEndX = 1440;

    /**
     * Creates a level with enemies, clouds, items, background objects and an end position.
     * @param {MovableObject[]} enemies - The enemies in the level.
     * @param {Cloud[]} clouds - The clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - The background layers in the level.
     * @param {Coin[]} coins - The collectable coins in the level.
     * @param {Bottle[]} bottles - The collectable bottles in the level.
     * @param {number} levelEndX - The x position where the level ends.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.levelEndX = levelEndX;
    }

}
