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
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character = new Character();
        this.level = new Level([], [], createBackground());
        this.setWorld();
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

checkThrowObjects() {
    if (this.keyboard.P && this.collectedPoisons > 0) {
        let poisonBubble = new PoisonBubble(this.character.x + 100, this.character.y + 100);
        this.throwableObject.push(poisonBubble);
        this.collectedPoisons--;
        this.poisonBar.poisonThrown();
    }
}  

checkSpaceThrow() {
    if (this.keyboard.SPACE && this.character.canThrow) {
        this.character.startThrowAnimation(() => {
            let bubble;
            let isMovingLeft = this.character.otherDirection;  
            
            if (this.remainingPoisonBubbles > 0) {
                bubble = new PoisonBubble(this.character.x + 100, this.character.y + 100, isMovingLeft);
                this.remainingPoisonBubbles--;
                this.poisonBar.poisonThrown();
                AudioManager.play('bubble');  
            } else {
                bubble = new NormalBubble(this.character.x + 100, this.character.y + 100, isMovingLeft);
                AudioManager.play('bubble'); 
            }

            this.throwableObject.push(bubble);
        });
    }
}
 
/**
 * Checks for collisions between character and enemies
 */
checkCollisions() {
    this.level.enemies.forEach((enemy) => { 
        if (this.shouldHandleCollision(enemy)) {
            this.handleCollision(enemy);
        }
    });
}

shouldHandleCollision(enemy) {
    return this.character.isColliding(enemy) && 
           !this.character.isHurt() && 
           !this.character.isDead() &&
           (!enemy.isTrappedInBubble || enemy instanceof Endboss) && 
           !enemy.isDead();
}

handleCollision(enemy) {
    if (enemy instanceof Endboss) {
        this.handleEndbossCollision();
    } else {
        this.handleNormalEnemyCollision(enemy);
    }
}

handleEndbossCollision() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    AudioManager.play('hurt');
}

handleNormalEnemyCollision(enemy) {
    if (this.character.checkElectroShock(enemy)) {
        this.handleElectroShock();
    } else {
        AudioManager.play('hurt');
    }
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
}

handleElectroShock() {
    this.character.isElectrocuted = true;
    this.playElectroShockSound();
    
    setTimeout(() => {
        this.character.isElectrocuted = false;
    }, 1000);
}

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

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    
}