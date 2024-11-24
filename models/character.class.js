class Character extends MovableObject {
    x = 80;
    y = 120;
    height = 240;
    width = 280;
    speed = 2;
    IMAGES_SWIMM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/I1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/I3.png',
        'img/1.Sharkie/2.Long_IDLE/I4.png',
        'img/1.Sharkie/2.Long_IDLE/I5.png',
        'img/1.Sharkie/2.Long_IDLE/I6.png',
        'img/1.Sharkie/2.Long_IDLE/I7.png',
        'img/1.Sharkie/2.Long_IDLE/I8.png',
        'img/1.Sharkie/2.Long_IDLE/I9.png',
        'img/1.Sharkie/2.Long_IDLE/I10.png',
        'img/1.Sharkie/2.Long_IDLE/I11.png',
        'img/1.Sharkie/2.Long_IDLE/I12.png',
        'img/1.Sharkie/2.Long_IDLE/I13.png',
        'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];
    
    world;
    idleInterval = null;
    longIdleTimeout = null;
    animateInterval;

    /**
     * Initializes a new character instance
     * @constructor
     */
    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.animationManager = new CharacterAnimationManager(this);
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
    }

    /**
     * Initiates the long idle animation sequence
     */
    playLongIdleAnimation() {
        this.animationManager.playLongIdleAnimation();
    }

    /**
     * Initializes character animation if world is set
     */
    initializeCharacter() {
        if (this.world) {
            this.animate();
        }
    }

    /**
     * Main animation loop handling movement, attacks and idle animations
     */
    animate() {
        if (!this.world) return;
        this.startMovementLoop();
        this.startAnimationLoop();
    }

    /**
     * Handles character movement and controls
     * @private
     */
    startMovementLoop() {
        this.animateInterval = setInterval(() => {
            if (this.shouldSkipMovement()) return;
            
            AudioManager.pause('swimming');
            const isMoving = this.handleMovement();
            this.updateCameraPosition();
            this.handleAttacks();
            this.updateIdleState(isMoving);
        }, 1000 / 60);
    }

    /**
     * Checks if movement should be skipped
     * @private
     * @returns {boolean} True if movement should be skipped
     */
    shouldSkipMovement() {
        return !this.world?.keyboard || this.isStunned || this.isDead();
    }

    /**
     * Handles all movement directions
     * @private
     * @returns {boolean} True if character is moving
     */
    handleMovement() {
        let isMoving = this.checkAndApplyMovement();
        this.playMovementSound(isMoving); 
        return isMoving;
    }

    /**
     * Checks and applies movement in all directions
     * @private
     * @returns {boolean} True if character moved in any direction
     */
    checkAndApplyMovement() {
        let isMoving = false;
        
        isMoving = this.handleHorizontalMovement() || isMoving;
        isMoving = this.handleVerticalMovement() || isMoving;
        
        return isMoving;
    }

    /**
     * Handles horizontal (left/right) movement
     * @private
     * @returns {boolean} True if moving horizontally
     */
    handleHorizontalMovement() {
        let isMoving = false;

        if (this.canMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
            isMoving = true;
        }

        if (this.canMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
            isMoving = true;
        }

        return isMoving;
    }

    /**
     * Handles vertical (up/down) movement
     * @private
     * @returns {boolean} True if moving vertically
     */
    handleVerticalMovement() {
        let isMoving = false;
        if (this.world.keyboard.UP) {
            this.moveUp();
            isMoving = true;
        }
        if (this.world.keyboard.DOWN) {
            this.moveDown();
            isMoving = true;
        }
        return isMoving;
    }

    /**
     * Plays swimming sound if character is moving
     * @private
     * @param {boolean} isMoving - Whether the character is currently moving
     */
    playMovementSound(isMoving) {
        if (isMoving) {
            AudioManager.play('swimming');
        }
    }

    /**
     * Checks if character can move right
     * @private
     * @returns {boolean} True if movement right is possible
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if character can move left
     * @private
     * @returns {boolean} True if movement left is possible
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -670;
    }

    /**
     * Updates the camera position relative to character
     * @private
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 50;
    }

    /**
     * Updates idle animation state
     * @private
     * @param {boolean} isMoving - Whether the character is currently moving
     */
    updateIdleState(isMoving) {
        if (isMoving) {
            this.clearIdleAnimations();
        } else {
            this.handleIdleAnimations();
        }
    }

    /**
     * Handles character animation states
     * @private
     */
    startAnimationLoop() {
        this.characterAnimationInterval = setInterval(() => {
            if (!this.world?.keyboard) return;
            
            if (this.isDead()) {
                this.handleDeathAnimation();
            } else if (this.isHurt()) {
                this.handleHurtAnimation();
            } else if (this.shouldPlaySwimmAnimation()) {
                this.playAnimation(this.IMAGES_SWIMM);
            }
        }, 50);
    }

    /**
     * Checks if swim animation should play
     * @private
     * @returns {boolean} True if swim animation should play
     */
    shouldPlaySwimmAnimation() {
        return !this.isStunned && (
            this.world.keyboard.RIGHT || 
            this.world.keyboard.LEFT || 
            this.world.keyboard.UP || 
            this.world.keyboard.DOWN
        );
    }

    /**
     * Clears all active animations
     */
    clearAllAnimations() {
        this.animationManager.clearAllAnimations();
    }

    /**
     * Initiates the death animation sequence
     */
    playDeathAnimation() {
        this.animationManager.playDeathAnimation();
    }

    /**
     * Clears all idle-related animations
     */
    clearIdleAnimations() {
        this.animationManager.clearIdleAnimations();
    }
    
    /**
     * Manages idle animation states
     */
    handleIdleAnimations() {
        this.animationManager.handleIdleAnimations();
    }

    /**
     * Starts the basic idle animation
     */
    startIdleAnimation() {
        this.animationManager.startIdleAnimation();
    }

    /**
     * Initiates the long idle timer
     */
    startLongIdleTimer() {
        this.animationManager.startLongIdleTimer();
    }

    /**
     * Plays the basic idle animation
     */
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Starts the slap attack animation
     */
    startSlapAnimation() {
        this.animationManager.startSlapAnimation();
    }

    /**
     * Checks if the current animation frame is within the slap hit detection range
     * @returns {boolean} True if current frame is in hit detection range
     */
    isInSlapHitFrames() {
        return this.currentImage >= 3 && this.currentImage <= 6;
    }

    /**
     * Checks if an enemy can be hit by the slap attack
     * @param {Enemy} enemy - The enemy to check
     * @param {boolean} slapHitRegistered - Whether a hit has already been registered
     * @returns {boolean} True if enemy can be hit
     */
    canHitEnemy(enemy, slapHitRegistered) {
        return this.isWithinExtendedRange(enemy, 20) && !slapHitRegistered;
    }

    /**
     * Handles what happens when an enemy is hit
     * @param {Enemy} enemy - The enemy that was hit
     */
    handleEnemyHit(enemy) {
        AudioManager.play('slap');
        if (enemy instanceof Endboss) {
            enemy.hit();
        } else {
            this.world.startKnockbackAnimation(enemy);
        }
    }

    /**
     * Checks if the slap animation has completed and should end
     */
    checkSlapAnimationEnd() {
        if (this.currentImage >= this.IMAGES_SLAP.length) {
            this.endSlapAnimation();
        }
    }

    /**
     * Ends the current slap animation
     */
    endSlapAnimation() {
        this.animationManager.endSlapAnimation();
    }

    /**
     * Moves the character upward if within bounds
     */
    moveUp() {
        if (this.y > -120) { 
            this.y -= this.speed;
        }
    }

    /**
     * Moves the character downward if within bounds
     */
    moveDown() {
        if (this.y + this.height < 530) { 
            this.y += this.speed;
        }
    }
}
