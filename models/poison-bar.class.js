class PoisonBar extends StatusBar {
    IMAGES = [
        'img/4. Marcadores/Purple/0_.png',
        'img/4. Marcadores/Purple/20_.png',
        'img/4. Marcadores/Purple/40_.png',
        'img/4. Marcadores/Purple/60_.png',
        'img/4. Marcadores/Purple/80_.png',
        'img/4. Marcadores/Purple/100_.png'
    ];

    percentagePoison = 10;  
    x = 40;
    y = 80;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);  
    }

    poisonCollected() {
        this.percentagePoison += 20;  
        if (this.percentagePoison > 100) {
            this.percentagePoison = 100; 
        }
        this.setPercentage(this.percentagePoison);  
    }

    poisonThrown() {
        this.percentagePoison -= 20;  
        if (this.percentagePoison < 0) {
            this.percentagePoison = 0; 
        }
        this.setPercentage(this.percentagePoison);  
    }
}
