class BubbleManager {
    constructor(world) {
        this.world = world;
    }

   /**
     * Handles throwing of poison bubbles
     */
   checkThrowObjects() {
    if (this.world.keyboard.P && this.world.collectedPoisons > 0) {
        let poisonBubble = new PoisonBubble(this.world.character.x + 100, this.world.character.y + 100);
        this.world.throwableObject.push(poisonBubble);
        this.world.collectedPoisons--;
        this.world.poisonBar.poisonThrown();
    }
    }

    /**
     * Handles throwing of normal bubbles
     */
    checkSpaceThrow() {
        if (this.canThrowBubble()) {
            this.initiateBubbleThrow();
        }
    }

    /**
     * Checks if a bubble can be thrown
     * @private
     * @returns {boolean} True if bubble throw is possible
     */
    canThrowBubble() {
        return this.world.keyboard.SPACE && this.world.character.canThrow;
    }

    /**
     * Initiates the bubble throwing animation and creation
     * @private
     */
    initiateBubbleThrow() {
        this.world.character.canThrow = false;
        this.world.character.startThrowAnimation(() => {
            let bubblePosition = this.calculateBubblePosition();
            this.createAndThrowBubble(bubblePosition);
        });
    }

    /**
     * Calculates the starting position for the bubble
     * @private
     * @returns {Object} x and y coordinates for the bubble
     */
    calculateBubblePosition() {
        return {
            x: this.world.character.otherDirection ? 
                this.world.character.x : 
                this.world.character.x + this.world.character.width,
            y: this.world.character.y + this.world.character.height * 0.4
        };
    }

    /**
     * Creates and throws the appropriate bubble type
     * @private
     * @param {Object} position - The starting position for the bubble
     */
    createAndThrowBubble(position) {
        if (this.world.remainingPoisonBubbles > 0) {
            this.throwPoisonBubble(position);
        } else {
            this.throwNormalBubble(position);
        }
    }

    /**
     * Creates and throws a poison bubble
     * @private
     * @param {Object} position - The starting position for the bubble
     */
    throwPoisonBubble(position) {
        let bubble = new PoisonBubble(
            position.x, 
            position.y, 
            this.world.character.otherDirection
        );
        this.world.throwableObject.push(bubble);
        this.world.remainingPoisonBubbles--;
        this.world.poisonBar.poisonThrown();
    }

    /**
     * Creates and throws a normal bubble
     * @private
     * @param {Object} position - The starting position for the bubble
     */
    throwNormalBubble(position) {
        let bubble = new NormalBubble(
            position.x, 
            position.y, 
            this.world.character.otherDirection
        );
        this.world.throwableObject.push(bubble);
    }

    /**
     * Checks for collisions between bubbles and enemies
     */
    checkBubbleEnemyCollision() {
        this.world.throwableObject.forEach((bubble, bubbleIndex) => {
            this.handleBubbleCollision(bubble, bubbleIndex);
        });
    }

    /**
     * Handles collision detection and effects for a single bubble
     * @private
     * @param {Bubble} bubble - The bubble to check
     * @param {number} bubbleIndex - Index of the bubble in throwableObject array
     */
    handleBubbleCollision(bubble, bubbleIndex) {
        let hitRegistered = false;
        for (let enemy of this.world.level.enemies) {
            if (!hitRegistered && bubble.hasSimpleCollisionWith(enemy)) {
                hitRegistered = true;
                this.processBubbleHit(bubble, enemy, bubbleIndex);
                break;
            }
        }
    }

    /**
     * Processes the effects of a bubble hitting an enemy
     * @private
     * @param {Bubble} bubble - The bubble that hit
     * @param {Enemy} enemy - The enemy that was hit
     * @param {number} bubbleIndex - Index of the bubble to remove if needed
     */
    processBubbleHit(bubble, enemy, bubbleIndex) {
        if (bubble instanceof PoisonBubble) {
            this.handlePoisonBubbleHit(enemy, bubbleIndex);
        } else {
            this.handleNormalBubbleHit(bubble, enemy);
        }
    }

    /**
     * Handles poison bubble hit effects
     * @private
     * @param {Enemy} enemy - The enemy that was hit
     * @param {number} bubbleIndex - Index of the bubble to remove
     */
    handlePoisonBubbleHit(enemy, bubbleIndex) {
        this.world.throwableObject.splice(bubbleIndex, 1); 
        if (enemy instanceof Endboss) {
            enemy.hit();
        } else {
            this.world.startKnockbackAnimation(enemy);
        }
    }

      /**
     * Handles normal bubble capture effects
     * @private
     * @param {NormalBubble} bubble - The normal bubble
     * @param {Enemy} enemy - The enemy to capture
     */
    handleNormalBubbleHit(bubble, enemy) {
        if (!(enemy instanceof Endboss) && !bubble.enemyCaptured && !enemy.isTrappedInBubble) {
            bubble.captureEnemy(enemy);
        }
    }
}

