import { Level } from '../classes/level.class.js';
import { Chicken } from '../classes/chicken.class.js';
import { SmallChicken } from '../classes/small-chicken.class.js';
import { Endboss } from '../classes/endboss.class.js';
import { Cloud } from '../classes/cloud.class.js';
import { BackgroundObject } from '../classes/background-object.class.js';

export const level1 = new Level(
    [
        new Chicken(0),
        new SmallChicken(1),
        new Chicken(2),
        new SmallChicken(3),
        new Endboss()
    ],
    [
        new Cloud(100),
        new Cloud(500),
        new Cloud(900)
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
    2880
);
