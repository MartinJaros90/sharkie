class Posion extends MovableObject {

    height = 80;
    width = 60;
    speed = 0;
    IMAGES_SWIMM = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);
        this.y = 380;
        this.x = 200 + Math.random() * 1800;
        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMM);
        }, 200);
    }
}