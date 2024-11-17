class EnemyYellow extends MovableObject {

    height = 80;
    width = 80;
    IMAGES_SWIMM = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];
    IMAGES_HIT = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_HIT);


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

    playHitAnimation(callback) {
        this.currentImage = 0;
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HIT);

            if (this.currentImage >= this.IMAGES_HIT.length) {
                clearInterval(interval);
                if (callback) callback(); // Gegner entfernen
            }
        }, 1000 / 30);
    }
}