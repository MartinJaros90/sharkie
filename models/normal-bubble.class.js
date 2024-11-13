// class NormalBubble extends MovableObject {
//     constructor(x, y) {
//         super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
//         this.x = x;
//         this.y = y;
//         this.startX = x;
//         this.maxDistance = 400;
//         this.verticalSpeed = -2;
//         this.horizontalSpeed = 10;
//         this.swingAmplitude = 2;
//         this.swingFrequency = 0.1;
//         this.height = 60;
//         this.width = 60;
//         this.trow();
//     }

//     trow() {
//         let time = 0;
//         this.movementInterval = setInterval(() => {
//             if (Math.abs(this.x - this.startX) < this.maxDistance) {
//                 this.x += this.horizontalSpeed;
//             } else {
//                 this.y += this.verticalSpeed;
//                 this.x += Math.sin(time) * this.swingAmplitude;
//                 time += this.swingFrequency;
//             }
//         }, 25);
//     }

// }


class NormalBubble extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.startX = x;
        this.maxDistance = 400;
        this.verticalSpeed = -2;
        this.horizontalSpeed = 10;
        this.swingAmplitude = 2;
        this.swingFrequency = 0.1;
        this.height = 70;
        this.width = 70;
        this.enemyCaptured = null; // Referenz auf den gefangenen Gegner
        this.throw();
    }

    throw() {
        let time = 0;
        this.movementInterval = setInterval(() => {
            if (this.enemyCaptured) {
                // Bewege die Blase und den Gegner gemeinsam nach oben
                this.y += this.verticalSpeed;  // Aufwärtsbewegung
                this.x += Math.sin(time) * this.swingAmplitude;  // Schwingbewegung
                this.enemyCaptured.x = this.x; // Halte den Gegner in der Blase
                this.enemyCaptured.y = this.y;
            } else {
                // Normale Bewegung ohne gefangenen Gegner
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
    if (!this.enemyCaptured) { // Zusätzliche Sicherheitsprüfung
        this.enemyCaptured = enemy;
        enemy.isTrappedInBubble = true;
        clearInterval(enemy.movementInterval);
    }
}
}