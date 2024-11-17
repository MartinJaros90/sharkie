class EnemyFish extends MovableObject {

    height = 80;
    width = 80;
    IMAGES_SWIMM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];
    IMAGES_HIT = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
    ];

    /**
     * Creates a new enemy fish at specified position
     * @constructor
     * @param {number} x - The initial x coordinate
     * @param {number} y - The initial y coordinate
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_HIT);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Starts the movement and animation loops
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
}