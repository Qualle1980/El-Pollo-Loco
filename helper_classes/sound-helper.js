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

    // Creates an audio file and stores it for global sound settings.
    static createSound(path, isMusic = false, volume = 1) {
        const sound = new Audio(path);
        sound.baseVolume = SoundHelper.getValidVolume(volume);
        SoundHelper.registerSound(sound, isMusic);
        return sound;
    }

    // Stores one sound and applies the saved settings.
    static registerSound(sound, isMusic) {
        SoundHelper.sounds.push(sound);
        if (isMusic) SoundHelper.musicSounds.push(sound);
        else SoundHelper.effectSounds.push(sound);
        SoundHelper.applySettings(sound, isMusic);
    }

    // Applies mute and volume settings to one audio file.
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

    // Switches all game sound effects on or off.
    static toggleMuted() {
        SoundHelper.setMuted(!SoundHelper.muted);
        return SoundHelper.muted;
    }

    // Stores and applies the effect mute setting.
    static setMuted(isMuted) {
        SoundHelper.muted = isMuted;
        localStorage.setItem('audioMuted', String(isMuted));
        SoundHelper.effectSounds.forEach((sound) => sound.muted = isMuted);
    }

    // Stores and applies the game sound volume.
    static setSoundVolume(volume) {
        SoundHelper.soundVolume = SoundHelper.getValidVolume(volume);
        localStorage.setItem('soundVolume', SoundHelper.soundVolume);
        SoundHelper.setMuted(SoundHelper.soundVolume === 0);
        SoundHelper.effectSounds.forEach((sound) => SoundHelper.setEffectSoundVolume(sound));
    }

    // Stores and applies the music volume.
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

    // Keeps the volume between 0 and 1.
    static getValidVolume(volume) {
        const number = Number(volume);
        if (Number.isNaN(number)) return 0.2;
        return Math.min(1, Math.max(0, number));
    }

    // #endregion
}
