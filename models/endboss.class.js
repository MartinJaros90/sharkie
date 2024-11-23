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
    animation;
    isHit = false;



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


    ];
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
        this.x = 2500;
        this.y = 30;
        this.height = 300;
        this.width = 380;
        this.speed = 2;
        this.energy = 100;
        this.otherDirection = false;
        
        this.loadImage(this.IMAGES_SWIMM[0]); 
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        
        this.animation = new EndbossAnimation(this);
        this.animate();
        this.startAttackInterval(); 
        this.verticalSpeed = 1;
        this.verticalDirection = 1;
        this.lastDirectionChange = Date.now();
        this.directionChangeInterval = 2000;
        this.pauseDuration = 1000;
        this.movementPause = false;
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
        setInterval(() => {
            if (this.isDead()) {
                return;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {          
                this.playAnimation(this.IMAGES_ATTACK); 
            } else if (this.introduceFinished) {
                this.playAnimation(this.IMAGES_SWIMM);
            }
        }, 200);
    }

    /**
     * Checks for first contact with the boss and initializes encounter
     * @private
     */
    checkFirstContact() {
        if (this.world?.character?.x > 2000 && !this.hadFirstContact) {
            this.hadFirstContact = true;
            this.visible = true;
            AudioManager.stopBackgroundMusic();
            AudioManager.play('boss');
            if (this.world.endbossStatusBar) {
                this.world.endbossStatusBar.visible = true;
            }
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
        if (this.world?.endbossStatusBar) {
            this.world.endbossStatusBar.visible = true;
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
            this.initializeFirstContact();
            this.animation.playIntroAnimation();
        }
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
            let distanceToPlayer = this.world.character.x - this.x;
            let direction = Math.sign(distanceToPlayer);
            
            if (Math.abs(distanceToPlayer) > 100) {
                this.x += this.speed * direction;
                this.otherDirection = direction > 0; // Korrigierte Logik
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
            if (this.world && this.world.character && 
                !this.isDead() && !this.isHurt() && 
                this.introduceFinished && !this.movementPause) {
                
                let distanceToPlayer = Math.abs(this.x - this.world.character.x);
                
                if (distanceToPlayer < 300) {
                    if (Math.random() < 0.3) { 
                        this.startComboAttack();
                    } else {
                        this.attack();
                    }
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
        if (this.isAttacking || this.movementPause) return;
        
        this.isAttacking = true;
        this.speed *= 1.5; 
        this.playAnimation(this.IMAGES_ATTACK);
        
        setTimeout(() => {
            this.isAttacking = false;
            this.speed /= 1.5;
        }, 1000);
    }

    isHurt() {
        let timeSinceHit = new Date().getTime() - this.lastHit;
        return timeSinceHit < 500; 
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
        
        this.lastHit = new Date().getTime();
        this.playAnimation(this.IMAGES_HURT);
        this.world.endbossStatusBar.setPercentage(this.energy);
    
        if (this.isDead()) {
            this.animation.startVictorySequence(); 
        }
    }

    /**
     * Handles the death sequence of the end boss
     * Plays death animation and shows victory screen after delay
     * Only executes if boss is not already dying and has valid animation and world references
     */
    die() {
        if (!this.isDying && this.animation && this.world) {
            this.isDying = true;
            this.animation.playDeadAnimation();
            setTimeout(() => {
                if (this.animation) {
                    this.animation.showVictoryScreen();
                }
            }, 1000);
        }
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