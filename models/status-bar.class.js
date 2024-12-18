class StatusBar extends DrawableObject{

    IMAGES = [
        'img/4. Marcadores/Purple/0_ .png',
        'img/4. Marcadores/Purple/20__1.png',
        'img/4. Marcadores/Purple/40_ .png',
        'img/4. Marcadores/Purple/60_ .png',
        'img/4. Marcadores/Purple/80_ .png',
        'img/4. Marcadores/Purple/100_ .png'
    ];

    percentage = 100;

    /**
     * Creates a new status bar and initializes it to 100%
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the status bar's percentage and corresponding image
     * @param {number} percentage - New percentage value to display
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        this.loadImages(this.IMAGES);
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which image to display based on current percentage
     * @returns {number} Index of the image to display
     * @private
     */
    resolveImageIndex(){
        if (this.percentage == 100) {
            return 5;   
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

 }
