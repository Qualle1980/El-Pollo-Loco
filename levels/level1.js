import { Level } from '../classes/level.class.js';
import { Chicken } from '../classes/chicken.class.js';
import { SmallChicken } from '../classes/small-chicken.class.js';
import { Endboss } from '../classes/endboss.class.js';
import { Cloud } from '../classes/cloud.class.js';
import { BackgroundObject } from '../classes/background-object.class.js';
import { Coin } from '../classes/coin.class.js';
import { Bottle } from '../classes/bottle.class.js';

// Creates a fresh first level for a new game.
export function createLevel1() {
    return new Level([
        new Chicken(0),
        new SmallChicken(1),
        new Chicken(2),
        new SmallChicken(3),
        new Chicken(5),
        new SmallChicken(6),
        new Endboss()
    ],
    [
        new Cloud(100),
        new Cloud(500),
        new Cloud(900),
        new Cloud(1500),
        new Cloud(2300)
    ],
    [
        new BackgroundObject('./assets/img/5_background/layers/air.png', -720),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -720),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 720),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 720),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 1440),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 1440),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 1440),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 1440),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 2160),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 2160),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 2160),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 2160),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 2880),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 2880),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 2880),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 2880)
    ],
    [
        new Coin(500, 120),
        new Coin(650, 180),
        new Coin(800, 240),
        new Coin(1100, 130),
        new Coin(1250, 190),
        new Coin(1400, 250),
        new Coin(1550, 120),
        new Coin(1650, 180),
        new Coin(1750, 240)
    ],
    [
        new Bottle(450),
        new Bottle(1000),
        new Bottle(1650),
        new Bottle(1800),
        new Bottle(1950),
        new Bottle(2100)
    ],
    2880);
}
