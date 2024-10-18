class Character extends MovableObject {
    x = 80;
    y = 120;
    height = 200;
    width = 240;
    IMAGES_SWIMM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMM);

        this.animate();
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMM.length;
            let path = this.IMAGES_SWIMM[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }


    jump() {
        
    }
}