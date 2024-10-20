class Character extends MovableObject {
    x = 80;
    y = 120;
    height = 200;
    width = 240;
    speed = 5;
    IMAGES_SWIMM = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];
    world;
    swimming_sound = new Audio('audio/swimm.mp3');

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMM);

        this.animate();
    }


    animate() {

        setInterval(() => {
            this.swimming_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.swimming_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > -670) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.swimming_sound.play();
            }
            this.world.camera_x = -this.x +50;

            if (this.world.keyboard.UP) {
                this.y -= this.speed;
                this.swimming_sound.play();
            }

            if (this.world.keyboard.DOWN) {
                this.y += this.speed;
                this.swimming_sound.play();
            }
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {

                //Swimm animation
                let i = this.currentImage % this.IMAGES_SWIMM.length;
                let path = this.IMAGES_SWIMM[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }


    jump() {
        
    }
}