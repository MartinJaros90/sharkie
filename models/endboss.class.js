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
    speed = 3; 
    introduceFinished = false;
    hadFirstContact = false;
    visible = false;
    energy = 100;
    maxHits = 5;

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

    draw(ctx) {
        if (this.visible) { 
            super.draw(ctx);
        }
    }

    animate() {
        let i = 0;
        setInterval(() => {
            // Boss-Intro Check
            if (this.world?.character?.x > 2000 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                this.visible = true;
                AudioManager.stopBackgroundMusic();
                AudioManager.play('boss');
                this.world.endbossStatusBar.visible = true;
            }
            
            // Animations-Logik
            if (this.isDead()) {
                if (!this.isDying) {
                    if (this.currentDeadImage < this.IMAGES_DEAD.length - 1) {
                        this.playAnimation(this.IMAGES_DEAD);
                        this.currentDeadImage++;
                    } else {
                        this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
                        this.isDying = true;
                        this.startDeadFloating();
                    }
                }
            } else if (this.hadFirstContact && !this.introduceFinished) {
                // Intro-Animation
                this.playAnimation(this.IMAGES_INTRODUCE);
                if (i >= 9) { 
                    this.introduceFinished = true;
                    this.startMoving();
                }
                i++;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.movementPause) {
                this.img = this.imageCache[this.IMAGES_SWIMM[0]];
            } else {
                this.playAnimation(this.IMAGES_SWIMM);
            }
            if (!this.isDead() && !this.isHurt() && this.introduceFinished && !this.movementPause) {
                this.moveVertically();
            }
    
        }, 150); 
    }

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

    moveHorizontally() {
        if (this.world?.character) {
            if (this.x > this.world.character.x) {
                this.x -= this.speed;
            }
        }
    }

    moveVertically() {
        this.y += this.verticalSpeed * this.verticalDirection;
        
        const minY = 50; 
        const maxY = 180; 
        
        if (this.y < minY) {
            this.y = minY;
            this.verticalDirection = 1;
        } else if (this.y > maxY) {
            this.y = maxY;
            this.verticalDirection = -1;
        }
    }

    randomlyPause() {
        if (!this.movementPause && Math.random() < 0.01) {
            this.movementPause = true;
            
            setTimeout(() => {
                this.movementPause = false;
            }, this.pauseDuration);
        }
    }

    checkDirectionChange() {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastDirectionChange > this.directionChangeInterval) {
            if (Math.random() > 0.3) {
                this.verticalDirection *= -1;
            }
            this.lastDirectionChange = currentTime;
        }
    }

    startAttackInterval() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.movementPause) {
                const distanceToPlayer = Math.abs(this.x - this.world?.character?.x);
                
                if (distanceToPlayer < 300 && Math.random() < 0.3) {
                    this.startComboAttack();
                } else {
                    this.attack();
                }
            }
        }, this.attackCooldown);
    }

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

    attack() {
        if (this.movementPause || this.isAttacking) return;
        
        this.isAttacking = true;
        
        const attackDuration = this.comboAttackActive ? 600 : 1000;
        
        setTimeout(() => {
            this.isAttacking = false;
        }, attackDuration);
    }

    startDeadFloating() {
        let time = 0;
        this.deadFloatingInterval = setInterval(() => {
            this.y = this.initialY + Math.sin(time) * this.floatingOffset;
            time += this.floatingSpeed / 60; 
        }, 1000 / 60);  
    }

    hit() {
        this.hitCount++;
        this.energy -= 20;  
        
        if (this.energy < 0) {
            this.energy = 0;
        }
        
        this.world.endbossStatusBar.setPercentage(this.energy);
        this.lastHit = new Date().getTime();
    }

    isDead() {
        return this.hitCount >= this.maxHits; 
    }

}