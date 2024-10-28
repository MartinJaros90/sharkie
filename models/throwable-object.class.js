class ThrowableObject extends MovableObject{

    constructor(x, y) {
        super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.trow(100, 150);
        
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10; 
        }, 25);
    }
}