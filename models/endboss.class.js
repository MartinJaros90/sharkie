class Endboss extends MovableObject{
    x = 80;
    y = 30;
    height = 300;
    width = 380;
    hitCount = 0;
    isDying = false;
    currentDeadImage = 0;
    initialY = 30; 
    deadFloatingInterval = null;
    floatingOffset = 20;  
    floatingSpeed = 0.8;  
    isAttacking = false;
    attackCooldown = 1500; 
    lastAttack = 0;
    speed = 2; 
    introduceFinished = false;
    hadFirstContact = false;
    visible = false;
    energy = 100;
    maxHits = 4;

    movementPause = false;
    pauseDuration = 2000;  
    verticalSpeed = 1.2;
    lastDirectionChange = 0;
    directionChangeInterval = 3000;  
    verticalDirection = 1;  




    IMAGES_SWIMM = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    IMAGES_INTRODUCE = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'


    ];  //Videos von JUNUS "Jump animationen anzeigen"
    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];
    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];
    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];


    /**
     * Initializes the endboss with images and starts animation
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2400;
        this.animate();
        this.startAttackInterval();
    }

    /**
     * Draws the boss only if visible
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        if (this.visible) { 
            super.draw(ctx);
        }
    }

     /**
     * Handles all animation states of the boss
     */
     animate() {
        let i = 0;
        setInterval(() => {
            this.checkFirstContact();
            this.handleAnimationStates(i);
            this.updateMovement();
            if (this.hadFirstContact && !this.introduceFinished) {
                i++;
            }
        }, 150);
    }

    /**
     * Checks for first contact with the boss and initializes encounter
     * @private
     */
    checkFirstContact() {
        if (this.world?.character?.x > 2000 && !this.hadFirstContact) {
            this.initializeFirstContact();
        }
    }

    /**
     * Initializes the first contact state with the boss
     * @private
     */
    initializeFirstContact() {
        this.hadFirstContact = true;
        this.visible = true;
        AudioManager.stopBackgroundMusic();
        AudioManager.play('boss');
        this.world.endbossStatusBar.visible = true;
    }

    /**
     * Handles different animation states based on boss condition
     * @private
     * @param {number} introCounter - Counter for intro animation
     */
    handleAnimationStates(introCounter) {
        if (this.isDead()) {
            this.handleDeathAnimation();
        } else if (this.hadFirstContact && !this.introduceFinished) {
            this.handleIntroAnimation(introCounter);
        } else {
            this.handleNormalAnimations();
        }
    }

    /**
     * Handles death animation sequence
     * @private
     */
    handleDeathAnimation() {
        if (!this.isDying) {
            if (this.currentDeadImage < this.IMAGES_DEAD.length - 1) {
                this.playAnimation(this.IMAGES_DEAD);
                this.currentDeadImage++;
            } else {
                this.finishDeathAnimation();
            }
        }
    }

    /**
     * Completes the death animation sequence
     * @private
     */
    finishDeathAnimation() {
        this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
        this.isDying = true;
        this.startDeadFloating();
    }

    /**
     * Handles intro animation sequence
     * @private
     * @param {number} counter - Animation frame counter
     */
    handleIntroAnimation(counter) {
        this.playAnimation(this.IMAGES_INTRODUCE);
        if (counter >= 9) {
            this.introduceFinished = true;
            this.startMoving();
        }
    }

    /**
     * Handles normal state animations
     * @private
     */
    handleNormalAnimations() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.movementPause) {
            this.img = this.imageCache[this.IMAGES_SWIMM[0]];
        } else {
            this.playAnimation(this.IMAGES_SWIMM);
        }
    }

    /**
     * Updates boss movement if conditions are met
     * @private
     */
    updateMovement() {
        if (!this.isDead() && !this.isHurt() && 
            this.introduceFinished && !this.movementPause) {
            this.moveVertically();
        }
    }

    /**
     * Checks if boss intro should be triggered based on character position
     * @param {number} characterX - The x position of the character
     */
    checkBossIntro(characterX) {
        if (characterX > 2000 && !this.hadFirstContact) {
            this.hadFirstContact = true;
            this.visible = true;
            AudioManager.stopBackgroundMusic();
            AudioManager.play('boss');
            this.world.endbossStatusBar.visible = true; 
            this.playIntroAnimation();
        }
    }
    
    /**
     * Plays the boss introduction animation sequence
     */
    playIntroAnimation() {
        this.currentImage = 0;
        this.visible = true;
        let introInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_INTRODUCE);
            if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
                clearInterval(introInterval);
                this.introduceFinished = true;
                this.startMoving();
            }
        }, 200);
    }

    /**
     * Initiates the boss's movement patterns
     */
    startMoving() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && this.introduceFinished && this.hadFirstContact) {
                if (this.movementPause) return; 
                
                this.moveHorizontally();
                this.moveVertically();
                this.checkDirectionChange();
                this.randomlyPause();
            }
        }, 1000 / 60);
    }

    /**
     * Handles horizontal movement towards the player
     */
    moveHorizontally() {
        if (this.world?.character) {
            if (this.x > this.world.character.x) {
                this.x -= this.speed;
            }
        }
    }

    /**
     * Handles vertical movement within boundaries
     */
    moveVertically() {
        this.y += this.verticalSpeed * this.verticalDirection;
        
        let minY = 50; 
        let maxY = 180; 
        
        if (this.y < minY) {
            this.y = minY;
            this.verticalDirection = 1;
        } else if (this.y > maxY) {
            this.y = maxY;
            this.verticalDirection = -1;
        }
    }

    /**
     * Initiates random pause in movement
     */
    randomlyPause() {
        if (!this.movementPause && Math.random() < 0.01) {
            this.movementPause = true;
            
            setTimeout(() => {
                this.movementPause = false;
            }, this.pauseDuration);
        }
    }

    /**
     * Checks and handles vertical direction changes
     */
    checkDirectionChange() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastDirectionChange > this.directionChangeInterval) {
            if (Math.random() > 0.3) {
                this.verticalDirection *= -1;
            }
            this.lastDirectionChange = currentTime;
        }
    }

    /**
     * Starts the attack interval for regular and combo attacks
     */
    startAttackInterval() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.movementPause) {
                let distanceToPlayer = Math.abs(this.x - this.world?.character?.x);
                
                if (distanceToPlayer < 300 && Math.random() < 0.3) {
                    this.startComboAttack();
                } else {
                    this.attack();
                }
            }
        }, this.attackCooldown);
    }

    /**
     * Initiates a combo attack sequence
     */
    startComboAttack() {
        if (this.comboAttackActive) return;
        
        this.comboAttackActive = true;
        this.speed *= 1.5; 
        this.attack();
        
        setTimeout(() => {
            if (!this.isDead() && !this.isHurt()) {
                this.attack();
            }
    
            setTimeout(() => {
                this.comboAttackActive = false;
                this.speed = 2; 
            }, 1000);
        }, 700);  
    }

    /**
     * Performs a single attack
     */
    attack() {
        if (this.movementPause || this.isAttacking) return;
        
        this.isAttacking = true;
        
        let attackDuration = this.comboAttackActive ? 600 : 1000;
        
        setTimeout(() => {
            this.isAttacking = false;
        }, attackDuration);
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
     * Handles boss taking damage
     */
    hit() {
        this.hitCount++;
        this.energy -= 20;  
        
        if (this.energy < 0) {
            this.energy = 0;
        }
        
        this.world.endbossStatusBar.setPercentage(this.energy);
        this.lastHit = new Date().getTime();
    
        if (this.isDead()) {
            this.startVictorySequence(); 
        }
    }

    /**
     * Initiates victory sequence when boss is defeated
     */
    startVictorySequence() {
        AudioManager.stopAll();
        AudioManager.play('victory'); 
        hideMobileControls();
        
        setTimeout(() => {
            this.showVictoryScreen();
        }, 2000);
    }

    showVictoryScreen() {
        if (!this.world.victoryScreen) {
            this.world.victoryScreen = new VictoryScreen(this.world);
            this.world.victoryScreen.show();
        }
    }

    playDeadAnimation() {
        let currentDeadImage = 0;
        let deadInterval = setInterval(() => {
            if (currentDeadImage < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[currentDeadImage]];
                currentDeadImage++;
            } else {
                clearInterval(deadInterval);
            }
        }, 200);
    }

    /**
     * Behandelt den Tod des Endbosses
     */
    die() {
        if (!this.isDying) {
            this.isDying = true;
            this.playDeadAnimation();
            setTimeout(() => {
                this.showVictoryScreen();
            }, 1000);
        }
    }
    /**
     * Initializes configuration for victory screen
     * @private
     * @returns {Object} Victory screen configuration
     */
    initializeVictoryConfig() {
        return {
            ctx: this.world.ctx,
            canvas: this.world.canvas,
            alpha: 0,
            scale: 0.1,
            time: 0,
            victoryImage: this.createVictoryImage()
        };
    }

    /**
     * Creates and loads victory image
     * @private
     * @returns {HTMLImageElement} Victory image element
     */
    createVictoryImage() {
        let victoryImage = new Image();
        victoryImage.src = 'img/6.Botones/Tittles/You win/Recurso 19.png';
        return victoryImage;
    }

    /**
     * Loads and starts victory screen animation
     * @private
     * @param {Object} config - Victory screen configuration
     */
    loadAndAnimateVictoryScreen(config) {
        config.victoryImage.onload = () => {
            let animate = () => {
                this.clearAndDrawBackground(config);
                
                if (this.isImageReady(config.victoryImage)) {
                    this.drawVictoryImage(config);
                    this.updateAnimationValues(config);
                }
                
                requestAnimationFrame(animate);
            };
            animate();
        };
    }

    /**
     * Clears canvas and draws background
     * @private
     * @param {Object} config - Victory screen configuration
     */
    clearAndDrawBackground(config) {
        let { ctx, canvas, alpha } = config;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = `rgba(0, 0, 50, ${Math.min(alpha * 0.5, 0.7)})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    /**
     * Checks if victory image is ready to be drawn
     * @private
     * @param {HTMLImageElement} image - Victory image element
     * @returns {boolean} True if image is ready
     */
    isImageReady(image) {
        return image.complete && image.naturalWidth !== 0;
    }

    /**
     * Draws victory image and effects
     * @private
     * @param {Object} config - Victory screen configuration
     */
    drawVictoryImage(config) {
        let { ctx, canvas, victoryImage, alpha, scale, time } = config;
        let dimensions = this.calculateImageDimensions(config);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(victoryImage, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        
        if (alpha >= 1) {
            this.drawVictoryEffects(ctx, canvas, alpha, time);
        } else {
            this.drawVictoryEffects(ctx, canvas, alpha);
        }
        ctx.restore();
    }

    /**
     * Calculates dimensions for victory image
     * @private
     * @param {Object} config - Victory screen configuration
     * @returns {Object} Image dimensions and position
     */
    calculateImageDimensions(config) {
        let { canvas, victoryImage, scale } = config;
        let imgWidth = canvas.width * 0.6 * (scale >= 1 ? 1 : scale);
        let imgHeight = (imgWidth * victoryImage.height) / victoryImage.width;
        let x = (canvas.width - imgWidth) / 2;
        let y = (canvas.height - imgHeight) / 2;
        
        return { width: imgWidth, height: imgHeight, x, y };
    }

    /**
     * Updates animation values for next frame
     * @private
     * @param {Object} config - Victory screen configuration
     */
    updateAnimationValues(config) {
        if (config.alpha < 1) {
            config.alpha = Math.min(config.alpha + 0.01, 1);
        }
        if (config.scale < 1) {
            config.scale = Math.min(config.scale + 0.02, 1);
        }
        config.time += 0.02;
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
    
    /**
     * Draws the victory text on the canvas with fade effect
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     * @param {HTMLCanvasElement} canvas - The canvas element
     * @param {number} alpha - The base opacity value for the text
     */
    drawVictoryText(ctx, canvas, alpha) {
        let textAlpha = Math.max(0, (alpha - 0.3) * 1.5);
        ctx.font = "30px 'luckiest-guy'";
        ctx.fillStyle = `rgba(127, 255, 224, ${textAlpha})`;
        ctx.textAlign = 'center';
        ctx.fillText('Congratulations!', canvas.width / 2, canvas.height * 0.8);
    }

    /**
     * Checks if the boss is dead
     * @returns {boolean} True if boss's health is depleted
     */
    isDead() {
        return this.hitCount >= this.maxHits; 
    }

}