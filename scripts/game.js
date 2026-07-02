import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';

// #region variables

let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let gameWrapper;
let audioMuted = false;

// #endregion

// #region initialization

// Initializes the canvas and menu buttons.
function init() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    gameWrapper = document.querySelector('.game-stage');
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('howToPlayButton').addEventListener('click', showHowToPlay);
    document.getElementById('closeHowToPlayButton').addEventListener('click', hideHowToPlay);
    document.getElementById('howToPlayScreen').addEventListener('click', closeHowToPlayByClick);
    document.getElementById('closeImpressumButton').addEventListener('click', hideImpressum);
    document.getElementById('impressumScreen').addEventListener('click', closeImpressumByClick);
    document.querySelectorAll('.impressum-button').forEach((button) => button.addEventListener('click', showImpressum));
    document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);
    document.getElementById('muteButton').addEventListener('click', toggleMute);
    document.querySelectorAll('.restart-button').forEach((button) => button.addEventListener('click', restartGame));
    document.querySelectorAll('.home-button').forEach((button) => button.addEventListener('click', showHomeScreen));
    addMobileControlEvents();
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

// Returns to the start screen without reloading the page.
function showHomeScreen() {
    IntervalHelper.stopAllIntervals();
    keyboard = new Keyboard();
    world = null;
    hideEndScreens();
    clearCanvas();
    startScreen.classList.remove('d-none');
    window.keyboard = keyboard;
    window.world = world;
}

// Hides all game end screens.
function hideEndScreens() {
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
}

// Clears the canvas before showing the start screen again.
function clearCanvas() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

// Shows the key explanation screen.
function showHowToPlay() {
    document.getElementById('howToPlayScreen').classList.remove('d-none');
}

// Hides the key explanation screen.
function hideHowToPlay() {
    document.getElementById('howToPlayScreen').classList.add('d-none');
}

// Closes the key explanation when the dark background is clicked.
function closeHowToPlayByClick(event) {
    if (event.target.id === 'howToPlayScreen') hideHowToPlay();
}

// Shows the impressum screen.
function showImpressum() {
    document.getElementById('impressumScreen').classList.remove('d-none');
}

// Hides the impressum screen.
function hideImpressum() {
    document.getElementById('impressumScreen').classList.add('d-none');
}

// Closes the impressum when the dark background is clicked.
function closeImpressumByClick(event) {
    if (event.target.id === 'impressumScreen') hideImpressum();
}

// Switches the game area in and out of fullscreen mode.
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else gameWrapper.requestFullscreen();
}

// Switches all game sounds on or off.
function toggleMute() {
    audioMuted = !audioMuted;
    document.getElementById('muteButton').classList.toggle('muted', audioMuted);
    window.audioMuted = audioMuted;
}

// #endregion

// #region mobile controls

// Adds touch events to all mobile control buttons.
function addMobileControlEvents() {
    document.querySelectorAll('.mobile-control-button').forEach((button) => {
        button.addEventListener('touchstart', pressMobileButton);
        button.addEventListener('touchend', releaseMobileButton);
        button.addEventListener('touchcancel', releaseMobileButton);
    });
}

// Stores a pressed mobile control.
function pressMobileButton(event) {
    event.preventDefault();
    setMobileKey(event.currentTarget.dataset.mobileKey, true);
}

// Stores a released mobile control.
function releaseMobileButton(event) {
    event.preventDefault();
    setMobileKey(event.currentTarget.dataset.mobileKey, false);
}

// Updates the matching mobile keyboard state.
function setMobileKey(key, isPressed) {
    if (key === 'LEFT') keyboard.LEFT = isPressed;
    if (key === 'RIGHT') keyboard.RIGHT = isPressed;
    if (key === 'UP') keyboard.UP = isPressed;
    if (key === 'THROW') keyboard.THROW = isPressed;
}

// #endregion

// #region keyboard events

// Stores pressed keyboard keys.
window.addEventListener('keydown', (event) => {
    if (codeClosesHowToPlay(event.code)) hideHowToPlay();
    if (codeClosesImpressum(event.code)) hideImpressum();
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

// Checks if the key should close the key explanation.
function codeClosesHowToPlay(code) {
    return code === 'Escape' && !document.getElementById('howToPlayScreen').classList.contains('d-none');
}

// Checks if the key should close the impressum.
function codeClosesImpressum(code) {
    return code === 'Escape' && !document.getElementById('impressumScreen').classList.contains('d-none');
}

// #endregion

// #region events

window.addEventListener('load', init);

// #endregion
