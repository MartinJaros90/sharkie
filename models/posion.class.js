class Posion extends MovableObject {

    height = 80;
    width = 60;
    speed = 0;
    isCollected = false; 
    IMAGES_SWIMM = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    /**
     * Creates a new poison item at a random x position
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);
        this.y = 380;
        this.x = 200 + Math.random() * 1800;
        this.animate();
    }

    /**
     * Starts the poison item's animation
     * Handles movement and floating animation if not collected
     */
    animate() {
        this.moveLeft();

        setInterval(() => {
            if (!this.isCollected) {  
                this.playAnimation(this.IMAGES_SWIMM);
            }
        }, 200);
    }

    /**
     * Handles collection animation
     * Makes the poison item fly upward and disappear after collection
     */
    collect() {
        this.isCollected = true;  
        let flyUpInterval = setInterval(() => {
            this.y -= 5;  
            if (this.y < -100) { 
                clearInterval(flyUpInterval); 
            }
        }, 1000 / 60);  
    }
}
