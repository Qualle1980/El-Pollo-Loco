class World {
    // #region properties

    character = new Character();
    statusBar = new StatusBar();
    level = level1;
    backgroundObjects = [];
    clouds = [];
    enemies = [];
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    levelEndX = 1440;

    // #endregion

    // #region constructor

    // Creates the world and starts drawing it.
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.setWorld();
        this.setLevelObjects();
        this.draw();
    }

    // #endregion

    // #region setup

    // Connects world references to game objects.
    setWorld() {
        this.character.world = this;
    }

    // Gets all visible objects from the current level.
    setLevelObjects() {
        this.enemies = this.level.enemies;
        this.clouds = this.level.clouds;
        this.backgroundObjects = this.level.backgroundObjects;
        this.levelEndX = this.level.levelEndX;
    }

    // #endregion

    // #region collision

    // Checks if the character touches an enemy.
    checkCollisions() {
        this.enemies.forEach((enemy) => this.checkEnemyCollision(enemy));
    }

    // Handles one enemy collision with the character.
    checkEnemyCollision(enemy) {
        if (enemy.dead) return;
        if (this.character.isCollidingFromAbove(enemy) && !enemy.hasHitCharacter) this.hitEnemyFromAbove(enemy);
        else if (this.character.isColliding(enemy) && !enemy.hasHitCharacter) this.hitCharacter(enemy);
        if (!this.character.isColliding(enemy)) enemy.hasHitCharacter = false;
    }

    // Bounces the character after hitting an enemy from above.
    hitEnemyFromAbove(enemy) {
        this.character.speedY = 15;
        enemy.kill();
        enemy.hasHitCharacter = true;
    }

    // Damages the character and marks the enemy contact.
    hitCharacter(enemy) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        enemy.hasHitCharacter = true;
    }
    // #endregion

    // #region drawing

    // Clears the canvas and draws all world objects.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.drawWorldObjects();
        this.checkCollisions();
        this.removeDeadEnemies();
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBar);
        this.repeatDraw();
    }

    // Draws all objects inside the world.
    drawWorldObjects() {
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
    }

    // Removes dead enemies after a short delay.
    removeDeadEnemies() {
        this.enemies = this.enemies.filter((enemy) => !this.canRemoveEnemy(enemy));
    }

    // Checks if a dead enemy can be removed.
    canRemoveEnemy(enemy) {
        const timePassed = new Date().getTime() - enemy.deadAt;
        return enemy.dead && timePassed > 800;
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
