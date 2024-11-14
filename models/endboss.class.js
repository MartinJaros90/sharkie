class Endboss extends MovableObject{
    x = 80;
    y = 30;
    height = 300;
    width = 380;
    hitCount = 0;
    isDying = false;
    currentDeadImage = 0;
    initialY = 30;  // Speichere die ursprüngliche Y-Position
    deadFloatingInterval = null;
    floatingOffset = 20;  // Wie weit der Boss hoch und runter schwimmt
    floatingSpeed = 1;  // Geschwindigkeit der Schwimmbewegung
    isAttacking = false;
    attackCooldown = 2000; // 2 Sekunden in Millisekunden
    lastAttack = 0;
    speed = 2; // Geschwindigkeit der Bewegung
    introduceFinished = false;
    hadFirstContact = false;
    visible = false;




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
            if (this.world?.character?.x > 2000 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
                this.visible = true; 
            }
            
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
                this.playAnimation(this.IMAGES_INTRODUCE);
                if (i >= 9) { 
                    this.introduceFinished = true;
                    this.startMoving();
                }
                i++;
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_SWIMM);
            }
        }, 150);
    }

    startMoving() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && this.introduceFinished && this.hadFirstContact) {
                if (this.world?.character) {
                    if (this.x > this.world.character.x) {
                        this.x -= this.speed;
                    }
                }
            }
        }, 1000 / 60);
    }

    startAttackInterval() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt()) {
                this.attack();
            }
        }, this.attackCooldown);
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 1000); 
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
        this.energy -= 33.33; 
        this.lastHit = new Date().getTime();
    }

    isDead() {
        return this.hitCount >= 3;
    }

}