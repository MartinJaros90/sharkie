class AudioManager {
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

    static muted = true;

    static init() {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5;
            sound.muted = this.muted;
        });
    
        this.sounds.background.loop = true;
        this.sounds.background.volume = 0.3;
        this.sounds.boss.loop = true;
        this.sounds.boss.volume = 0.3;
    }

    static startBackgroundMusic() {
        if (!this.muted) {
            this.sounds.background.play();
        }
    }
    
    static stopBackgroundMusic() {
        this.sounds.background.pause();
        this.sounds.background.currentTime = 0;
    }
    
    static pauseBackgroundMusic() {
        this.sounds.background.pause();
    }

    static play(soundName) {
        if (this.sounds[soundName] && !this.muted) { 
            this.sounds[soundName].play();
        }
    }

    static stop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }

    static pause(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
        }
    }

    static setVolume(soundName, volume) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].volume = volume;
        }
    }

    static muteAll() {
        this.muted = true; 
        Object.values(this.sounds).forEach(sound => {
            sound.muted = true;
        });
        this.pauseBackgroundMusic();  
    }

    static unmuteAll() {
        this.muted = false;  
        Object.values(this.sounds).forEach(sound => {
            sound.muted = false;
        });
        this.startBackgroundMusic();  
    }

    static stopAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}