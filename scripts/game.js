import { World } from '../classes/world.class.js';
import { Keyboard } from '../classes/keyboard.class.js';
import { IntervalHelper } from '../helper_classes/interval-helper.js';
import { KeyboardHelper } from '../helper_classes/keyboard-helper.js';
import { SoundHelper } from '../helper_classes/sound-helper.js';
import { ImageHelper } from '../helper_classes/image-helper.js';

/**
 * Starts and controls the game user interface.
 * @module Game
 */

// #region variables

let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let loadingScreen;
let gameWrapper;
let soundSettingsScreen;
let soundVolumeSlider;
let musicVolumeSlider;
let gameStartSound;
let gameLoading = false;
let loadedGameplayImages = [];

/**
 * Image paths that should be loaded before the world starts.
 * @type {string[]}
 */
const GAMEPLAY_IMAGES = [
    ...getCharacterImages(),
    ...getEnemyImages(),
    ...getLevelImages(),
    ...getHelperImages()
];

// #endregion

// #region initialization

/**
 * Initializes the canvas and menu buttons.
 */
function init() {
    setGameElements();
    setButtonEvents();
    setKeyboard();
    setSoundSettings();
}

/**
 * Stores important html elements for the game.
 */
function setGameElements() {
    canvas = document.getElementById('canvas');
    startScreen = document.getElementById('startScreen');
    loadingScreen = document.getElementById('loadingScreen');
    gameWrapper = document.querySelector('.game-stage');
    soundSettingsScreen = document.getElementById('soundSettingsScreen');
    soundVolumeSlider = document.getElementById('soundVolumeSlider');
    musicVolumeSlider = document.getElementById('musicVolumeSlider');
    gameStartSound = SoundHelper.createSound('./audio/game/gameStart.mp3');
}

/**
 * Adds click events to all menu buttons.
 */
function setButtonEvents() {
    setStartButtonEvents();
    setOverlayButtonEvents();
    setGameControlEvents();
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
}

/**
 * Adds events for start screen buttons.
 */
function setStartButtonEvents() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('howToPlayButton').addEventListener('click', showHowToPlay);
    document.getElementById('closeHowToPlayButton').addEventListener('click', hideHowToPlay);
    document.getElementById('howToPlayScreen').addEventListener('click', closeHowToPlayByClick);
}

/**
 * Adds events for overlay buttons.
 */
function setOverlayButtonEvents() {
    document.getElementById('closeImpressumButton').addEventListener('click', hideImpressum);
    document.getElementById('impressumScreen').addEventListener('click', closeImpressumByClick);
    document.querySelectorAll('.impressum-button').forEach((button) => button.addEventListener('click', showImpressum));
}

/**
 * Adds events for global game controls.
 */
function setGameControlEvents() {
    document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);
    document.getElementById('soundSettingsButton').addEventListener('click', showSoundSettings);
    document.getElementById('closeSoundSettingsButton').addEventListener('click', hideSoundSettings);
    document.getElementById('soundSettingsScreen').addEventListener('click', closeSoundSettingsByClick);
    document.getElementById('muteAllButton').addEventListener('click', toggleMuteAll);
    soundVolumeSlider.addEventListener('input', updateSoundVolume);
    soundVolumeSlider.addEventListener('change', removeControlFocus);
    musicVolumeSlider.addEventListener('input', updateMusicVolume);
    musicVolumeSlider.addEventListener('change', removeControlFocus);
    canvas.addEventListener('pointerdown', closeVolumeControls);
    document.querySelectorAll('.restart-button').forEach((button) => button.addEventListener('click', restartGame));
    document.querySelectorAll('.home-button').forEach((button) => button.addEventListener('click', showHomeScreen));
    document.querySelectorAll('.mobile-control-button').forEach((button) => button.addEventListener('pointerdown', closeVolumeControls));
    document.querySelectorAll('.mobile-control-button').forEach((button) => button.addEventListener('contextmenu', preventContextMenu));
}

/**
 * Shows the saved sound settings in the interface.
 */
function setSoundSettings() {
    soundVolumeSlider.value = SoundHelper.soundVolume;
    musicVolumeSlider.value = SoundHelper.musicVolume;
    updateMuteAllButton();
}

/**
 * Connects the keyboard helper with the game keyboard.
 */
function setKeyboard() {
    KeyboardHelper.setKeyboard(keyboard);
    KeyboardHelper.startEvents(handleKeyboardAction);
    window.keyboard = keyboard;
}

/**
 * Returns all character images that are used during the game.
 * @returns {string[]} The character image paths.
 */
function getCharacterImages() {
    return [
        ...createImagePaths('2_character_pepe/1_idle/idle/I-', 1, 10),
        ...createImagePaths('2_character_pepe/1_idle/long_idle/I-', 11, 20),
        ...createImagePaths('2_character_pepe/2_walk/W-', 21, 26),
        ...createImagePaths('2_character_pepe/3_jump/J-', 31, 39),
        ...createImagePaths('2_character_pepe/4_hurt/H-', 41, 43),
        ...createImagePaths('2_character_pepe/5_dead/D-', 51, 57)
    ];
}

/**
 * Returns all enemy images that are used during the game.
 * @returns {string[]} The enemy image paths.
 */
function getEnemyImages() {
    return [
        ...createEnemyImages('chicken_normal'),
        ...createEnemyImages('chicken_small'),
        ...ImageHelper.CHICKEN_BOSS.walk,
        ...ImageHelper.CHICKEN_BOSS.alert,
        ...ImageHelper.CHICKEN_BOSS.attack,
        ...ImageHelper.CHICKEN_BOSS.hurt,
        ...ImageHelper.CHICKEN_BOSS.dead
    ];
}

/**
 * Returns all level images that must be visible after start.
 * @returns {string[]} The level image paths.
 */
function getLevelImages() {
    return [
        './assets/img/5_background/layers/air.png',
        './assets/img/5_background/layers/4_clouds/1.png',
        ...createBackgroundImages(),
        ...ImageHelper.COIN.idle,
        ...ImageHelper.BOTTLE.ground
    ];
}

/**
 * Returns all helper image groups for bars and throwable bottles.
 * @returns {string[]} The helper image paths.
 */
function getHelperImages() {
    return [
        ...ImageHelper.STATUSBAR.healthBlue,
        ...ImageHelper.STATUSBAR.coinBlue,
        ...ImageHelper.STATUSBAR.bottleBlue,
        ...ImageHelper.STATUSBAR.endbossBlue,
        ...ImageHelper.BOTTLE.rotation,
        ...ImageHelper.BOTTLE.splash
    ];
}

/**
 * Creates numbered image paths inside the assets image folder.
 * @param {string} folder - The folder and image prefix after assets/img.
 * @param {number} start - The first image number.
 * @param {number} end - The last image number.
 * @returns {string[]} The created image paths.
 */
function createImagePaths(folder, start, end) {
    const paths = [];
    for (let i = start; i <= end; i++) paths.push(`./assets/img/${folder}${i}.png`);
    return paths;
}

/**
 * Returns walking and dead images for one chicken type.
 * @param {string} type - The chicken folder name.
 * @returns {string[]} The chicken image paths.
 */
function createEnemyImages(type) {
    return [
        `./assets/img/3_enemies_chicken/${type}/1_walk/1_w.png`,
        `./assets/img/3_enemies_chicken/${type}/1_walk/2_w.png`,
        `./assets/img/3_enemies_chicken/${type}/1_walk/3_w.png`,
        `./assets/img/3_enemies_chicken/${type}/2_dead/dead.png`
    ];
}

/**
 * Returns both background variants for all visible layers.
 * @returns {string[]} The background image paths.
 */
function createBackgroundImages() {
    const paths = [];
    [1, 2].forEach((number) => addBackgroundImagePaths(paths, number));
    return paths;
}

/**
 * Adds one background variant to the loading list.
 * @param {string[]} paths - The image path list.
 * @param {number} number - The background image number.
 */
function addBackgroundImagePaths(paths, number) {
    paths.push(`./assets/img/5_background/layers/3_third_layer/${number}.png`);
    paths.push(`./assets/img/5_background/layers/2_second_layer/${number}.png`);
    paths.push(`./assets/img/5_background/layers/1_first_layer/${number}.png`);
}

/**
 * Starts loading important images before the game world is created.
 */
function startGame() {
    if (world || gameLoading) return;
    gameLoading = true;
    closeVolumeControls();
    showLoadingScreen();
    loadGameplayImages(startWorld);
}

/**
 * Creates the world after important images are loaded.
 */
function startWorld() {
    startScreen.classList.add('d-none');
    hideLoadingScreen();
    SoundHelper.playSound(gameStartSound);
    world = new World(canvas, keyboard);
    window.world = world;
    gameLoading = false;
}

/**
 * Shows the loading screen while important gameplay images load.
 */
function showLoadingScreen() {
    loadingScreen.classList.remove('d-none');
}

/**
 * Hides the loading screen when the game can start.
 */
function hideLoadingScreen() {
    loadingScreen.classList.add('d-none');
}

/**
 * Loads important gameplay images before the world starts.
 * @param {Function} callback - The function that runs after all images are loaded.
 */
function loadGameplayImages(callback) {
    let loadedImages = 0;
    loadedGameplayImages = [];
    GAMEPLAY_IMAGES.forEach((path) => loadGameplayImage(path, () => {
        loadedImages++;
        if (loadedImages === GAMEPLAY_IMAGES.length) callback();
    }));
}

/**
 * Loads one image and keeps it in the browser cache.
 * @param {string} path - The image path.
 * @param {Function} callback - The function that runs after the image request ends.
 */
function loadGameplayImage(path, callback) {
    const image = new Image();
    loadedGameplayImages.push(image);
    image.onload = callback;
    image.onerror = callback;
    image.src = path;
}

/**
 * Restarts the game without reloading the page.
 */
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

/**
 * Returns to the start screen without reloading the page.
 */
function showHomeScreen() {
    stopCurrentWorld();
    gameLoading = false;
    keyboard = new Keyboard();
    KeyboardHelper.setKeyboard(keyboard);
    world = null;
    closeVolumeControls();
    hideLoadingScreen();
    hideEndScreens();
    clearCanvas();
    startScreen.classList.remove('d-none');
    window.keyboard = keyboard;
    window.world = world;
}

/**
 * Stops the active world before changing the game state.
 */
function stopCurrentWorld() {
    if (world) world.gameStopped = true;
    if (world) world.stopSounds();
    IntervalHelper.stopAllIntervals();
}

/**
 * Hides all game end screens.
 */
function hideEndScreens() {
    document.getElementById('gameOverScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
}

/**
 * Clears the canvas before showing the start screen again.
 */
function clearCanvas() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Shows the key explanation screen.
 */
function showHowToPlay() {
    document.getElementById('howToPlayScreen').classList.remove('d-none');
}

/**
 * Hides the key explanation screen.
 */
function hideHowToPlay() {
    document.getElementById('howToPlayScreen').classList.add('d-none');
}

/**
 * Closes the key explanation when the dark background is clicked.
 * @param {MouseEvent} event - The click event on the overlay.
 */
function closeHowToPlayByClick(event) {
    if (event.target.id === 'howToPlayScreen') hideHowToPlay();
}

/**
 * Shows the impressum screen.
 */
function showImpressum() {
    document.getElementById('impressumScreen').classList.remove('d-none');
}

/**
 * Hides the impressum screen.
 */
function hideImpressum() {
    document.getElementById('impressumScreen').classList.add('d-none');
}

/**
 * Closes the impressum when the dark background is clicked.
 * @param {MouseEvent} event - The click event on the overlay.
 */
function closeImpressumByClick(event) {
    if (event.target.id === 'impressumScreen') hideImpressum();
}

/**
 * Switches the game area in and out of fullscreen mode.
 */
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else gameWrapper.requestFullscreen();
}

/**
 * Updates the fullscreen button image.
 */
function updateFullscreenIcon() {
    const image = document.getElementById('fullscreenImage');
    image.src = document.fullscreenElement ? './assets/img/icons/min.png' : './assets/img/icons/max.png';
}

/**
 * Shows the sound settings screen.
 * @param {MouseEvent} event - The click event on the sound button.
 */
function showSoundSettings(event) {
    soundSettingsScreen.classList.remove('d-none');
    if (world) IntervalHelper.pauseAllIntervals();
    updateMuteAllButton();
    removeControlFocus(event);
}

/**
 * Hides the sound settings screen.
 */
function hideSoundSettings() {
    soundSettingsScreen.classList.add('d-none');
    if (world && !world.gameStopped) IntervalHelper.resumeAllIntervals();
}

/**
 * Closes sound settings when the dark background is clicked.
 * @param {MouseEvent} event - The click event on the overlay.
 */
function closeSoundSettingsByClick(event) {
    if (event.target.id === 'soundSettingsScreen') hideSoundSettings();
}

/**
 * Switches all sounds on or off.
 * @param {MouseEvent} event - The click event on the mute all button.
 */
function toggleMuteAll(event) {
    SoundHelper.toggleAllMuted();
    soundVolumeSlider.value = SoundHelper.soundVolume;
    musicVolumeSlider.value = SoundHelper.musicVolume;
    updateMuteAllButton();
    removeControlFocus(event);
}

/**
 * Updates the saved game sound volume.
 */
function updateSoundVolume() {
    SoundHelper.setSoundVolume(soundVolumeSlider.value);
    updateMuteAllButton();
}

/**
 * Updates the saved background music volume.
 */
function updateMusicVolume() {
    SoundHelper.setMusicVolume(musicVolumeSlider.value);
    updateMuteAllButton();
}

/**
 * Updates the mute all button text and state.
 */
function updateMuteAllButton() {
    const muteAllButton = document.getElementById('muteAllButton');
    const allMuted = SoundHelper.allMuted();
    muteAllButton.classList.toggle('muted', allMuted);
    muteAllButton.textContent = allMuted ? 'Sound On' : 'Mute All';
}

/**
 * Closes the sound settings while the game is played.
 */
function closeVolumeControls() {
    hideSoundSettings();
}

/**
 * Removes focus from clicked sound controls.
 * @param {Event} event - The control event.
 */
function removeControlFocus(event) {
    if (event && event.currentTarget) event.currentTarget.blur();
}

/**
 * Stops the mobile browser menu on long button presses.
 * @param {Event} event - The context menu event.
 */
function preventContextMenu(event) {
    event.preventDefault();
}

// #endregion

// #region keyboard events

/**
 * Handles menu actions for pressed keys.
 * @param {string} code - The pressed key code.
 */
function handleKeyboardAction(code) {
    closeVolumeControls();
    if (codeClosesHowToPlay(code)) hideHowToPlay();
    if (codeClosesImpressum(code)) hideImpressum();
    if (codeClosesSoundSettings(code)) hideSoundSettings();
    if (codeStartsGame(code)) startGame();
    if (codeRestartsGame(code)) restartGame();
}

/**
 * Checks if the key should start the game.
 * @param {string} code - The pressed key code.
 * @returns {boolean} True if Enter should start the game.
 */
function codeStartsGame(code) {
    return code === 'Enter' && !world;
}

/**
 * Checks if the key should restart the game.
 * @param {string} code - The pressed key code.
 * @returns {boolean} True if Enter should restart the game.
 */
function codeRestartsGame(code) {
    return code === 'Enter' && isEndScreenVisible();
}

/**
 * Checks if an end screen is currently visible.
 * @returns {boolean} True if win or game over screen is visible.
 */
function isEndScreenVisible() {
    return !document.getElementById('gameOverScreen').classList.contains('d-none') ||
        !document.getElementById('winScreen').classList.contains('d-none');
}

/**
 * Checks if the key should close the key explanation.
 * @param {string} code - The pressed key code.
 * @returns {boolean} True if Escape should close how to play.
 */
function codeClosesHowToPlay(code) {
    return code === 'Escape' && !document.getElementById('howToPlayScreen').classList.contains('d-none');
}

/**
 * Checks if the key should close the impressum.
 * @param {string} code - The pressed key code.
 * @returns {boolean} True if Escape should close the impressum.
 */
function codeClosesImpressum(code) {
    return code === 'Escape' && !document.getElementById('impressumScreen').classList.contains('d-none');
}

/**
 * Checks if the key should close the sound settings.
 * @param {string} code - The pressed key code.
 * @returns {boolean} True if Escape should close the sound settings.
 */
function codeClosesSoundSettings(code) {
    return code === 'Escape' && !soundSettingsScreen.classList.contains('d-none');
}

// #endregion

// #region events

window.addEventListener('load', init);

// #endregion
