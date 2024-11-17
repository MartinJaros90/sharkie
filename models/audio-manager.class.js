class AudioManager {

    /** 
     * Collection of all game audio elements
     * @static
     * @type {Object.<string, HTMLAudioElement>}
     */
    static sounds = {
        swimming: new Audio('audio/swimm.mp3'),
        background: new Audio('audio/background.mp3'),
        hurt: new Audio('audio/hurt.mp3'),
        bubble: new Audio('audio/bubble.mp3'),
        coin: new Audio('audio/coin.mp3'),
        poison: new Audio('audio/poison.mp3'),
        slap: new Audio('audio/slap.mp3'),
        victory: new Audio('audio/victory.mp3'),
        boss: new Audio('audio/boss-sound.mp3'),
        shock: new Audio('audio/shock.mp3')
    };

    /** 
     * Global mute state
     * @static
     * @type {boolean}
     */
    static muted = true;

        /**
     * Initializes all audio settings
     * @static
     */
    static init() {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.3;
            sound.muted = this.muted;
        });
    
        this.sounds.background.loop = true;
        this.sounds.background.volume = 0.2;
        this.sounds.boss.loop = true;
        this.sounds.boss.volume = 0.2;
    }

        /**
     * Starts playing the background music if not muted
     * @static
     */
    static startBackgroundMusic() {
        if (!this.muted) {
            this.sounds.background.play();
        }
    }
    
    /**
     * Stops and resets the background music
     * @static
     */
    static stopBackgroundMusic() {
        this.sounds.background.pause();
        this.sounds.background.currentTime = 0;
    }
    
    /**
     * Pauses the background music
     * @static
     */
    static pauseBackgroundMusic() {
        this.sounds.background.pause();
    }

    /**
     * Plays a specific sound by name
     * @static
     * @param {string} soundName - The name of the sound to play
     */
    static play(soundName) {
        if (this.sounds[soundName] && !this.muted) { 
            this.sounds[soundName].play();
        }
    }

    /**
     * Stops and resets a specific sound
     * @static
     * @param {string} soundName - The name of the sound to stop
     */
    static stop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }

    /**
     * Pauses a specific sound
     * @static
     * @param {string} soundName - The name of the sound to pause
     */
    static pause(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
        }
    }

    /**
     * Sets the volume for a specific sound
     * @static
     * @param {string} soundName - The name of the sound
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    static setVolume(soundName, volume) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].volume = volume;
        }
    }

    /**
     * Mutes all sounds and stops background music
     * @static
     */
    static muteAll() {
        this.muted = true; 
        Object.values(this.sounds).forEach(sound => {
            sound.muted = true;
        });
        this.pauseBackgroundMusic();  
    }

    /**
     * Unmutes all sounds and starts background music
     * @static
     */
    static unmuteAll() {
        this.muted = false;  
        Object.values(this.sounds).forEach(sound => {
            sound.muted = false;
        });
        this.startBackgroundMusic();  
    }

    /**
     * Stops and resets all sounds
     * @static
     */
    static stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}