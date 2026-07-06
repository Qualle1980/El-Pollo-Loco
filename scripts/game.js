import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';
import { KeyboardHelper } from '../helper_classes/keyboard-helper.js';

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
    setGameElements();
    setButtonEvents();
    setKeyboard();
}

// Stores important html elements for the game.
function setGameElements() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    gameWrapper = document.querySelector('.game-stage');
}

// Adds click events to all menu buttons.
function setButtonEvents() {
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
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
}

// Connects the keyboard helper with the game keyboard.
function setKeyboard() {
    KeyboardHelper.setKeyboard(keyboard);
    KeyboardHelper.startEvents(handleKeyboardAction);
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
    stopCurrentWorld();
    keyboard = new Keyboard();
    KeyboardHelper.setKeyboard(keyboard);
    hideEndScreens();
    world = new World(canvas, keyboard);
    window.keyboard = keyboard;
    window.world = world;
}

// Returns to the start screen without reloading the page.
function showHomeScreen() {
    stopCurrentWorld();
    keyboard = new Keyboard();
    KeyboardHelper.setKeyboard(keyboard);
    world = null;
    hideEndScreens();
    clearCanvas();
    startScreen.classList.remove('d-none');
    window.keyboard = keyboard;
    window.world = world;
}

// Stops the active world before changing the game state.
function stopCurrentWorld() {
    if (world) world.gameStopped = true;
    IntervalHelper.stopAllIntervals();
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

// Updates the fullscreen button image.
function updateFullscreenIcon() {
    const image = document.getElementById('fullscreenImage');
    image.src = document.fullscreenElement ? './assets/img/icons/min.png' : './assets/img/icons/max.png';
}

// Switches all game sounds on or off.
function toggleMute() {
    audioMuted = !audioMuted;
    document.getElementById('muteButton').classList.toggle('muted', audioMuted);
    updateMuteIcon();
    window.audioMuted = audioMuted;
}

// Updates the mute button image.
function updateMuteIcon() {
    const image = document.getElementById('soundOnOffImage');
    image.src = audioMuted ? './assets/img/icons/soundOff.png' : './assets/img/icons/soundOn.png';
}

// #endregion

// #region keyboard events

// Handles menu actions for pressed keys.
function handleKeyboardAction(code) {
    if (codeClosesHowToPlay(code)) hideHowToPlay();
    if (codeClosesImpressum(code)) hideImpressum();
    if (codeStartsGame(code)) startGame();
    if (codeRestartsGame(code)) restartGame();
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
