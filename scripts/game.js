import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';

// #region variables

let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let gameWrapper;

// #endregion

// #region initialization

// Initializes the canvas and menu buttons.
function init() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    gameWrapper = document.querySelector('.game-wrapper');
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);
    document.querySelectorAll('.restart-button').forEach((button) => button.addEventListener('click', restartGame));
    window.keyboard = keyboard;
}

// Starts the game world after the start screen.
function startGame() {
    if (world) return;
    startScreen.classList.add('d-none');
    world = new World(canvas, keyboard);
    window.world = world;
}

// Restarts the game without reloading the page.
function restartGame() {
    IntervalHelper.stopAllIntervals();
    keyboard = new Keyboard();
    hideEndScreens();
    world = new World(canvas, keyboard);
    window.keyboard = keyboard;
    window.world = world;
}

// Hides all game end screens.
function hideEndScreens() {
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
}

// Switches the game area in and out of fullscreen mode.
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else gameWrapper.requestFullscreen();
}

// #endregion

// #region keyboard events

// Stores pressed keyboard keys.
window.addEventListener('keydown', (event) => {
    if (codeStartsGame(event.code)) startGame();
    if (codeRestartsGame(event.code)) restartGame();
    updateKey(event.code, true);
});

// Stores released keyboard keys.
window.addEventListener('keyup', (event) => {
    updateKey(event.code, false);
});

// Updates the matching keyboard state.
function updateKey(code, isPressed) {
    if (code === 'ArrowLeft') keyboard.LEFT = isPressed;
    if (code === 'ArrowRight') keyboard.RIGHT = isPressed;
    if (code === 'Space') keyboard.UP = isPressed;
    if (code === 'KeyD') keyboard.THROW = isPressed;
}

// Checks if the key should start the game.
function codeStartsGame(code) {
    return code === 'Enter' && !world;
}

// Checks if the key should restart the game.
function codeRestartsGame(code) {
    return code === 'Enter' && isEndScreenVisible();
}

// Checks if an end screen is currently visible.
function isEndScreenVisible() {
    return !document.getElementById('gameOverScreen').classList.contains('d-none') ||
        !document.getElementById('winScreen').classList.contains('d-none');
}

// #endregion

// #region events

window.addEventListener('load', init);

// #endregion
