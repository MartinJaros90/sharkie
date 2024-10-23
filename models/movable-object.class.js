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
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
       this.x += this.speed;
    }

    moveLeft() {
       this.x -= this.speed;
    }

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }
}