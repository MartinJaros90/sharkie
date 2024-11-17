class CharacterAnimationManager {
    constructor(character) {
        this.character = character;
        this.idleInterval = null;
        this.longIdleInterval = null;
        this.longIdleTimeout = null;
        this.throwAnimationInterval = null;
        this.slapAnimationInterval = null;
    }

    playLongIdleAnimation() {
        clearInterval(this.idleInterval);
        clearInterval(this.longIdleInterval);

        this.longIdleInterval = setInterval(() => {
            this.character.playAnimation(this.character.IMAGES_LONG_IDLE);
        }, 500);
    }

    clearAllAnimations() {
        clearInterval(this.idleInterval);
        clearInterval(this.longIdleInterval);
        clearTimeout(this.longIdleTimeout);
        clearInterval(this.slapAnimationInterval);
        clearInterval(this.throwAnimationInterval);
        this.idleInterval = null;
        this.longIdleInterval = null;
        this.longIdleTimeout = null;
        this.slapAnimationInterval = null;
        this.throwAnimationInterval = null;
    }

    playDeathAnimation() {
        let currentFrame = 0;
        let frameCount = this.character.IMAGES_DEAD.length;
        let startTime = Date.now();
        let animationDuration = 2000; 
        
        let deathInterval = setInterval(() => {
            let currentTime = Date.now();
            let elapsed = currentTime - startTime;
            let progress = Math.min(elapsed / animationDuration, 1);
            
            currentFrame = Math.min(Math.floor(progress * frameCount), frameCount - 1);
            this.character.img = this.character.imageCache[this.character.IMAGES_DEAD[currentFrame]];
            if (progress >= 1) {
                clearInterval(deathInterval);
                this.character.deathAnimationComplete = true;
                
                setTimeout(() => {
                    this.character.showGameOverScreen();
                }, 2000);
            }
        }, 1000 / 30);
    }

    clearIdleAnimations() {
        clearInterval(this.idleInterval);
        clearInterval(this.longIdleInterval);
        clearTimeout(this.longIdleTimeout);
        this.idleInterval = null;
        this.longIdleInterval = null;
        this.longIdleTimeout = null;
    }

    handleIdleAnimations() {
        if (!this.idleInterval) {
            this.startIdleAnimation();
        }
        if (!this.longIdleTimeout) {
            this.startLongIdleTimer();
        }
    }

    startIdleAnimation() {
        this.idleInterval = setInterval(() => {
            this.character.playAnimation(this.character.IMAGES_IDLE);
        }, 100);
    }

    startLongIdleTimer() {
        this.longIdleTimeout = setTimeout(() => {
            this.playLongIdleAnimation();
        }, 8000);
    }

    startThrowAnimation(callback) {
        if (!this.character.canThrow || this.throwAnimationInterval) return;

        this.character.canThrow = false;
        this.character.currentImage = 0;
        
        this.throwAnimationInterval = setInterval(() => {
            this.character.playAnimation(this.character.IMAGES_THROW);
            
            if (this.character.currentImage === 4) {
                if (callback) {
                    callback(this.character.otherDirection);
                    AudioManager.play('bubble');
                }
            }
            
            if (this.character.currentImage >= this.character.IMAGES_THROW.length) {
                this.endThrowAnimation();
                
                setTimeout(() => {
                    this.character.canThrow = true;
                }, this.character.bubbleCooldown); 
            }
        }, 1000 / 25); 
    }

    endThrowAnimation() {
        clearInterval(this.throwAnimationInterval);
        this.throwAnimationInterval = null;
    }

    startSlapAnimation() {
        let slapHitRegistered = false;
        
        this.slapAnimationInterval = setInterval(() => {
            this.character.playAnimation(this.character.IMAGES_SLAP);
            this.character.updateSlapWidth();
            this.character.checkSlapHit(slapHitRegistered);
            this.character.checkSlapAnimationEnd();
        }, 50);
    }

    updateSlapAnimation() {
        if (this.character.currentImage >= this.character.IMAGES_SLAP.length) {
            this.endSlapAnimation();
        }
    }

    endSlapAnimation() {
        clearInterval(this.slapAnimationInterval);
        this.slapAnimationInterval = null;
        this.character.isSlapping = false;
        this.character.width = this.character.originalWidth;
    }  
}
