class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 80;
    y = 300;
    height = 100;
    width = 120;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

// drawFrame(ctx) { 
//     if (this instanceof Character) {
//         // Offsets nur für den Charakter
//         let offsetX = 40; 
//         let offsetY = 40; 
//         let offsetTop = 110; 

//         // Zeichne den verkleinerten Rahmen für den Charakter
//         ctx.beginPath();
//         ctx.lineWidth = '2';
//         ctx.strokeStyle = "red";
//         ctx.rect(this.x + offsetX, this.y + offsetTop, this.width - 2 * offsetX, this.height - offsetY - offsetTop);
//         ctx.stroke();
//     } 
//     // Rahmen für Feinde und andere Objekte
//     else if (this instanceof EnemyBubble || this instanceof EnemyFish || this instanceof EnemyJelly || this instanceof EnemyPink || this instanceof EnemyYellow || this instanceof Endboss) {
//         ctx.beginPath();
//         ctx.lineWidth = '2';
//         ctx.strokeStyle = "red";
//         ctx.rect(this.x, this.y, this.width, this.height);
//         ctx.stroke();
//     }
// }




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
}