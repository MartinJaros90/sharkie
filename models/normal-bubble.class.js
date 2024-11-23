class NormalBubble extends MovableObject {

    /**
     * Creates a new bubble with specified position and direction
     * @constructor
     * @param {number} x - Initial x coordinate
     * @param {number} y - Initial y coordinate
     * @param {boolean} isMovingLeft - Direction of bubble movement
     */
    constructor(x, y, isMovingLeft) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.startX = x;
        this.maxDistance = 250;
        this.verticalSpeed = -2;
        this.horizontalSpeed = isMovingLeft ? -10 : 10;
        this.swingAmplitude = 2;
        this.swingFrequency = 0.1;
        this.height = 70;
        this.width = 70;
        this.enemyCaptured = null;
        this.throw();
    }

    /**
     * Initiates bubble movement with swinging motion
     * Handles different movement patterns for empty and enemy-containing bubbles
     */
    throw() {
        let time = 0;
        this.movementInterval = setInterval(() => {
            if (this.enemyCaptured) {
                this.y += this.verticalSpeed; 
                this.x += Math.sin(time) * this.swingAmplitude;  
                this.enemyCaptured.x = this.x; 
                this.enemyCaptured.y = this.y;
            } else {
           
                if (Math.abs(this.x - this.startX) < this.maxDistance) {
                    this.x += this.horizontalSpeed;
                } else {
                    this.y += this.verticalSpeed;
                    this.x += Math.sin(time) * this.swingAmplitude;
                }
            }
            time += this.swingFrequency;
        }, 25);
    }

    /**
     * Captures an enemy in the bubble
     * @param {MovableObject} enemy - The enemy to capture
     */
    captureEnemy(enemy) {
    if (!this.enemyCaptured) { 
        this.enemyCaptured = enemy;
        enemy.isTrappedInBubble = true;
        clearInterval(enemy.movementInterval);
    }
}
}