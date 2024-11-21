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
        
        return mo instanceof Endboss ? 
            this.checkEndbossCollision(mo) : 
            this.checkNormalCollision(mo);
    }

    /**
     * Checks collision specifically with Endboss
     * @private
     * @param {Endboss} boss - The endboss object
     * @returns {boolean} True if colliding with boss
     */
    checkEndbossCollision(boss) {
        const offsets = this.getEndbossOffsets();
        const dimensions = this.calculateCollisionDimensions(offsets, boss);
        
        return this.checkCollisionBounds(dimensions);
    }

    /**
     * Gets offset values for Endboss collision
     * @private
     * @returns {Object} Object containing offset values
     */
    getEndbossOffsets() {
        return {
            bossOffsetX: 100,
            bossOffsetY: 100,
            bossOffsetTop: 100,
            myOffsetX: 40,
            myOffsetY: 20,
            myOffsetTop: 140
        };
    }

    /**
     * Calculates dimensions for collision detection
     * @private
     * @param {Object} offsets - Offset values
     * @param {Endboss} boss - The endboss object
     * @returns {Object} Calculated dimensions
     */
    calculateCollisionDimensions(offsets, boss) {
        const { bossOffsetX, bossOffsetY, bossOffsetTop, myOffsetX, myOffsetY, myOffsetTop } = offsets;
        
        return {
            myX: this.x + myOffsetX,
            myY: this.y + myOffsetTop,
            bossX: boss.x + bossOffsetX,
            bossY: boss.y + bossOffsetTop,
            myWidth: this.width - 2 * myOffsetX,
            myHeight: this.height - myOffsetY - myOffsetTop,
            bossWidth: boss.width - 2 * bossOffsetX,
            bossHeight: boss.height - bossOffsetY - bossOffsetTop
        };
    }

    /**
     * Checks collision with normal enemies
     * @private
     * @param {MovableObject} mo - The other movable object
     * @returns {boolean} True if colliding with enemy
     */
    checkNormalCollision(mo) {
        const offsets = this.getNormalOffsets();
        const dimensions = this.calculateNormalDimensions(offsets, mo);
        
        return this.checkCollisionBounds(dimensions);
    }

    /**
     * Gets offset values for normal collision
     * @private
     * @returns {Object} Object containing offset values
     */
    getNormalOffsets() {
        return {
            offsetX: 40,
            offsetY: 40,
            offsetTop: 120
        };
    }

    /**
     * Calculates dimensions for normal collision
     * @private
     * @param {Object} offsets - Offset values
     * @param {MovableObject} mo - The other movable object
     * @returns {Object} Calculated dimensions
     */
    calculateNormalDimensions(offsets, mo) {
        const { offsetX, offsetY, offsetTop } = offsets;
        
        return {
            myX: this.x + offsetX,
            myY: this.y + offsetTop,
            bossX: mo.x,
            bossY: mo.y,
            myWidth: this.width - 2 * offsetX,
            myHeight: this.height - offsetY - offsetTop,
            bossWidth: mo.width,
            bossHeight: mo.height
        };
    }

    /**
     * Checks if bounds are overlapping
     * @private
     * @param {Object} dim - Dimensions object
     * @returns {boolean} True if bounds overlap
     */
    checkCollisionBounds(dim) {
        return (
            dim.myX + dim.myWidth > dim.bossX &&
            dim.myY + dim.myHeight > dim.bossY &&
            dim.myX < dim.bossX + dim.bossWidth &&
            dim.myY < dim.bossY + dim.bossHeight
        );
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