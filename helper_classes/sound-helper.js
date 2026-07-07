export class SoundHelper {
    // #region properties

    static sounds = [];
    static musicSounds = [];
    static muted = SoundHelper.getStoredMuted();
    static musicVolume = SoundHelper.getStoredMusicVolume();

    // #endregion

    // #region sound setup

    // Creates an audio file and stores it for global sound settings.
    static createSound(path, isMusic = false) {
        const sound = new Audio(path);
        SoundHelper.registerSound(sound, isMusic);
        return sound;
    }

    // Stores one sound and applies the saved settings.
    static registerSound(sound, isMusic) {
        SoundHelper.sounds.push(sound);
        if (isMusic) SoundHelper.musicSounds.push(sound);
        SoundHelper.applySettings(sound, isMusic);
    }

    // Applies mute and volume settings to one audio file.
    static applySettings(sound, isMusic) {
        sound.muted = SoundHelper.muted;
        if (isMusic) sound.volume = SoundHelper.musicVolume;
    }

    // #endregion

    // #region playback

    // Plays a short sound effect from the beginning.
    static playSound(sound) {
        if (!sound || SoundHelper.muted) return;
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    // Starts a music file and keeps it looping.
    static playMusic(sound) {
        if (!sound) return;
        sound.loop = true;
        sound.play().catch(() => {});
    }

    // Pauses one audio file and resets it.
    static pauseSound(sound) {
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
    }

    // #endregion

    // #region settings

    // Switches all game sounds on or off.
    static toggleMuted() {
        SoundHelper.setMuted(!SoundHelper.muted);
        return SoundHelper.muted;
    }

    // Stores and applies the mute setting.
    static setMuted(isMuted) {
        SoundHelper.muted = isMuted;
        localStorage.setItem('audioMuted', String(isMuted));
        SoundHelper.sounds.forEach((sound) => sound.muted = isMuted);
    }

    // Stores and applies the music volume.
    static setMusicVolume(volume) {
        SoundHelper.musicVolume = SoundHelper.getValidVolume(volume);
        localStorage.setItem('musicVolume', SoundHelper.musicVolume);
        SoundHelper.musicSounds.forEach((sound) => sound.volume = SoundHelper.musicVolume);
    }

    // #endregion

    // #region storage

    // Reads the saved mute setting.
    static getStoredMuted() {
        return localStorage.getItem('audioMuted') === 'true';
    }

    // Reads the saved music volume.
    static getStoredMusicVolume() {
        const volume = localStorage.getItem('musicVolume');
        return volume === null ? 0.2 : SoundHelper.getValidVolume(volume);
    }

    // Keeps the volume between 0 and 1.
    static getValidVolume(volume) {
        const number = Number(volume);
        if (Number.isNaN(number)) return 0.2;
        return Math.min(1, Math.max(0, number));
    }

    // #endregion
}
