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
        this.setWorld();
        this.createBackground();
        this.createClouds();
        this.createEnemies();
        this.draw();
    }

    // #endregion

    // #region setup

    // Connects world references to game objects.
    setWorld() {
        this.character.world = this;
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

    // Creates the visible enemies.
    createEnemies() {
        this.enemies = [new Chicken(), new Chicken(), new Chicken()];
    }

    // #endregion

    // #region drawing

    // Clears the canvas and draws all world objects.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.repeatDraw();
    }

    // Draws all objects from the given array.
    addObjectsToMap(objects) {
        objects.forEach((object) => this.addToMap(object));
    }

    // Draws one object with optional horizontal flipping.
    addToMap(object) {
        if (object.otherDirection) this.flipImage(object);
        object.draw(this.ctx);
        if (object.otherDirection) this.flipImageBack(object);
    }

    // Requests the next draw frame.
    repeatDraw() {
        requestAnimationFrame(() => this.draw());
    }

    // Flips an object before drawing it.
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    // Restores an object after drawing it flipped.
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    // #endregion
}

