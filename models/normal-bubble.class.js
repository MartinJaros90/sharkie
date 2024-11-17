class NormalBubble extends MovableObject {
    constructor(x, y, isMovingLeft) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.startX = x;
        this.maxDistance = 400;
        this.verticalSpeed = -2;
        this.horizontalSpeed = isMovingLeft ? -10 : 10;
        this.swingAmplitude = 2;
        this.swingFrequency = 0.1;
        this.height = 70;
        this.width = 70;
        this.enemyCaptured = null;
        this.throw();
    }

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

    captureEnemy(enemy) {
    if (!this.enemyCaptured) { 
        this.enemyCaptured = enemy;
        enemy.isTrappedInBubble = true;
        clearInterval(enemy.movementInterval);
    }
}
}