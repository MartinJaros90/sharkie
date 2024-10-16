class Light extends MovableObject{
    y = 10;
    width = 400;
    height = 350;


    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/COMPLETO.png');
        
        this.x = Math.random() * 500;

    }
}