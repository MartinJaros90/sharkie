class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    acceleration = 2.5;
    isHurtPlaying = false;

    /**
     * Applies gravity effect to the object
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    /**
     * Checks if object is above ground level
     * @returns {boolean} True if object is above ground or is a ThrowableObject
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 180;
        }
        
    }

    /**
    * Plays animation sequence from provided image array
    * @param {string[]} images - Array of image paths
    */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Checks for collision with another movable object
     * @param {MovableObject} mo - The other movable object
     * @returns {boolean} True if objects are colliding
     */
    isColliding(mo) {
        if (mo.isTrappedInBubble) {
            return false;
        }
    
        if (mo instanceof Endboss) {
            let bossOffsetX = 100; 
            let bossOffsetY = 100;  
            let bossOffsetTop = 100; 
            
            let myOffsetX = 40;
            let myOffsetY = 20;
            let myOffsetTop = 140;
    
            let myReducedWidth = this.width - 2 * myOffsetX;
            let myReducedHeight = this.height - myOffsetY - myOffsetTop;
            let bossReducedWidth = mo.width - 2 * bossOffsetX;  
            let bossReducedHeight = mo.height - bossOffsetY - bossOffsetTop;
    
            return (this.x + myOffsetX + myReducedWidth > mo.x + bossOffsetX &&
                    this.y + myOffsetTop + myReducedHeight > mo.y + bossOffsetTop &&
                    this.x + myOffsetX < mo.x + bossOffsetX + bossReducedWidth &&
                    this.y + myOffsetTop < mo.y + bossOffsetTop + bossReducedHeight);
        } else {
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

    /**
     * Reduces object's energy when hit
     */
    hit() {
        this.energy -= 20; 
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Simplified collision check without complex offsets
     * @param {MovableObject} otherObject - The object to check collision with
     * @returns {boolean} True if objects are colliding
     */
    hasSimpleCollisionWith(otherObject) {
        if (otherObject instanceof Endboss) {
            let bossOffsetX = 100;
            let bossOffsetY = 100;
            let bossOffsetTop = 100;
    
            let bossReducedWidth = otherObject.width - 2 * bossOffsetX;
            let bossReducedHeight = otherObject.height - bossOffsetY - bossOffsetTop;
    
            return (
                this.x + this.width > otherObject.x + bossOffsetX &&
                this.x < otherObject.x + bossOffsetX + bossReducedWidth &&
                this.y + this.height > otherObject.y + bossOffsetTop &&
                this.y < otherObject.y + bossOffsetTop + bossReducedHeight
            );
        } else {

            return (
                this.x + this.width > otherObject.x &&
                this.x < otherObject.x + otherObject.width &&
                this.y + this.height > otherObject.y &&
                this.y < otherObject.y + otherObject.height
            );
        }
    }

/**
 * Plays hurt animation sequence
 */
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

/**
 * Checks if object is currently in hurt state
 * @returns {boolean} True if object was hit less than 1 second ago
 */
isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1; 
}

    /**
     * Checks if object is dead
     * @returns {boolean} True if energy is 0
     */
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