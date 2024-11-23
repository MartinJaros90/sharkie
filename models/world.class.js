class World {

    character = new Character();
    canvasWidth = 720;  
    canvasHeight = 480;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    endbossStatusBar = new EndbossStatusBar();
    cooldownDisplay = new CooldownDisplay();
    throwableObject = [];
    collectedPoisons = 0;
    coins = [];
    remainingPoisonBubbles = 0;
    gameIsRunning = false;
    level; 
    
    /**
     * Creates a new game world
     * @constructor
     * @param {HTMLCanvasElement} canvas - The game canvas element
     * @param {Object} keyboard - The keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character();
        this.level = new Level([], [], createBackground());
        this.setWorld();
        this.victoryScreen = null;  // Wichtig: Initialisierung hier
        this.endboss = new Endboss();
        this.endboss.world = this;  // Wichtig: Referenz setzen
        AudioManager.init();
        this.draw();
    }

    /**
     * Starts the game and initializes all game objects
     */
    startGame() {
        this.gameIsRunning = true;
        this.level = initLevel();
        this.coins = this.level.light.filter(obj => obj instanceof Coin);
        this.poisons = this.level.light.filter(obj => obj instanceof Posion);
        this.setWorld();
        this.run();
    }

    /**
     * Sets up references between world and game objects
     */
    setWorld() {
        this.character.world = this;
        this.cooldownDisplay.setWorld(this);
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
        this.character.initializeCharacter(); 
    }

    /**
     * Main game loop that checks for collisions and interactions
     */
    run() {
        if (!this.gameIsRunning) return;
        
        setInterval(() => {
            if (this.gameIsRunning) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkCharacterCoinCollision();
                this.checkCharacterPoisonCollision();
                this.checkSpaceThrow();
                this.checkBubbleEnemyCollision();
                this.level.enemies.forEach(enemy => {
                    if (enemy instanceof Endboss) {
                        enemy.checkBossIntro(this.character.x);
                    }
                });
            }
        }, 200);
    }

    /**
     * Handles throwing of poison bubbles
     */
    checkThrowObjects() {
        if (this.keyboard.P && this.collectedPoisons > 0) {
            let poisonBubble = new PoisonBubble(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(poisonBubble);
            this.collectedPoisons--;
            this.poisonBar.poisonThrown();
        }
    }  

    /**
     * Handles throwing of normal bubbles
     */
    checkSpaceThrow() {
        if (this.canThrowBubble()) {
            this.initiateBubbleThrow();
        }
    }

    /**
     * Checks if a bubble can be thrown
     * @private
     * @returns {boolean} True if bubble throw is possible
     */
    canThrowBubble() {
        return this.keyboard.SPACE && this.character.canThrow;
    }

    /**
     * Initiates the bubble throwing animation and creation
     * @private
     */
    initiateBubbleThrow() {
        this.character.canThrow = false;
        this.character.startThrowAnimation(() => {
            let bubblePosition = this.calculateBubblePosition();
            this.createAndThrowBubble(bubblePosition);
        });
    }

    /**
     * Calculates the starting position for the bubble
     * @private
     * @returns {Object} x and y coordinates for the bubble
     */
    calculateBubblePosition() {
        return {
            x: this.character.otherDirection ? 
                this.character.x : 
                this.character.x + this.character.width,
            y: this.character.y + this.character.height * 0.4
        };
    }

    /**
     * Creates and throws the appropriate bubble type
     * @private
     * @param {Object} position - The starting position for the bubble
     */
    createAndThrowBubble(position) {
        if (this.remainingPoisonBubbles > 0) {
            this.throwPoisonBubble(position);
        } else {
            this.throwNormalBubble(position);
        }
    }

    /**
     * Creates and throws a poison bubble
     * @private
     * @param {Object} position - The starting position for the bubble
     */
    throwPoisonBubble(position) {
        let bubble = new PoisonBubble(
            position.x, 
            position.y, 
            this.character.otherDirection
        );
        this.throwableObject.push(bubble);
        this.remainingPoisonBubbles--;
        this.poisonBar.poisonThrown();
    }

    /**
     * Creates and throws a normal bubble
     * @private
     * @param {Object} position - The starting position for the bubble
     */
    throwNormalBubble(position) {
        let bubble = new NormalBubble(
            position.x, 
            position.y, 
            this.character.otherDirection
        );
        this.throwableObject.push(bubble);
    }
 
    /**
     * Checks for collisions between character and enemies
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => { 
            if (this.shouldHandleCollision(enemy)) {
                this.handleCollision(enemy);
            }
            if (enemy instanceof Endboss && enemy.isDead()) {
                enemy.die();
            }
        });
    }

        /**
     * Determines if a collision should be handled
     * @param {MovableObject} enemy - The enemy to check
     * @returns {boolean} Whether the collision should be handled
     */
    shouldHandleCollision(enemy) {
        return this.character.isColliding(enemy) && 
            !this.character.isHurt() && 
            !this.character.isDead() &&
            (!enemy.isTrappedInBubble || enemy instanceof Endboss) && 
            !enemy.isDead();
    }

        /**
     * Handles collision with an enemy
     * @param {MovableObject} enemy - The enemy involved in the collision
     */
    handleCollision(enemy) {
        if (enemy instanceof Endboss) {
            this.handleEndbossCollision();
        } else {
            this.handleNormalEnemyCollision(enemy);
        }
    }

    
    /**
     * Handles collision with the endboss
     */
    handleEndbossCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        AudioManager.play('hurt');
    }

       /**
     * Handles collision with normal enemies
     * @param {MovableObject} enemy - The enemy involved in the collision
     */
    handleNormalEnemyCollision(enemy) {
        if (this.character.checkElectroShock(enemy)) {
            this.handleElectroShock();
        } else {
            AudioManager.play('hurt');
        }
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

        /**
     * Handles electro shock effect on character
     */
    handleElectroShock() {
        this.character.isElectrocuted = true;
        this.playElectroShockSound();
        
        setTimeout(() => {
            this.character.isElectrocuted = false;
        }, 1000);
    }

        /**
     * Plays electro shock sound effect
     */
    playElectroShockSound() {
        AudioManager.play('shock');
        
        let shockSoundInterval = setInterval(() => {
            if (this.character.isElectrocuted) {
                AudioManager.play('shock');
            } else {
                clearInterval(shockSoundInterval);
            }
        }, 200);
    }

       /**
     * Checks for collisions between character and coins
     */
    checkCharacterCoinCollision() {
        this.coins.forEach((coin) => {  
            if (!coin.isCollected && this.character.isColliding(coin)) {
                coin.collect();  
                this.coinBar.coinCollected();  
                coin.isCollected = true;
                AudioManager.play('coin'); 
            }
        });
    }

        /**
     * Checks for collisions between character and poison bottles
     */
    checkCharacterPoisonCollision() {
        this.poisons.forEach((poison) => {
            if (!poison.isCollected && this.character.isColliding(poison)) {
                poison.collect();
                this.poisonBar.poisonCollected();
                
                this.collectedPoisons++;
                this.remainingPoisonBubbles++;
                
                poison.isCollected = true;
                AudioManager.play('poison'); 
            }
        });
    }
        
    /**
     * Checks for collisions between bubbles and enemies
     */
    checkBubbleEnemyCollision() {
        this.throwableObject.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.hasSimpleCollisionWith(enemy)) {
                    if (bubble instanceof PoisonBubble) { 
                        this.throwableObject.splice(bubbleIndex, 1);
                        
                        if (enemy instanceof Endboss) {
                            enemy.hit();
                        } else {
                            this.startKnockbackAnimation(enemy);
                        }
                    } else if (bubble instanceof NormalBubble && !(enemy instanceof Endboss)) {
                        if (!bubble.enemyCaptured && !enemy.isTrappedInBubble) {
                            bubble.captureEnemy(enemy);
                        }
                    }
                }
            });
        });
    }

    /**
     * Starts knockback animation for hit enemies
     * @param {MovableObject} enemy - The enemy to knock back
     */
    startKnockbackAnimation(enemy) {
        enemy.isKnockedBack = true;
        let knockbackSpeedX = 15;  
        let knockbackSpeedY = -15; 
        let gravity = 0.5;
        let rotation = 0;
        
        let knockbackInterval = setInterval(() => {
            enemy.x += knockbackSpeedX;
            enemy.y += knockbackSpeedY;
            knockbackSpeedY += gravity; 
            rotation += 8; 
            enemy.rotation = rotation;
            
            if (enemy.x > this.level.level_end_x || enemy.y > this.canvas.height + 100) {
                clearInterval(knockbackInterval);
                this.level.enemies = this.level.enemies.filter(e => e !== enemy);
            }
        }, 1000 / 60);
    }

    /**
     * Draws all game objects on the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        if (this.gameIsRunning) { 

            this.addToMap(this.statusBar);
            this.addToMap(this.coinBar);
            this.addToMap(this.poisonBar);
            if (this.endbossStatusBar.visible) {
                this.addToMap(this.endbossStatusBar);
            }
            this.cooldownDisplay.draw(this.ctx);
            
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.light);
            this.addObjectsToMap(this.throwableObject);
            this.ctx.translate(-this.camera_x, 0);
        }

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds multiple objects to the game map
     * @param {Array<MovableObject>} objects - Array of objects to add
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            if (obj instanceof Endboss) {
              
            }
            this.addToMap(obj);
        });
    }

    /**
     * Adds a single object to the game map
     * @param {MovableObject} mo - The object to add
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
    
        mo.draw(this.ctx);
    
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

        /**
     * Flips an image horizontally
     * @param {MovableObject} mo - The object to flip
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original image orientation
     * @param {MovableObject} mo - The object to restore
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    
}