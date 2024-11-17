class EnemyPink extends MovableObject {

    height = 80;
    width = 80;
    IMAGES_SWIMM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png'
    ];

    /**
     * Creates a new pink puffer fish with random position and speed
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);

        this.animate();

        this.x = 700 + Math.random() * 500;
        this.y = Math.random() * 420;
        this.speed = 0.35 + Math.random() * 0.5;
    }

    /**
     * Starts the enemy's animation loops
     * Handles continuous left movement and swimming animation
     */
    animate() {
         setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMM);
        }, 200);
    }
}