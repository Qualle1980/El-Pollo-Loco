class World {
    // #region properties

    character = new Character();
    backgroundObjects = [];
    clouds = [];
    enemies = [];
    canvas;
    ctx;
    keyboard;

    // #endregion

    // #region constructor

    // Creates the world and starts drawing it.
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.createBackground();
        this.createClouds();
        this.createEnemies();
        this.draw();
    }

    // #endregion

    // #region background

    // Creates multiple background blocks for later scrolling.
    createBackground() {
        this.addBackgroundBlock(-720, 2);
        this.addBackgroundBlock(0, 1);
        this.addBackgroundBlock(720, 2);
        this.addBackgroundBlock(1440, 1);
    }

    // Adds one layered background block at the given x position.
    addBackgroundBlock(x, imageNumber) {
        this.backgroundObjects.push(new BackgroundObject('./assets/img/5_background/layers/air.png', x));
        this.backgroundObjects.push(new BackgroundObject(`./assets/img/5_background/layers/3_third_layer/${imageNumber}.png`, x));
        this.backgroundObjects.push(new BackgroundObject(`./assets/img/5_background/layers/2_second_layer/${imageNumber}.png`, x));
        this.backgroundObjects.push(new BackgroundObject(`./assets/img/5_background/layers/1_first_layer/${imageNumber}.png`, x));
    }

    // #endregion

    // #region clouds

    // Creates the visible clouds.
    createClouds() {
        this.clouds = [new Cloud(100), new Cloud(500), new Cloud(900)];
    }

    // #endregion

    // #region enemies

    // Creates enemies with random distance variations.
    createEnemies() {
        this.enemies = [
            new Chicken(this.getRandomEnemyX(450)),
            new Chicken(this.getRandomEnemyX(650)),
            new Chicken(this.getRandomEnemyX(850))
        ];
    }

    // Returns a randomized enemy x position.
    getRandomEnemyX(startX) {
        return startX + Math.random() * 120;
    }

    // #endregion

    // #region drawing

    // Clears the canvas and draws all world objects.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.character.draw(this.ctx);
        this.addObjectsToMap(this.enemies);
        this.repeatDraw();
    }

    // Requests the next draw frame.
    repeatDraw() {
        requestAnimationFrame(() => this.draw());
    }

    // Draws all objects from the given array.
    addObjectsToMap(objects) {
        objects.forEach((object) => object.draw(this.ctx));
    }

    // #endregion
}


