import { Level } from '../classes/level.class.js';
import { Chicken } from '../classes/chicken.class.js';
import { SmallChicken } from '../classes/small-chicken.class.js';
import { Endboss } from '../classes/endboss.class.js';
import { Cloud } from '../classes/cloud.class.js';
import { BackgroundObject } from '../classes/background-object.class.js';
import { Coin } from '../classes/coin.class.js';
import { Bottle } from '../classes/bottle.class.js';

/**
 * Creates a fresh first level for a new game.
 * @returns {Level} The first game level.
 */
export function createLevel1() {
    return new Level(createEnemies(), createClouds(), createBackgroundObjects(), createCoins(), createBottles(), 5040);
}

/**
 * Creates all enemies for the first level.
 * @returns {MovableObject[]} The level enemies.
 */
function createEnemies() {
    return [
        new Chicken(0),
        new SmallChicken(1),
        new Chicken(2),
        new SmallChicken(3),
        new Chicken(5),
        new SmallChicken(6),
        new Chicken(8),
        new SmallChicken(9),
        new Chicken(10),
        new Endboss(3940)
    ];
}

/**
 * Creates all clouds for the first level.
 * @returns {Cloud[]} The level clouds.
 */
function createClouds() {
    return [
        new Cloud(100),
        new Cloud(500),
        new Cloud(900),
        new Cloud(1500),
        new Cloud(2300),
        new Cloud(3100),
        new Cloud(3800)
    ];
}

/**
 * Creates all background layers for the first level.
 * @returns {BackgroundObject[]} The level background layers.
 */
function createBackgroundObjects() {
    const backgroundObjects = [];
    [-720, 0, 720, 1440, 2160, 2880, 3600, 4320, 5040].forEach((x, index) => {
        const imageNumber = index % 2 === 0 ? 2 : 1;
        addBackgroundLayers(backgroundObjects, x, imageNumber);
    });
    return backgroundObjects;
}

/**
 * Adds one complete background set at one x position.
 * @param {BackgroundObject[]} backgroundObjects - The background object list.
 * @param {number} x - The x position of the background set.
 * @param {number} imageNumber - The image number for alternating layers.
 */
function addBackgroundLayers(backgroundObjects, x, imageNumber) {
    backgroundObjects.push(new BackgroundObject('./assets/img/5_background/layers/air.png', x));
    backgroundObjects.push(new BackgroundObject(`./assets/img/5_background/layers/3_third_layer/${imageNumber}.png`, x));
    backgroundObjects.push(new BackgroundObject(`./assets/img/5_background/layers/2_second_layer/${imageNumber}.png`, x));
    backgroundObjects.push(new BackgroundObject(`./assets/img/5_background/layers/1_first_layer/${imageNumber}.png`, x));
}

/**
 * Creates all coins for the first level.
 * @returns {Coin[]} The level coins.
 */
function createCoins() {
    return [
        new Coin(500, 120),
        new Coin(650, 190),
        new Coin(1050, 250),
        new Coin(1350, 130),
        new Coin(1650, 220),
        new Coin(2000, 150),
        new Coin(2350, 250),
        new Coin(2700, 130),
        new Coin(3000, 210),
        new Coin(3300, 150)
    ];
}

/**
 * Creates all bottles for the first level.
 * @returns {Bottle[]} The level bottles.
 */
function createBottles() {
    return [
        new Bottle(450),
        new Bottle(1000),
        new Bottle(1650),
        new Bottle(1800),
        new Bottle(1950),
        new Bottle(2100),
        new Bottle(2550),
        new Bottle(3000),
        new Bottle(3450)
    ];
}
