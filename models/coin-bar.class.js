class CoinBar extends StatusBar {
    IMAGES = [
        'img/4. Marcadores/Purple/0_ _1.png',
        'img/4. Marcadores/Purple/20_ .png',
        'img/4. Marcadores/Purple/40_ _1.png',
        'img/4. Marcadores/Purple/60_ _1.png',
        'img/4. Marcadores/Purple/80_ _1.png',
        'img/4. Marcadores/Purple/100__1.png'
    ];

    percentageCoins = 10; 
    x = 40;
    y = 40;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);  
    }

coinCollected() {
    this.percentageCoins += 20; 
    if (this.percentageCoins > 100) {
        this.percentageCoins = 100;  
    }
    this.setPercentage(this.percentageCoins);  
    console.log('Percentage after:', this.percentageCoins); 
}


    
}

