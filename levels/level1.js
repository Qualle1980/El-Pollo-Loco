const level1 = new Level(
    [
        new Chicken(0),
        new SmallChicken(1),
        new Chicken(2),
        new SmallChicken(3)
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
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 1440)
    ],
    1440
);
