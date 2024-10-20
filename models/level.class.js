class Level{
    enemies;
    light;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, light, backgroundObjects) {
        this.enemies = enemies;
        this.light = light;
        this.backgroundObjects = backgroundObjects;
    }
}