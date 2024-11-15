class AudioManager {
    static sounds = {
        swimming: new Audio('audio/swimm.mp3'),
        background: new Audio('audio/background.mp3'),
        hurt: new Audio('audio/hurt.mp3'),
        // Neue Sounds einfach hier hinzufügen
        bubble: new Audio('audio/bubble.mp3'),
        coin: new Audio('audio/coin.mp3'),
        poison: new Audio('audio/poison.mp3'),
        slap: new Audio('audio/slap.mp3'),
        victory: new Audio('audio/victory.mp3'),
        gameOver: new Audio('audio/game-over.mp3'),
        boss : new Audio('audio/boss-sound.mp3'),
        shock: new Audio('audio/shock.mp3')
    };

    static init() {
        // Initialisiere Standardeinstellungen für alle Sounds
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5; // Standardlautstärke
        });
    
        // Spezielle Einstellungen für Hintergrundmusik
        this.sounds.background.loop = true;     // Musik wird endlos wiederholt
        this.sounds.background.volume = 0.3;    // Etwas leiser als Effekte
        this.sounds.boss.loop = true;      // Boss-Musik auch in Schleife
        this.sounds.boss.volume = 0.3; 
    }

    static startBackgroundMusic() {
        this.sounds.background.play();
    }
    
    static stopBackgroundMusic() {
        this.sounds.background.pause();
        this.sounds.background.currentTime = 0;
    }
    
    static pauseBackgroundMusic() {
        this.sounds.background.pause();
    }

    static play(soundName) {
        if (this.sounds[soundName]) {
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
            this.sounds[soundName].volume = volume; // 0.0 bis 1.0
        }
    }

    static muteAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.muted = true;
        });
    }

    static unmuteAll() {
        Object.values(this.sounds).forEach(sound => {
            sound.muted = false;
        });
    }
}


// AudioManager.play('bubble');  // Beim Werfen einer Blase
// AudioManager.play('coin');    // Beim Einsammeln einer Münze
// AudioManager.play('slap');    // Beim Angriff
