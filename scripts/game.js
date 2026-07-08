import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';
import { KeyboardHelper } from '../helper_classes/keyboard-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';

// #region variables

let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let gameWrapper;
let soundVolumeSlider;
let soundVolumeControl;
let musicVolumeSlider;
let musicVolumeControl;

// #endregion

// #region initialization

// Initializes the canvas and menu buttons.
function init() {
    setGameElements();
    setButtonEvents();
    setKeyboard();
    setSoundSettings();
}

// Stores important html elements for the game.
function setGameElements() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    gameWrapper = document.querySelector('.game-stage');
    soundVolumeSlider = document.getElementById('soundVolumeSlider');
    soundVolumeControl = document.getElementById('soundVolumeControl');
    musicVolumeSlider = document.getElementById('musicVolumeSlider');
    musicVolumeControl = document.getElementById('musicVolumeControl');
}

// Adds click events to all menu buttons.
function setButtonEvents() {
    setStartButtonEvents();
    setOverlayButtonEvents();
    setGameControlEvents();
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
}

// Adds events for start screen buttons.
function setStartButtonEvents() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('howToPlayButton').addEventListener('click', showHowToPlay);
    document.getElementById('closeHowToPlayButton').addEventListener('click', hideHowToPlay);
    document.getElementById('howToPlayScreen').addEventListener('click', closeHowToPlayByClick);
}

// Adds events for overlay buttons.
function setOverlayButtonEvents() {
    document.getElementById('closeImpressumButton').addEventListener('click', hideImpressum);
    document.getElementById('impressumScreen').addEventListener('click', closeImpressumByClick);
    document.querySelectorAll('.impressum-button').forEach((button) => button.addEventListener('click', showImpressum));
}

// Adds events for global game controls.
function setGameControlEvents() {
    document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);
    document.getElementById('muteButton').addEventListener('click', toggleSoundVolume);
    document.getElementById('musicVolumeButton').addEventListener('click', toggleMusicVolume);
    soundVolumeSlider.addEventListener('input', updateSoundVolume);
    soundVolumeSlider.addEventListener('change', removeControlFocus);
    musicVolumeSlider.addEventListener('input', updateMusicVolume);
    musicVolumeSlider.addEventListener('change', removeControlFocus);
    canvas.addEventListener('pointerdown', closeVolumeControls);
    document.querySelectorAll('.restart-button').forEach((button) => button.addEventListener('click', restartGame));
    document.querySelectorAll('.home-button').forEach((button) => button.addEventListener('click', showHomeScreen));
    document.querySelectorAll('.mobile-control-button').forEach((button) => button.addEventListener('pointerdown', closeVolumeControls));
}

// Shows the saved sound settings in the interface.
function setSoundSettings() {
    soundVolumeSlider.value = SoundHelper.soundVolume;
    musicVolumeSlider.value = SoundHelper.musicVolume;
    updateSoundControlState();
    updateMusicVolumeButtonState();
    updateMuteIcon();
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
    closeVolumeControls();
    startScreen.classList.add('d-none');
    world = new World(canvas, keyboard);
    window.world = world;
}

// Restarts the game without reloading the page.
function restartGame() {
    stopCurrentWorld();
    keyboard = new Keyboard();
    KeyboardHelper.setKeyboard(keyboard);
    closeVolumeControls();
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
    closeVolumeControls();
    hideEndScreens();
    clearCanvas();
    startScreen.classList.remove('d-none');
    window.keyboard = keyboard;
    window.world = world;
}

// Stops the active world before changing the game state.
function stopCurrentWorld() {
    if (world) world.gameStopped = true;
    if (world) world.stopSounds();
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

// Opens or closes the game sound volume slider.
function toggleSoundVolume(event) {
    soundVolumeControl.classList.toggle('d-none');
    updateSoundControlState();
    removeControlFocus(event);
}

// Updates the saved game sound volume.
function updateSoundVolume() {
    SoundHelper.setSoundVolume(soundVolumeSlider.value);
    updateSoundControlState();
    updateMuteIcon();
}

// Updates the mute button state.
function updateSoundControlState() {
    const muteButton = document.getElementById('muteButton');
    const isOpen = !soundVolumeControl.classList.contains('d-none');
    muteButton.classList.toggle('muted', SoundHelper.muted || SoundHelper.soundVolume === 0);
    muteButton.setAttribute('aria-expanded', isOpen);
}

// Updates the mute button image.
function updateMuteIcon() {
    const image = document.getElementById('soundOnOffImage');
    const soundIsOff = SoundHelper.muted || SoundHelper.soundVolume === 0;
    image.src = soundIsOff ? './assets/img/icons/soundOff.png' : './assets/img/icons/soundOn.png';
}

// Updates the saved background music volume.
function updateMusicVolume() {
    SoundHelper.setMusicVolume(musicVolumeSlider.value);
}

// Opens or closes the background music volume slider.
function toggleMusicVolume(event) {
    musicVolumeControl.classList.toggle('d-none');
    updateMusicVolumeButtonState();
    removeControlFocus(event);
}

// Updates the music volume button state.
function updateMusicVolumeButtonState() {
    const isOpen = !musicVolumeControl.classList.contains('d-none');
    document.getElementById('musicVolumeButton').setAttribute('aria-expanded', isOpen);
}

// Closes both volume controls while the game is played.
function closeVolumeControls() {
    soundVolumeControl.classList.add('d-none');
    musicVolumeControl.classList.add('d-none');
    updateSoundControlState();
    updateMusicVolumeButtonState();
}

// Removes focus from clicked sound controls.
function removeControlFocus(event) {
    if (event && event.currentTarget) event.currentTarget.blur();
}

// #endregion

// #region keyboard events

// Handles menu actions for pressed keys.
function handleKeyboardAction(code) {
    closeVolumeControls();
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
