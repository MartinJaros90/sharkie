class EndbossStatusBar extends StatusBar {

    visible = false;

    IMAGES = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',    
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'
    ];

    constructor() {
        super();
        this.x = 480; 
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}