class MovableObject{
    x = 80;
    y = 300;
    height = 100;
    width = 120;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


/**
 * 
 * @param {Array} arr - ['img/1.Sharkie/1.IDLE/1.png', 'img/1.Sharkie/1.IDLE/1.png', ... ] 
 */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }


    playAnimation(images){
        let i = this.currentImage % this.IMAGES_SWIMM.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // AnimationIdle(images) {
    //     let i = this.currentImage % this.IMAGES_IDLE.length;
    //     let path = images[i];
    //     this.img = this.imageCache[path];
    //     this.currentImage++;
    // }


    moveRight() {
        console.log('Moving right');
        
    }

    moveLeft() {
        setInterval(() => {
        this.x -= this.speed;
        }, 1000 / 60);
    }
}