class Coin extends MovableObject {
    height = 45;
    width = 45;
    speed = 0;
    isCollected = false;
    IMAGES_SWIMM = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);
        this.animate();

        this.x = 200 + Math.random() * 2000;
        this.y = Math.random() * 360;
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            if (!this.isCollected) {
                this.playAnimation(this.IMAGES_SWIMM);
            }
        }, 200);
    }

    collect() {
        this.isCollected = true; 
        let flyUpInterval = setInterval(() => {
            this.y -= 5; 
            if (this.y < -100) {  
                clearInterval(flyUpInterval); 
            }
        }, 1000 / 60); 
    }
}
