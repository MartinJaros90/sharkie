/**
 * Represents the cooldown display for character abilities
 * @extends DrawableObject
 */
class CooldownDisplay extends DrawableObject {
    x = 360;
    y = 100;
    world; 
    fontSize = 40;
    
    constructor() {
        super();
    }

    /**
     * Sets the game world reference
     * @param {World} world - The game world instance
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Draws the cooldown text on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        if (this.world && this.world.character && this.world.character.cooldownDisplay) {
            ctx.font = `${this.fontSize}px 'luckiest-guy'`;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';
            ctx.strokeText(this.world.character.cooldownDisplay, this.x, this.y);
            ctx.fillText(this.world.character.cooldownDisplay, this.x, this.y);
        }
    }
}