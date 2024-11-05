class PoisonBubble extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.startX = x;
        this.maxDistance = 400;
        this.verticalSpeed = -2;
        this.horizontalSpeed = 10;
        this.swingAmplitude = 2;
        this.swingFrequency = 0.1;
        this.height = 60;
        this.width = 60;
        this.trow();
    }

    trow() {
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