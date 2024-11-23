class EndbossAnimation {
    constructor(endboss) {
        this.endboss = endboss;
        this.world = endboss.world;
        this.IMAGES_SWIMM = endboss.IMAGES_SWIMM;
        this.IMAGES_INTRODUCE = endboss.IMAGES_INTRODUCE;
        this.IMAGES_HURT = endboss.IMAGES_HURT;
        this.IMAGES_DEAD = endboss.IMAGES_DEAD;
        this.IMAGES_ATTACK = endboss.IMAGES_ATTACK;
        this.imageCache = endboss.imageCache;
    }


    /**
     * Handles the death animation sequence of the end boss
     * Plays the death animation using the dead images array
     */
    handleDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Completes the death animation sequence
     * Sets the final death image, marks boss as dying and starts floating animation
     * @private
     */
    finishDeathAnimation() {
        this.endboss.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        this.endboss.isDying = true;
        this.startDeadFloating();
    }

    /**
     * Handles the introduction animation sequence
     * Plays the intro animation and starts boss movement when complete
     * @param {number} counter - Current frame counter of the intro animation
     */
    handleIntroAnimation(counter) {
        this.playAnimation(this.IMAGES_INTRODUCE);
        if (counter >= 9) {
            this.endboss.introduceFinished = true;
            this.endboss.startMoving();
        }
    }

    /**
     * Plays an animation sequence using the provided image array
     * Updates the current image and increments the animation counter
     * @param {string[]} images - Array of image paths for the animation
     */
    playAnimation(images) {
        let i = this.endboss.currentImage % images.length;
        let path = images[i];
        this.endboss.img = this.endboss.imageCache[path];
        this.endboss.currentImage++;
    }

    /**
     * Plays the boss introduction animation sequence
     */
    playIntroAnimation() {
        let introCounter = 0;
        this.endboss.currentImage = 0;

        if (this.introInterval) {
            clearInterval(this.introInterval);
        }
        
        this.introInterval = setInterval(() => {
            if (introCounter < this.IMAGES_INTRODUCE.length) {
                this.endboss.img = this.imageCache[this.IMAGES_INTRODUCE[introCounter]];
                introCounter++;
            } else {
                clearInterval(this.introInterval);
                this.endboss.introduceFinished = true;
                this.endboss.startMoving();
            }
        }, 150); 
    }

    /**
     * Initiates floating animation after death
     */
        startDeadFloating() {
            let time = 0;
            this.deadFloatingInterval = setInterval(() => {
                this.y = this.initialY + Math.sin(time) * this.floatingOffset;
                time += this.floatingSpeed / 60; 
            }, 1000 / 60);  
        }

    /**
     * Initiates victory sequence when boss is defeated
     */
    startVictorySequence() {
        if (!this.endboss?.world) return;
        
        AudioManager.stopAll();
        AudioManager.play('victory');
        hideMobileControls();
        
        setTimeout(() => {
            this.showVictoryScreen();
        }, 2000);
    }
    
    /**
     * Displays the victory screen after boss defeat
     * Initializes a new VictoryScreen instance if none exists
     * @returns {void}
     */
    showVictoryScreen() {
        if (!this.endboss?.world) return;
        
        if (!this.endboss.world.victoryScreen) {
            this.endboss.world.victoryScreen = new VictoryScreen(this.endboss.world);
            this.endboss.world.victoryScreen.show();
        }
    }

    /**
     * Plays the death animation sequence for the endboss
     * Cycles through death animation frames and calls finishDeathAnimation when complete
     * @returns {void}
     */
    playDeadAnimation() {
        let currentDeadImage = 0;
        let deadInterval = setInterval(() => {
            if (currentDeadImage < this.IMAGES_DEAD.length) {
                this.endboss.img = this.imageCache[this.IMAGES_DEAD[currentDeadImage]];
                currentDeadImage++;
            } else {
                clearInterval(deadInterval);
                this.finishDeathAnimation();
            }
        }, 200);
    }
    
    /**
     * Draws victory screen effects
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @param {number} alpha - The opacity value
     * @param {number} [time=0] - The animation time
     */
    drawVictoryEffects(ctx, canvas, alpha, time = 0) {
        this.drawStars(ctx, canvas, alpha, time);
        this.drawVictoryText(ctx, canvas, alpha);
    }
    
    /**
     * Draws animated stars effect
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @param {number} alpha - The opacity value
     * @param {number} [time=0] - The animation time
     */
    drawStars(ctx, canvas, alpha, time = 0) {
        for (let i = 0; i < 100; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let size = Math.random() * 2 + 1;
            
            let pulse = time ? Math.sin(time + i) * 0.3 + 0.7 : 1;
            let flickerAlpha = alpha * pulse * (0.5 + Math.random() * 0.5);
            
            ctx.fillStyle = `rgba(255, 255, 255, ${flickerAlpha})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
