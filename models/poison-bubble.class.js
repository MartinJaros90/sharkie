class PoisonBubble extends MovableObject {

    /**
     * Creates a new poison bubble with specified position and direction
     * @constructor
     * @param {number} x - Initial x coordinate
     * @param {number} y - Initial y coordinate
     * @param {boolean} isMovingLeft - Direction of bubble movement
     */
    constructor(x, y, isMovingLeft) { 
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.startX = x;
        this.maxDistance = 300;
        this.verticalSpeed = -2;
        this.horizontalSpeed = isMovingLeft ? -20 : 20; 
        this.swingAmplitude = 2;
        this.swingFrequency = 0.1;
        this.height = 60;
        this.width = 60;
        this.throw(); 
    }

    /**
     * Initiates bubble movement with swinging motion
     * Moves horizontally until max distance, then floats upward with swing
     */
    throw() {
        let time = 0;
        this.movementInterval = setInterval(() => {
            if (Math.abs(this.x - this.startX) < this.maxDistance) {
                this.x += this.horizontalSpeed;
            } else {
                this.y += this.verticalSpeed;
                this.x += Math.sin(time) * this.swingAmplitude;
                time += this.swingFrequency;
            }
        }, 25);
    }
}