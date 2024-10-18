class EnemyFish extends MovableObject {

    height = 80;
    width = 80;
    ENEMY_IMAGES_SWIMM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
       'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.ENEMY_IMAGES_SWIMM);

        this.animate();

        this.x = 200 + Math.random() * 500;
        this.y = Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.ENEMY_IMAGES_SWIMM.length;
            let path = this.ENEMY_IMAGES_SWIMM[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }
}