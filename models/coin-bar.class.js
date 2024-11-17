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

    totalCoins = 18;  
    collectedCoins = 0;  

    /**
     * Creates a new CoinBar instance and initializes the percentage to 0
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

     /**
     * Updates the coin bar when a coin is collected
     * Calculates and sets new percentage based on collected coins
     */
    coinCollected() {
        this.collectedCoins++;
        let percentage = (this.collectedCoins / this.totalCoins) * 100;
        this.setPercentage(percentage);
    }

    /**
     * Sets the percentage and updates the displayed image
     * @param {number} percentage - The new percentage value (0-100)
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Determines which image to display based on the current percentage
     * @returns {number} Index of the image to display (0-5)
     * @private
     */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        else if (this.percentage >= 80) return 4;
        else if (this.percentage >= 60) return 3;
        else if (this.percentage >= 40) return 2;
        else if (this.percentage >= 20) return 1;
        else return 0;
    }

}

