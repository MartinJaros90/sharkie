class EnemyBubble extends MovableObject {

    height = 60;
    width = 80;
    IMAGES_SWIMM = [
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_SWIMM[0]);
        this.loadImages(this.IMAGES_SWIMM);

        this.animate();

        this.x = 1500 + Math.random() * 500;
        this.y = Math.random() * 420;
        this.speed = 0.65 + Math.random() * 0.5;
    }


    animate() {
          setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMM);
        }, 200);
    }
    
}