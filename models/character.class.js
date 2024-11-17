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
        'img/1.Sharkie/2.Long_IDLE/i1.png',
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
    world;
    idleInterval = null;
    longIdleTimeout = null;
    isElectrocuted = false;
    slapCooldown = 3; 
    cooldownDisplay = '';
    canSlap = true;
    canThrow = true;
    animateInterval;
    isDying = false;
    deathAnimationComplete = false;
    bubbleCooldown = 1000;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.animationManager = new CharacterAnimationManager(this);
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SLAP);
        this.loadImages(this.IMAGES_ELECTROSHOCK);
    }
    
    startThrowAnimation(callback) {
        this.animationManager.startThrowAnimation(callback);
    }

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
    
        this.animateInterval = setInterval(() => {
            if (!this.world?.keyboard || this.isStunned) return;  
            
            if (this.isDead()) return;
            
            AudioManager.pause('swimming');
            let isMoving = false;
    
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                AudioManager.play('swimming');
                isMoving = true;
            }
    
            if (this.world.keyboard.LEFT && this.x > -670) {
                this.moveLeft();
                this.otherDirection = true;
                AudioManager.play('swimming');
                isMoving = true;
            }
    
            this.world.camera_x = -this.x + 50;
    
            if (this.world.keyboard.UP) {
                this.moveUp();
                AudioManager.play('swimming');
                isMoving = true;
            }
    
            if (this.world.keyboard.DOWN) {
                this.moveDown();
                AudioManager.play('swimming');
                isMoving = true;
            }
    
            if (this.world.keyboard.D && !this.isStunned) {
                this.slapAttack();
            }
    
            if (isMoving) {
                this.clearIdleAnimations();
            } else {
                this.handleIdleAnimations();
            }
        }, 1000 / 60);
    
        this.characterAnimationInterval = setInterval(() => {
            if (!this.world?.keyboard) return; 
    
            if (this.isDead()) {
                if (!this.isDying && !this.deathAnimationComplete) {
                    this.isDying = true;
                    this.clearAllAnimations(); 
                    this.playDeathAnimation();
                }
            } else if (this.isHurt()) {
                if (this.isElectrocuted) {
                    this.playAnimation(this.IMAGES_ELECTROSHOCK);
                } else {
                    this.playAnimation(this.IMAGES_HURT);
                }
            } else if (!this.isStunned) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || 
                    this.world.keyboard.UP || this.world.keyboard.DOWN) {
                    this.playAnimation(this.IMAGES_SWIMM);
                }
            }
        }, 50);
    }

    clearAllAnimations() {
        this.animationManager.clearAllAnimations();
    }

    playDeathAnimation() {
        this.animationManager.playDeathAnimation();
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
    
    isDead() {
        return this.energy === 0;
    }


    clearIdleAnimations() {
        this.animationManager.clearIdleAnimations();
    }
    
    handleIdleAnimations() {
        this.animationManager.handleIdleAnimations();
    }

    startIdleAnimation() {
        this.animationManager.startIdleAnimation();
    }

    startLongIdleTimer() {
        this.animationManager.startLongIdleTimer();
    }

    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
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

startSlapAnimation() {
    this.animationManager.startSlapAnimation();
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

updateSlapAnimation() {
    this.animationManager.updateSlapAnimation();
}

/**
 * Checks for collision with enemies during slap attack
 * @param {boolean} slapHitRegistered - Whether a hit has already been registered
 */
checkSlapHit(slapHitRegistered) {
    if (this.isInSlapHitFrames() && !slapHitRegistered) {
        this.world.level.enemies.forEach(enemy => {
            if (this.canHitEnemy(enemy, slapHitRegistered)) {
                slapHitRegistered = true;
                this.handleEnemyHit(enemy);
            }
        });
    }
}

isInSlapHitFrames() {
    return this.currentImage >= 3 && this.currentImage <= 6;
}

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

checkSlapAnimationEnd() {
    if (this.currentImage >= this.IMAGES_SLAP.length) {
        this.endSlapAnimation();
    }
}

endSlapAnimation() {
    this.animationManager.endSlapAnimation();
}

startSlapCooldownDisplay() {
    let remainingCooldown = 3; 
    
    this.cooldownDisplay = `${remainingCooldown}...`;
    
    let cooldownInterval = setInterval(() => {
        remainingCooldown--;
        
        if (remainingCooldown > 0) {
            this.cooldownDisplay = `${remainingCooldown}...`;
        } else if (remainingCooldown === 0) {
            this.cooldownDisplay = 'SLAP!';
            
            setTimeout(() => {
                this.cooldownDisplay = '';
                this.canSlap = true;
            }, 1000);
            
            clearInterval(cooldownInterval);
        }
    }, 1000);
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

moveUp() {
    if (this.y > -120) { 
        this.y -= this.speed;
    }
}

moveDown() {
    if (this.y + this.height < 530) { 
        this.y += this.speed;
    }
}
}
