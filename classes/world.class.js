class World {
    // #region properties

    character = new Character();
    backgroundObjects = [];
    canvas;
    ctx;

    // #endregion

    // #region constructor

    // Creates the world and starts drawing it.
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.createBackground();
        this.draw();
    }

    // #endregion

    // #region background

    // Creates the visible background layers.
    createBackground() {
        this.backgroundObjects = [
            new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0)
        ];
    }

    // #endregion

    // #region drawing

    // Clears the canvas and draws all world objects.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.character.draw(this.ctx);
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
