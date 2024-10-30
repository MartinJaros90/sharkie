class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    poisonBar = new PoisonBar();
    throwableObject = [];
    coins = [];

    background_sound = new Audio('audio/sound.mp3');
    


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.coins = this.level.light.filter(obj => obj instanceof Coin);
        this.poisons = this.level.light.filter(obj => obj instanceof Posion);
        this.draw();
        this.setWorld();
        // this.playBackgroundMusic();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }

    run() {
    setInterval(() => {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkCharacterCoinCollision();
        this.checkCharacterPoisonCollision();
    }, 200);
}


    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObject.push(bottle);
        }
    }

    checkCollisions() {
            this.level.enemies.forEach((enemy) => { 
               if (this.character.isColliding(enemy)) {
                   this.character.hit();
                   this.statusBar.setPercentage(this.character.energy);
               } 
            });
    }

checkCharacterCoinCollision() {
    this.coins.forEach((coin) => {  
        if (!coin.isCollected && this.character.isColliding(coin)) {
            coin.collect();  
            this.coinBar.coinCollected();  
            coin.isCollected = true;
        }
    });
}


checkCharacterPoisonCollision() {
    this.poisons.forEach((poison) => {
        if (!poison.isCollected && this.character.isColliding(poison)) {
            poison.collect(); 
            this.poisonBar.poisonCollected(); 
            poison.isCollected = true;  
        }
    });
}





    playBackgroundMusic() {
        this.background_sound.loop = true;
        this.background_sound.volume = 0.5;
        this.background_sound.play();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);


        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed  objects -----//
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        this.ctx.translate(this.camera_x, 0);


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.light);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);


        //draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}