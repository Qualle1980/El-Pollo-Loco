import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';

// #region variables

let canvas;
let world;
let keyboard = new Keyboard();

// #endregion

// #region initialization

// Initializes the canvas and creates the game world.
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    window.world = world;
    window.keyboard = keyboard;
}

// #endregion

// #region keyboard events

// Stores pressed keyboard keys.
window.addEventListener('keydown', (event) => {
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
    if (code === 'ArrowUp') keyboard.UP = isPressed;
    if (code === 'KeyD') keyboard.THROW = isPressed;
}

// #endregion

// #region events

window.addEventListener('load', init);

// #endregion
