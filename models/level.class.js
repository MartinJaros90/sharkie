class Level{
    enemies;
    light;
    backgroundObjects;
    level_end_x = 2200;

    /**
     * Creates a new level with specified objects
     * @constructor
     * @param {Array<MovableObject>} enemies - Array of enemy objects
     * @param {Array<Object>} light - Array of light effect objects
     * @param {Array<BackgroundObject>} backgroundObjects - Array of background objects
     */
    constructor(enemies, light, backgroundObjects) {
        this.enemies = enemies;
        this.light = light;
        this.backgroundObjects = backgroundObjects;
    }
}