class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    acceleration = 2.5;
    isHurtPlaying = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable Object should always fall
            return true;
        } else {
            return this.y < 180;
        }
        
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isColliding(mo) {
        if (mo instanceof Endboss) {
            // Große Offsets für den Endboss
            let bossOffsetX = 100;  // Von 160 auf 100 reduziert
            let bossOffsetY = 100;  // Von 600 auf 100 reduziert
            let bossOffsetTop = 100; // Von 500 auf 100 reduziert
            
            // Offsets für das kollidierende Objekt (z.B. Bubble)
            let myOffsetX = 40;
            let myOffsetY = 20;
            let myOffsetTop = 140;
    
            // Reduzierte Größen
            let myReducedWidth = this.width - 2 * myOffsetX;
            let myReducedHeight = this.height - myOffsetY - myOffsetTop;
            let bossReducedWidth = mo.width - 2 * bossOffsetX;  // Reduziert die 480px Breite
            let bossReducedHeight = mo.height - bossOffsetY - bossOffsetTop; // Reduziert die 400px Höhe
    
            return (this.x + myOffsetX + myReducedWidth > mo.x + bossOffsetX &&
                    this.y + myOffsetTop + myReducedHeight > mo.y + bossOffsetTop &&
                    this.x + myOffsetX < mo.x + bossOffsetX + bossReducedWidth &&
                    this.y + myOffsetTop < mo.y + bossOffsetTop + bossReducedHeight);
        } else {
            // Bestehende Kollisionserkennung für andere Objekte
            let offsetX = 40;
            let offsetY = 40;
            let offsetTop = 120;
    
            let reducedWidth = this.width - 2 * offsetX;
            let reducedHeight = this.height - offsetY - offsetTop;
    
            return (this.x + offsetX + reducedWidth > mo.x &&
                    this.y + offsetTop + reducedHeight > mo.y &&
                    this.x + offsetX < mo.x + mo.width &&
                    this.y + offsetTop < mo.y + mo.height);
        }
    }


    hit() {
        this.energy -= 20; // Änderung von 5 auf 20 für 5 Treffer (100/5 = 20)
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hasSimpleCollisionWith(otherObject) {
        if (otherObject instanceof Endboss) {
            // Spezielle Kollisionserkennung für Endboss
            let bossOffsetX = 100;
            let bossOffsetY = 100;
            let bossOffsetTop = 100;
    
            // Reduzierte Größen für den Boss
            let bossReducedWidth = otherObject.width - 2 * bossOffsetX;
            let bossReducedHeight = otherObject.height - bossOffsetY - bossOffsetTop;
    
            return (
                this.x + this.width > otherObject.x + bossOffsetX &&
                this.x < otherObject.x + bossOffsetX + bossReducedWidth &&
                this.y + this.height > otherObject.y + bossOffsetTop &&
                this.y < otherObject.y + bossOffsetTop + bossReducedHeight
            );
        } else {
            // Normale Kollisionserkennung für andere Objekte
            return (
                this.x + this.width > otherObject.x &&
                this.x < otherObject.x + otherObject.width &&
                this.y + this.height > otherObject.y &&
                this.y < otherObject.y + otherObject.height
            );
        }
    }


    


playHurtAnimation() {
    if (this.isHurtPlaying) return;
    this.isHurtPlaying = true;

    clearInterval(this.idleInterval);
    clearInterval(this.longIdleInterval);
    clearTimeout(this.longIdleTimeout);
    
    let i = 0;
    let hurtInterval = setInterval(() => {
        if (i < this.IMAGES_HURT.length) {
            this.img = this.imageCache[this.IMAGES_HURT[i]];
            i++;
        } else {
            clearInterval(hurtInterval);
            this.isHurtPlaying = false;
            if (this.startIdleAnimation) {
                this.startIdleAnimation();
            }
        }
    }, 150);
} 

isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1; // Kürzere Verletzungszeit
}

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
       this.x += this.speed;
    }

    moveLeft() {
       this.x -= this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }
}