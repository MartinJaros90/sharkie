class CoinBar extends StatusBar {
    IMAGES = [
        'img/4. Marcadores/Purple/0_ _1.png',
        'img/4. Marcadores/Purple/20_ .png',
        'img/4. Marcadores/Purple/40_ _1.png',
        'img/4. Marcadores/Purple/60_ _1.png',
        'img/4. Marcadores/Purple/80_ _1.png',
        'img/4. Marcadores/Purple/100__1.png'
    ];

    x = 40;
    y = 40;

    totalCoins = 18;  // Gesamtanzahl der Coins im Level
    collectedCoins = 0;  // Zähler für eingesammelte Coins

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

    coinCollected() {
        this.collectedCoins++;
        // Berechne Prozentsatz basierend auf gesammelten Coins
        let percentage = (this.collectedCoins / this.totalCoins) * 100;
        this.setPercentage(percentage);
        console.log(`Coins collected: ${this.collectedCoins}/${this.totalCoins} (${percentage}%)`);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // Speichere den aktuellen Prozentsatz
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        else if (this.percentage >= 80) return 4;
        else if (this.percentage >= 60) return 3;
        else if (this.percentage >= 40) return 2;
        else if (this.percentage >= 20) return 1;
        else return 0;
    }

    
}

