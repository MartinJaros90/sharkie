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
    let offsetX = 40; 
    let offsetY = 40; 
    let offsetTop = 120; 

    let reducedWidth = this.width - 2 * offsetX; 
    let reducedHeight = this.height - offsetY - offsetTop; 

    let collides = (this.x + offsetX + reducedWidth > mo.x &&
                    this.y + offsetTop + reducedHeight > mo.y &&
                    this.x + offsetX < mo.x + mo.width &&
                    this.y + offsetTop < mo.y + mo.height);

    if (collides) {
        if (mo instanceof EnemyFish || mo instanceof EnemyPink || mo instanceof EnemyJelly || mo instanceof EnemyBubble || mo instanceof Endboss) {
        }
        return true;
    }
    return false;
}



    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


hasSimpleCollisionWith(otherObject) {
    return (
        this.x + this.width > otherObject.x &&
        this.x < otherObject.x + otherObject.width &&
        this.y + this.height > otherObject.y &&
        this.y < otherObject.y + otherObject.height
    );
}



playHurtAnimation() {
    this.isHurtPlaying = true; 

    let i = 0;
    let interval = setInterval(() => {
        this.img = this.imageCache[this.IMAGES_HURT[i]];
        i++;

        if (i >= this.IMAGES_HURT.length) {
            clearInterval(interval); 
            this.isHurtPlaying = false; 
        }
    }, 300);
}


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
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