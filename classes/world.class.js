import { Character } from './character.class.js';
import { StatusBar } from './status-bar.class.js';
import { CoinStatusBar } from './coin-status-bar.class.js';
import { BottleStatusBar } from './bottle-status-bar.class.js';
import { EndbossStatusBar } from './endboss-status-bar.class.js';
import { ThrowableObject } from './throwable-object.class.js';
import { Endboss } from './endboss.class.js';
import { createLevel1 } from '../levels/level1.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';

export class World {
    // #region properties

    character = new Character();
    statusBar = new StatusBar();
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    level = createLevel1();
    backgroundObjects = [];
    clouds = [];
    enemies = [];
    coins = [];
    bottles = [];
    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    levelEndX = 1440;
    gameEnding = false;
    gameStopped = false;

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
        this.run();
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
        this.enemies.forEach((enemy) => enemy.world = this);
        this.clouds = this.level.clouds;
        this.backgroundObjects = this.level.backgroundObjects;
        this.coins = this.level.coins;
        this.bottles = this.level.bottles;
        this.levelEndX = this.level.levelEndX;
    }

    // Runs all repeated game checks.
    run() {
        IntervalHelper.setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkThrowableCollisions();
            this.removeLandedBottles();
            this.removeDeadEnemies();
            this.checkGameEnd();
        }, 1000 / 60);
    }

    // #endregion

    // #region collision

    // Checks if the character touches an enemy.
    checkCollisions() {
        this.enemies.forEach((enemy) => this.checkEnemyCollision(enemy));
        this.checkCoinCollisions();
        this.checkBottleCollisions();
    }

    // Handles one enemy collision with the character.
    checkEnemyCollision(enemy) {
        if (enemy.dead) return;
        if (enemy instanceof Endboss) return this.checkEndbossCollision(enemy);
        if (this.character.isCollidingFromAbove(enemy) && !enemy.hasHitCharacter) this.hitEnemyFromAbove(enemy);
        else if (this.character.isColliding(enemy) && !enemy.hasHitCharacter) this.hitCharacter(enemy);
        if (!this.character.isColliding(enemy)) enemy.hasHitCharacter = false;
    }

    // Handles the collision between the character and the endboss.
    checkEndbossCollision(endboss) {
        if (this.canEndbossHitCharacter(endboss)) this.hitCharacter(endboss);
        if (!this.character.isColliding(endboss)) endboss.hasHitCharacter = false;
    }

    // Checks if the endboss can damage the character.
    canEndbossHitCharacter(endboss) {
        return endboss.canAttack() && this.character.isColliding(endboss) && !endboss.hasHitCharacter;
    }

    // Kills the enemy after the character hits it from above.
    hitEnemyFromAbove(enemy) {
        enemy.kill();
        enemy.hasHitCharacter = true;
    }

    // Damages the character and marks the enemy contact.
    hitCharacter(enemy) {
        this.character.hit(enemy.damage);
        this.statusBar.setPercentage(this.character.energy);
        enemy.hasHitCharacter = true;
    }

    // Checks if the character touches coins.
    checkCoinCollisions() {
        this.coins.forEach((coin) => this.checkCoinCollision(coin));
    }

    // Collects one coin when the character touches it.
    checkCoinCollision(coin) {
        if (!this.character.isColliding(coin)) return;
        this.character.collectCoin();
        this.coinStatusBar.setPercentage(this.getCoinPercentage());
        this.removeObjectFromMap(this.coins, coin);
    }

    // Checks if the character touches bottles.
    checkBottleCollisions() {
        this.bottles.forEach((bottle) => this.checkBottleCollision(bottle));
    }

    // Collects one bottle when the character touches it.
    checkBottleCollision(bottle) {
        if (!this.canCollectBottle(bottle)) return;
        this.character.collectBottle();
        this.bottleStatusBar.setPercentage(this.getBottlePercentage());
        this.removeObjectFromMap(this.bottles, bottle);
    }

    // Checks if the character can collect the touched bottle.
    canCollectBottle(bottle) {
        return this.character.isColliding(bottle) && this.character.canCollectBottle();
    }

    // Removes one object from the given array.
    removeObjectFromMap(array, objectToRemove) {
        const index = array.indexOf(objectToRemove);
        if (index > -1) array.splice(index, 1);
    }

    // #endregion

    // #region drawing

    // Clears the canvas and draws all world objects.
    draw() {
        if (this.gameStopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.drawWorldObjects();
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        if (this.isNearEndboss()) this.addToMap(this.endbossStatusBar);
        this.repeatDraw();
    }

    // Draws all objects inside the world.
    drawWorldObjects() {
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    // Throws one bottle when the throw key is pressed.
    checkThrowObjects() {
        if (!this.canThrowBottle()) return;
        this.throwBottle();
        this.keyboard.THROW = false;
    }

    // Checks if the character has a bottle to throw.
    canThrowBottle() {
        return this.keyboard.THROW && this.character.bottles > 0;
    }

    // Creates a throwable bottle and updates the bottle bar.
    throwBottle() {
        const bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.character.throwBottle();
        this.bottleStatusBar.setPercentage(this.getBottlePercentage());
    }

    // Converts collected bottles into status bar percentage.
    getBottlePercentage() {
        return this.character.bottles * 20;
    }

    // Converts collected coins into status bar percentage.
    getCoinPercentage() {
        return this.character.coins * 20;
    }

    // Removes bottles after they hit the ground.
    removeLandedBottles() {
        this.throwableObjects = this.throwableObjects.filter((bottle) => bottle.bottleFlying);
    }

    // Checks if thrown bottles hit enemies.
    checkThrowableCollisions() {
        this.throwableObjects.forEach((bottle) => this.checkThrowableCollision(bottle));
    }

    // Checks one thrown bottle against all enemies.
    checkThrowableCollision(bottle) {
        this.enemies.forEach((enemy) => this.hitEnemyWithBottle(bottle, enemy));
    }

    // Kills a normal enemy when it is hit by a bottle.
    hitEnemyWithBottle(bottle, enemy) {
        if (!this.canHitEnemyWithBottle(bottle, enemy)) return;
        if (enemy instanceof Endboss) this.hitEndboss(enemy);
        else enemy.kill();
        bottle.bottleFlying = false;
    }

    // Checks if a bottle can hit the given enemy.
    canHitEnemyWithBottle(bottle, enemy) {
        return bottle.bottleFlying && !enemy.dead && bottle.isColliding(enemy);
    }

    // Damages the endboss and updates its status bar.
    hitEndboss(endboss) {
        endboss.hit();
        this.endbossStatusBar.setPercentage(endboss.energy);
        if (endboss.isDead()) endboss.kill();
    }

    // Checks if the character is close enough to show the endboss bar.
    isNearEndboss() {
        const endboss = this.enemies.find((enemy) => enemy instanceof Endboss);
        return endboss && this.character.x > endboss.x - 600;
    }

    // Removes dead enemies after a short delay.
    removeDeadEnemies() {
        this.enemies = this.enemies.filter((enemy) => !this.canRemoveEnemy(enemy));
    }

    // Checks if a dead enemy can be removed.
    canRemoveEnemy(enemy) {
        const timePassed = new Date().getTime() - enemy.deadAt;
        return !(enemy instanceof Endboss) && enemy.dead && timePassed > 800;
    }

    // Checks if the game should stop after win or death.
    checkGameEnd() {
        if (this.gameEnding) return;
        if (this.character.isDead() || this.isEndbossDead()) this.stopGameSoon();
    }

    // Checks if the endboss has no energy left.
    isEndbossDead() {
        const endboss = this.enemies.find((enemy) => enemy instanceof Endboss);
        return endboss && endboss.isDead();
    }

    // Stops all intervals after the final animation can play.
    stopGameSoon() {
        this.gameEnding = true;
        setTimeout(() => this.stopGame(), 1200);
    }

    // Stops the game loop and all registered intervals.
    stopGame() {
        IntervalHelper.stopAllIntervals();
        if (this.character.isDead()) this.showGameOverScreen();
        if (this.isEndbossDead()) this.showWinScreen();
        this.gameStopped = true;
    }

    // Shows the game over screen.
    showGameOverScreen() {
        document.getElementById('gameOverScreen').classList.remove('d-none');
    }

    // Shows the win screen.
    showWinScreen() {
        document.getElementById('winScreen').classList.remove('d-none');
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
