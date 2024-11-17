class EnemyJelly extends MovableObject {

    height = 80;
    width = 80;
    IMAGES_SWIMM = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
     IMAGES_HIT = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];

    /**
     * Creates a new jellyfish enemy with random position and speed
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_HIT);

        this.animate();

        this.x = 1000 + Math.random() * 500;
        this.y = Math.random() * 420;
        this.speed = 0.05 + Math.random() * 0.2;
    }

    /**
     * Starts the jellyfish's animation loops
     * Handles continuous left movement and swimming animation
     */
    animate() {
          setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMM);
        }, 100);
    }

    /**
     * Plays the death animation when jellyfish is hit
     * @param {Function} [callback] - Optional callback function to execute after animation completes
     */
    playHitAnimation(callback) {
        this.currentImage = 0;
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HIT);

            if (this.currentImage >= this.IMAGES_HIT.length) {
                clearInterval(interval);
                if (callback) callback(); 
            }
        }, 1000 / 30);
    }
}