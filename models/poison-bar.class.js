class PoisonBar extends StatusBar{
    IMAGES = [
        'img/4. Marcadores/Purple/0_.png',
        'img/4. Marcadores/Purple/20_.png',
        'img/4. Marcadores/Purple/40_.png',
        'img/4. Marcadores/Purple/60_.png',
        'img/4. Marcadores/Purple/80_.png',
        'img/4. Marcadores/Purple/100_.png'
    ];

   percentageCoins = 0;
    x = 40;
    y = 80;


    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }


   /**
    * This function handles the case when a coin is collected and increments the coin percentage.
    */
    coinCollected(){
        this.percentageCoins += 20;
        this.setPercentage(this.percentageCoins);
    }


}