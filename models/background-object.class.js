class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new background object
     * @constructor
     * @param {string} imagePath - Path to the background image file
     * @param {number} x - Initial X coordinate of the background object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}      