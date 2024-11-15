class Character extends MovableObject {
    x = 80;
    y = 120;
    height = 240;
    width = 280;
    speed = 5;
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
        this.animate();
    }

    startThrowAnimation(callback) {
        this.currentImage = 0; 

        this.throwAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);

            if (this.currentImage >= this.IMAGES_THROW.length) {
                clearInterval(this.throwAnimationInterval);
                this.throwAnimationInterval = null;
                
                if (callback) callback();
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

    animate() {
        setInterval(() => {

            if (this.isStunned) return;
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

            if (this.world.keyboard.D) {
                this.slapAttack();
            }

            if (isMoving) {
                clearInterval(this.idleInterval);
                clearInterval(this.longIdleInterval);
                clearTimeout(this.longIdleTimeout);
                this.idleInterval = null;
                this.longIdleInterval = null;
                this.longIdleTimeout = null;
            } else {
                if (!this.idleInterval) {
                    this.startIdleAnimation();
                }

                if (!this.longIdleTimeout) {
                    this.startLongIdleTimer();
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                // Prüfen, welche Art von Schaden
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
    if (this.slapAnimationInterval) return;

    this.currentImage = 0;
    this.isSlapping = true;
    let slapHitRegistered = false;
    let originalWidth = this.width;
    let originalX = this.x;

    AudioManager.play('slap');

    this.slapAnimationInterval = setInterval(() => {

        if (this.currentImage < this.IMAGES_SLAP.length / 2) {
            this.width = originalWidth * 1.15; // Leichte Streckung
        } else {

            this.width = originalWidth;
        }

        if (this.currentImage % 2 === 0) { 
            this.playAnimation(this.IMAGES_SLAP);
        }

        if (this.currentImage >= 3 && this.currentImage <= 6 && !slapHitRegistered) {
            this.world.level.enemies.forEach((enemy, index) => {
                if (this.isWithinExtendedRange(enemy, 20) && !slapHitRegistered) {
                    slapHitRegistered = true;
                    AudioManager.play('slap');

                    if (enemy instanceof Endboss) {
                        enemy.hit();
                    } else {
                        this.world.startKnockbackAnimation(enemy);
                    }
                }
            });
        }

        if (this.currentImage >= this.IMAGES_SLAP.length) {
            clearInterval(this.slapAnimationInterval);
            this.slapAnimationInterval = null;
            this.isSlapping = false;
            this.width = originalWidth;
        }
    }, 1000 / 15); 
}

isWithinExtendedRange(enemy, range) {
    let attackBox = {
        x: this.otherDirection ? this.x - range : this.x + this.width,
        y: this.y + this.height * 0.3, // Etwa auf Höhe der Flosse
        width: range,
        height: this.height * 0.4  // Höhe des Angriffsbereichs
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
        AudioManager.play('shock');  // Optional: Elektroschock-Sound

        // Elektroschock-Animation abspielen
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
