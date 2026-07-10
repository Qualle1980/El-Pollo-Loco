/**
 * Handles sound creation, playback and saved audio settings.
 * @class
 */
export class SoundHelper {
    // #region properties

    static sounds = [];
    static musicSounds = [];
    static effectSounds = [];
    static muted = SoundHelper.getStoredMuted();
    static soundVolume = SoundHelper.getStoredSoundVolume();
    static musicVolume = SoundHelper.getStoredMusicVolume();

    // #endregion

    // #region sound setup

    /**
     * Creates an audio file and stores it for global sound settings.
     * @param {string} path - The audio file path.
     * @param {boolean} isMusic - True if the sound is background music.
     * @param {number} volume - The base volume from 0 to 1.
     * @returns {HTMLAudioElement} The created audio element.
     */
    static createSound(path, isMusic = false, volume = 1) {
        const sound = new Audio(path);
        sound.baseVolume = SoundHelper.getValidVolume(volume);
        SoundHelper.registerSound(sound, isMusic);
        return sound;
    }

    /**
     * Stores one sound and applies the saved settings.
     * @param {HTMLAudioElement} sound - The audio element.
     * @param {boolean} isMusic - True if the sound is background music.
     */
    static registerSound(sound, isMusic) {
        SoundHelper.sounds.push(sound);
        if (isMusic) SoundHelper.musicSounds.push(sound);
        else SoundHelper.effectSounds.push(sound);
        SoundHelper.applySettings(sound, isMusic);
    }

    /**
     * Applies mute and volume settings to one audio file.
     * @param {HTMLAudioElement} sound - The audio element.
     * @param {boolean} isMusic - True if the sound is background music.
     */
    static applySettings(sound, isMusic) {
        if (isMusic) SoundHelper.applyMusicSettings(sound);
        else SoundHelper.applyEffectSettings(sound);
    }

    // Applies settings to one effect sound.
    static applyEffectSettings(sound) {
        sound.muted = SoundHelper.muted;
        SoundHelper.setEffectSoundVolume(sound);
    }

    // Applies settings to one music sound.
    static applyMusicSettings(sound) {
        sound.muted = false;
        SoundHelper.setMusicSoundVolume(sound);
    }

    // #endregion

    // #region playback

    /**
     * Plays a short sound effect from the beginning.
     * @param {HTMLAudioElement} sound - The audio element.
     */
    static playSound(sound) {
        if (!sound || SoundHelper.muted) return;
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    /**
     * Starts a music file and keeps it looping.
     * @param {HTMLAudioElement} sound - The audio element.
     */
    static playMusic(sound) {
        if (!sound) return;
        sound.loop = true;
        sound.play().catch(() => {});
    }

    /**
     * Pauses one audio file and resets it.
     * @param {HTMLAudioElement} sound - The audio element.
     */
    static pauseSound(sound) {
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
    }

    // #endregion

    // #region settings

    /**
     * Switches all game sound effects on or off.
     * @returns {boolean} True if sound effects are muted.
     */
    static toggleMuted() {
        SoundHelper.setMuted(!SoundHelper.muted);
        return SoundHelper.muted;
    }

    /**
     * Stores and applies the effect mute setting.
     * @param {boolean} isMuted - True if game sound effects should be muted.
     */
    static setMuted(isMuted) {
        SoundHelper.muted = isMuted;
        localStorage.setItem('audioMuted', String(isMuted));
        SoundHelper.effectSounds.forEach((sound) => sound.muted = isMuted);
    }

    /**
     * Stores and applies the game sound volume.
     * @param {number|string} volume - The game sound volume from 0 to 1.
     */
    static setSoundVolume(volume) {
        SoundHelper.soundVolume = SoundHelper.getValidVolume(volume);
        localStorage.setItem('soundVolume', SoundHelper.soundVolume);
        SoundHelper.setMuted(SoundHelper.soundVolume === 0);
        SoundHelper.effectSounds.forEach((sound) => SoundHelper.setEffectSoundVolume(sound));
    }

    /**
     * Stores and applies the music volume.
     * @param {number|string} volume - The music volume from 0 to 1.
     */
    static setMusicVolume(volume) {
        SoundHelper.musicVolume = SoundHelper.getValidVolume(volume);
        localStorage.setItem('musicVolume', SoundHelper.musicVolume);
        SoundHelper.musicSounds.forEach((sound) => SoundHelper.setMusicSoundVolume(sound));
    }

    // Applies the saved volume to one effect sound.
    static setEffectSoundVolume(sound) {
        const baseVolume = sound.baseVolume === undefined ? 1 : sound.baseVolume;
        sound.volume = SoundHelper.soundVolume * baseVolume;
    }

    // Applies the saved volume to one music sound.
    static setMusicSoundVolume(sound) {
        sound.volume = SoundHelper.musicVolume;
    }

    // #endregion

    // #region storage

    // Reads the saved mute setting.
    static getStoredMuted() {
        return localStorage.getItem('audioMuted') === 'true';
    }

    // Reads the saved game sound volume.
    static getStoredSoundVolume() {
        const volume = localStorage.getItem('soundVolume');
        if (SoundHelper.getStoredMuted()) return 0;
        return volume === null ? 1 : SoundHelper.getValidVolume(volume);
    }

    // Reads the saved music volume.
    static getStoredMusicVolume() {
        const volume = localStorage.getItem('musicVolume');
        return volume === null ? 0.2 : SoundHelper.getValidVolume(volume);
    }

    /**
     * Keeps the volume between 0 and 1.
     * @param {number|string} volume - The volume value.
     * @returns {number} A valid volume between 0 and 1.
     */
    static getValidVolume(volume) {
        const number = Number(volume);
        if (Number.isNaN(number)) return 0.2;
        return Math.min(1, Math.max(0, number));
    }

    // #endregion
}
