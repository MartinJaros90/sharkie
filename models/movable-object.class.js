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
    energy = 100;
    lastHit = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) { 
         if (this instanceof Character || this instanceof EnemyBubble || this instanceof EnemyFish || this instanceof EnemyJelly ||this instanceof EnemyPink ||this instanceof EnemyYellow ||this instanceof Endboss)  {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isColliding (mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
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