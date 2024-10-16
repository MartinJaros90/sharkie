class MovableObject{
    x = 80;
    y = 300;
    height = 100;
    width = 120;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
        
    }

    moveLeft() {
        
    }
}