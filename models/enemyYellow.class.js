class EnemyYellow extends MovableObject {

    height = 140;
    width = 140;
    IMAGES_SWIMM = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);

        this.animate();

        this.x = 1700 + Math.random() * 500;
        this.y = Math.random() * 360;
        this.speed = 0.15 + Math.random() * 0.2;
    }


    animate() {
          setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMM);
        }, 200);
    }
}