import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';

// #region variables

let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;

// #endregion

// #region initialization

// Initializes the canvas and start button.
function init() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    document.getElementById('startButton').addEventListener('click', startGame);
    window.keyboard = keyboard;
}

// Starts the game world after the start screen.
function startGame() {
    if (world) return;
    startScreen.classList.add('d-none');
    world = new World(canvas, keyboard);
    window.world = world;
}

// #endregion

// #region keyboard events

// Stores pressed keyboard keys.
window.addEventListener('keydown', (event) => {
    if (codeStartsGame(event.code)) startGame();
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

// #endregion

// #region events

window.addEventListener('load', init);

// #endregion
