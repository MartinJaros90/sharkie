class Coin extends MovableObject {

    height = 45;
    width = 45;
    speed = 0;
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
            this.playAnimation(this.IMAGES_SWIMM);
        }, 200);
    }
}

