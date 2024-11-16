class CooldownDisplay extends DrawableObject {
    x = 360;
    y = 100;
    world; 
    fontSize = 40;
    
    constructor() {
        super();
    }

    setWorld(world) {
        this.world = world;
    }

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