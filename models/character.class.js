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
    bubbleCooldown = 800; 
    canSlap = true;
    canThrow = true;
    animateInterval;
    isDying = false;
    deathAnimationComplete = false;

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
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
        if (!this.canThrow) return; 
        
        this.canThrow = false; 
        this.currentImage = 0; 
    
        this.throwAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
    
            if (this.currentImage === 4) {
                if (callback) callback(this.otherDirection); 
            }
    
            if (this.currentImage >= this.IMAGES_THROW.length) {
                clearInterval(this.throwAnimationInterval);
                this.throwAnimationInterval = null;
                
                setTimeout(() => {
                    this.canThrow = true;
                }, this.bubbleCooldown);
            }
        }, 1000 / 25);
    }

    playLongIdleAnimation() {
        clearInterval(this.idleInterval);
        clearInterval(this.longIdleInterval);

        this.longIdleInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }, 500);
    }

    initializeCharacter() {
        if (this.world) {
            this.animate();
        }
    }

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
        let frameCount = this.IMAGES_DEAD.length;
        let startTime = Date.now();
        let animationDuration = 2000; 
        
        let deathInterval = setInterval(() => {
        let currentTime = Date.now();
        let elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / animationDuration, 1);
            
            currentFrame = Math.min(Math.floor(progress * frameCount), frameCount - 1);
            this.img = this.imageCache[this.IMAGES_DEAD[currentFrame]];
            if (progress >= 1) {
                clearInterval(deathInterval);
                this.deathAnimationComplete = true;
                
                setTimeout(() => {
                    this.showGameOverScreen();
                }, 2000);
            }
        }, 1000 / 30); 
    }
    
    showGameOverScreen() {
        this.world.gameIsRunning = false;
        this.setupGameOver();
    }
    
    setupGameOver() {
        let gameOverImage = new Image();
        gameOverImage.src = 'img/6.Botones/Tittles/Game Over/Recurso 12.png';
        let isHovered = false;

        this.gameOverHandlers = this.createEventHandlers(gameOverImage, isHovered);
        this.addEventListeners(this.gameOverHandlers);
        
        if (gameOverImage.complete) {
            this.renderGameOver(gameOverImage, isHovered);
        } else {
            gameOverImage.onload = () => this.renderGameOver(gameOverImage, isHovered);
        }
    }
    
    createEventHandlers(gameOverImage, isHovered) {
        let handleClick = (event) => {
            if (this.isButtonClicked(event, gameOverImage)) {
                this.restartGame();
            }
        };
    
        let handleMouseMove = (event) => {
            let newIsHovered = this.isButtonHovered(event, gameOverImage);
            if (newIsHovered !== isHovered) {
                isHovered = newIsHovered;
                this.world.canvas.style.cursor = isHovered ? 'pointer' : 'default';
            }
        };
    
        let handleKeydown = (e) => {
            if (e.key === 'Enter') this.restartGame();
        };
    
        return { handleClick, handleMouseMove, handleKeydown };
    }
    
    addEventListeners({ handleClick, handleMouseMove, handleKeydown }) {
        this.world.canvas.addEventListener('mousemove', handleMouseMove);
        this.world.canvas.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydown);
    }
    
    restartGame() {
        let { handleClick, handleMouseMove, handleKeydown } = this.gameOverHandlers;
        this.world.canvas.removeEventListener('mousemove', handleMouseMove);
        this.world.canvas.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeydown);
        location.reload();
    }
    
    isButtonClicked(event, gameOverImage) {
        let { x, y } = this.getMousePosition(event);
        let buttonDimensions = this.getButtonDimensions(gameOverImage);
        return this.isPointInButton(x, y, buttonDimensions);
    }
    
    isButtonHovered(event, gameOverImage) {
        let { x, y } = this.getMousePosition(event);
        let buttonDimensions = this.getButtonDimensions(gameOverImage);
        return this.isPointInButton(x, y, buttonDimensions);
    }
    
    getMousePosition(event) {
        let rect = this.world.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    
    getButtonDimensions(gameOverImage) {
        let buttonWidth = 200;
        let buttonHeight = 50;
        let buttonX = (this.world.canvas.width - buttonWidth) / 2;
        let buttonY = (this.world.canvas.height / 2) + 
                       (this.world.canvas.width * 0.6 * gameOverImage.height / gameOverImage.width) / 2 + 20;
        return { buttonX, buttonY, buttonWidth, buttonHeight };
    }
    
    isPointInButton(x, y, { buttonX, buttonY, buttonWidth, buttonHeight }) {
        return x >= buttonX && x <= buttonX + buttonWidth &&
               y >= buttonY && y <= buttonY + buttonHeight;
    }
    
    renderGameOver(gameOverImage, isHovered) {
        let ctx = this.world.ctx;
        let canvas = this.world.canvas;
        
        this.drawBackground(ctx, canvas);
        
        if (gameOverImage.complete) {
            this.drawGameOverImage(ctx, canvas, gameOverImage);
            this.drawButton(ctx, canvas, gameOverImage, isHovered);
        }
        
        if (!this.world.gameIsRunning) {
            requestAnimationFrame(() => this.renderGameOver(gameOverImage, isHovered));
        }
    }
    
    drawBackground(ctx, canvas) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    drawGameOverImage(ctx, canvas, gameOverImage) {
        let imgWidth = canvas.width * 0.6;
        let imgHeight = (imgWidth * gameOverImage.height) / gameOverImage.width;
        let x = (canvas.width - imgWidth) / 2;
        let y = (canvas.height - imgHeight) / 2;
        ctx.drawImage(gameOverImage, x, y, imgWidth, imgHeight);
    }
    
    drawButton(ctx, canvas, gameOverImage, isHovered) {
        let dimensions = this.getButtonDimensions(gameOverImage);
        
        this.drawButtonBackground(ctx, dimensions, isHovered);
        this.drawButtonBorder(ctx, dimensions);
        this.drawButtonShadow(ctx, isHovered);
        this.drawButtonText(ctx, dimensions, isHovered);
        
        if (isHovered) {
            this.drawButtonHoverEffect(ctx, dimensions);
        }
        
        ctx.restore();
    }
    
    drawButtonBackground(ctx, { buttonX, buttonY, buttonWidth, buttonHeight }, isHovered) {
        ctx.beginPath();
        ctx.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 25);
        ctx.fillStyle = isHovered ? 'rgba(127, 255, 224, 1)' : 'rgba(127, 255, 224, 0.9)';
        ctx.fill();
    }
    
    drawButtonBorder(ctx, { buttonX, buttonY, buttonWidth, buttonHeight }) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    
    drawButtonShadow(ctx, isHovered) {
        if (isHovered) {
            ctx.shadowColor = 'rgba(127, 255, 224, 0.8)';
            ctx.shadowBlur = 25;
            ctx.shadowOffsetY = 6;
        } else {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 4;
        }
        ctx.shadowOffsetX = 0;
    }
    
    drawButtonText(ctx, { buttonX, buttonY, buttonHeight }, isHovered) {
        ctx.font = "22px 'luckiest-guy'";
        ctx.fillStyle = isHovered ? '#1a0f0a' : '#2c1810';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let textY = buttonY + buttonHeight / 2;
        ctx.fillText('TRY AGAIN', this.world.canvas.width / 2, isHovered ? textY - 3 : textY);
    }
    
    drawButtonHoverEffect(ctx, { buttonX, buttonY, buttonWidth, buttonHeight }) {
        let gradient = ctx.createLinearGradient(buttonX, buttonY, buttonX + buttonWidth, buttonY + buttonHeight);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    isDead() {
        return this.energy === 0;
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
            this.playIdleAnimation();
        }, 100);
    }

    startLongIdleTimer() {
        this.longIdleTimeout = setTimeout(() => {
            this.playLongIdleAnimation();
        }, 8000);
    }

    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
    }


isWithinExtendedRange(enemy, range) {
    return (
        this.x + this.width + range > enemy.x &&
        this.x - range < enemy.x + enemy.width &&
        this.y + this.height + range > enemy.y &&
        this.y - range < enemy.y + enemy.height
    );
}

    
    
    
slapAttack() {
    if (!this.canPerformSlap()) return;
    
    this.initializeSlap();
    this.startSlapAnimation();
}

canPerformSlap() {
    return this.canSlap && !this.slapAnimationInterval;
}

initializeSlap() {
    this.canSlap = false;
    this.currentImage = 0;
    this.isSlapping = true;
    this.originalWidth = this.width;
    AudioManager.play('slap');
    this.startSlapCooldownDisplay();
}

startSlapAnimation() {
    let slapHitRegistered = false;
    
    this.slapAnimationInterval = setInterval(() => {
        this.updateSlapWidth();
        this.updateSlapAnimation();
        this.checkSlapHit(slapHitRegistered);
        this.checkSlapAnimationEnd();
    }, 1000 / 15);
}

updateSlapWidth() {
    if (this.currentImage < this.IMAGES_SLAP.length / 2) {
        this.width = this.originalWidth * 1.15;
    } else {
        this.width = this.originalWidth;
    }
}

updateSlapAnimation() {
    if (this.currentImage % 2 === 0) {
        this.playAnimation(this.IMAGES_SLAP);
    }
}

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
    clearInterval(this.slapAnimationInterval);
    this.slapAnimationInterval = null;
    this.isSlapping = false;
    this.width = this.originalWidth;
}

startSlapCooldownDisplay() {
    let remainingCooldown = 3; 
    
    this.cooldownDisplay = `${remainingCooldown}...`;
    
    let cooldownInterval = setInterval(() => {
        remainingCooldown--;
        
        if (remainingCooldown > 0) {
            this.cooldownDisplay = `${remainingCooldown}...`;
        } else if (remainingCooldown === 0) {
            // Zeige SLAP!
            this.cooldownDisplay = 'SLAP!';
            
            setTimeout(() => {
                this.cooldownDisplay = '';
                this.canSlap = true;
            }, 1000);
            
            clearInterval(cooldownInterval);
        }
    }, 1000);
}

isWithinExtendedRange(enemy, range) {
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
