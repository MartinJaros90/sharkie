class CharacterCombat extends Character {
    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
    IMAGES_ELECTROSHOCK = [
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];
    IMAGES_THROW = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];
    IMAGES_SLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];
    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png'

    ];

    constructor() {
        super(); 
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ELECTROSHOCK);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SLAP);
        this.loadImages(this.IMAGES_DEAD);
    }
    
    bubbleCooldown = 1000;
    canThrow = true;
    isSlapping = false;
    isElectrocuted = false;
    slapCooldown = 3; 
    cooldownDisplay = '';
    canSlap = true;
    isDying = false;
    deathAnimationComplete = false;


    /**
     * Handles attack inputs
     * @private
     */
    handleAttacks() {
        if (this.world.keyboard.D && !this.isStunned) {
            this.slapAttack();
        }
    }

    /**
     * Handles the slap attack mechanic
     */
    slapAttack() {
        if (!this.canPerformSlap()) return;
        
        this.initializeSlap();
        this.startSlapAnimation();
    }

    /**
     * Checks for collision with enemies during slap attack
     * @param {boolean} slapHitRegistered - Whether a hit has already been registered
     */
    checkSlapHit(slapHitRegistered) {
        if (this.isInSlapHitFrames() && !slapHitRegistered) {
            this.world.level.enemies.forEach(enemy => {
                if (this.canHitEnemy(enemy) && !enemy.isHit) { 
                    enemy.isHit = true; 
                    this.handleEnemyHit(enemy);
                    setTimeout(() => {
                        enemy.isHit = false;
                    }, 500);
                }
            });
        }
    }

    /**
     * Updates character width during slap animation
     */
    updateSlapWidth() {
        if (this.currentImage < this.IMAGES_SLAP.length / 2) {
            this.width = this.originalWidth * 1.15;
        } else {
            this.width = this.originalWidth;
        }
    }

    /**
     * Updates the slap animation state
     */
    updateSlapAnimation() {
        this.animationManager.updateSlapAnimation();
    }

    /**
     * Starts the throw animation with optional callback
     * @param {Function} callback - Function to execute at specific animation frame
     */
    startThrowAnimation(callback) {
        this.animationManager.startThrowAnimation(callback);
    }

    /**
     * Checks if target is an electric-type enemy
     * @param {Enemy} enemy - The enemy to check
     * @returns {boolean} True if enemy can cause electrocution
     */
    checkElectroShock(enemy) {
        return enemy instanceof EnemyJelly || enemy instanceof EnemyYellow;
    }

    /**
     * Handles electrocution effect from jellyfish
     */
    receiveElectroShock() {
        if (!this.isElectrocuted) {
            this.isElectrocuted = true;
            this.currentImage = 0;
            AudioManager.play('shock');
            let shockInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_ELECTROSHOCK);
                if (this.currentImage >= this.IMAGES_ELECTROSHOCK.length - 1) {
                    clearInterval(shockInterval);
                    this.isElectrocuted = false;
                }
            }, 100);
        }
    }

    /**
     * Checks if character is dead
     * @returns {boolean} True if character has no energy
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Handles hurt animation state
     * @private
     */
    handleHurtAnimation() {
        if (this.isElectrocuted) {
            this.playAnimation(this.IMAGES_ELECTROSHOCK);
        } else {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * Handles death animation state
     * @private
     */
    handleDeathAnimation() {
        if (!this.isDying && !this.deathAnimationComplete) {
            this.isDying = true;
            this.clearAllAnimations();
            this.playDeathAnimation();
        }
    }

    /**
     * Shows game over screen when character dies
     */
    showGameOverScreen() {
        if (!this.gameOver) {
            this.gameOver = new GameOver(this.world);
        }
        this.gameOver.show();
    }

        /**
     * Checks if target is within attack range
     * @param {MovableObject} enemy - The target to check
     * @param {number} range - The attack range to check
     * @returns {boolean} Whether target is in range
     */
    isWithinExtendedRange(enemy, range) {
        if (enemy.isTrappedInBubble) {
            return false;
        }

        let attackBox = {
            x: this.otherDirection ? this.x - range : this.x + this.width,
            y: this.y + this.height * 0.3,
            width: range,
            height: this.height * 0.4
        };

        return (
            attackBox.x < enemy.x + enemy.width &&
            attackBox.x + attackBox.width > enemy.x &&
            attackBox.y < enemy.y + enemy.height &&
            attackBox.y + attackBox.height > enemy.y
        );
    }

    /**
     * Checks if character can perform a slap attack
     * @returns {boolean} Whether the character can slap
     */
    canPerformSlap() {
        return this.canSlap && !this.slapAnimationInterval;
    }

    /**
     * Initializes slap attack properties and plays sound
     */
    initializeSlap() {
        this.canSlap = false;
        this.currentImage = 0;
        this.isSlapping = true;
        this.originalWidth = this.width;
        AudioManager.play('slap');
        this.startSlapCooldownDisplay();
    }

    /**
     * Displays and manages the slap cooldown timer
     */
    startSlapCooldownDisplay() {
        let remainingCooldown = 3;
        this.updateCooldownDisplay(remainingCooldown);
        this.startCooldownTimer(remainingCooldown);
    }

    /**
     * Updates the cooldown display text
     * @private
     * @param {number} remainingTime - Remaining cooldown time in seconds
     */
    updateCooldownDisplay(remainingTime) {
        this.cooldownDisplay = remainingTime > 0 ? `${remainingTime}...` : 'SLAP!';
    }

    /**
     * Starts the cooldown timer interval
     * @private
     * @param {number} startTime - Initial cooldown time in seconds
     */
    startCooldownTimer(startTime) {
        let remainingCooldown = startTime;
        
        let cooldownInterval = setInterval(() => {
            remainingCooldown--;
            
            if (remainingCooldown > 0) {
                this.updateCooldownDisplay(remainingCooldown);
            } else {
                this.handleCooldownComplete(cooldownInterval);
            }
        }, 1000);
    }

    /**
     * Handles completion of the cooldown timer
     * @private
     * @param {number} intervalId - The interval to clear
     */
    handleCooldownComplete(intervalId) {
        this.updateCooldownDisplay(0);
        clearInterval(intervalId);
        
        setTimeout(() => {
            this.resetSlapCooldown();
        }, 1000);
    }

    /**
     * Resets the slap cooldown state
     * @private
     */
    resetSlapCooldown() {
        this.cooldownDisplay = '';
        this.canSlap = true;
    }
}