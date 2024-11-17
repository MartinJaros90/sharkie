class Light extends MovableObject{
    y = 0;
    width = 2400;
    height = 350;


    constructor() {
        super().loadImage('img/3. Background/Layers/1. Light/completo.png');
        
        this.x = Math.random() * 500;
    }

}