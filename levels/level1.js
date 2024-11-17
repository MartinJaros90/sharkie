let level1; 

/**
 * Initializes and returns the first level of the game
 * @returns {Level} The initialized level object
 */
function initLevel() {
    level1 = new Level(
        createEnemies(),
        createCollectibles(),
        createBackground()
    );
    return level1;
}

/**
 * Creates and returns an array of enemy objects for the level
 * @returns {Array<MovableObject>} Array containing all enemy instances
 */
function createEnemies() {
    let enemies = [];
    
    enemies.push(
        new EnemyFish(500, 100),
        new EnemyFish(400, 300)
    );
    
    enemies.push(
        new EnemyPink(900, 150),
        new EnemyPink(1200, 350),
        new EnemyJelly(1000, 200),
        new EnemyJelly(1400, 300)
    );
    
    enemies.push(
        new EnemyYellow(1700, 250),
        new EnemyYellow(1900, 150),
        new EnemyBubble(2000, 300),
        new EnemyJelly(2200, 200)
    );
    
    enemies.push(new Endboss());
    
    return enemies;
}

/**
 * Creates and returns an array of collectible objects for the level
 * @returns {Array<MovableObject>} Array containing all collectible instances
 */
function createCollectibles() {
    let collectibles = [];
    
    createCoinPattern(collectibles, 500, 200, 3, 'vertical');   
    createCoinPattern(collectibles, 800, 150, 6, 'circle');     
    createCoinPattern(collectibles, 1200, 200, 6, 'zigzag');    
    createCoinPattern(collectibles, 1600, 250, 3, 'triangle');   
    
    createPoisonPattern(collectibles, 800, 380, 3, 'spaced');
    createPoisonPattern(collectibles, 1600, 350, 2, 'stacked');
    createPoisonPattern(collectibles, 1600, 350, 2, 'stacked');
    
    return collectibles;
}

/**
 * Creates a pattern of coins at specified position
 * @param {Array} collectibles - Array to store the collectible objects
 * @param {number} startX - Starting X coordinate for the pattern
 * @param {number} startY - Starting Y coordinate for the pattern
 * @param {number} count - Number of coins to create
 * @param {string} pattern - Pattern type ('vertical'|'circle'|'zigzag'|'triangle')
 */
function createCoinPattern(collectibles, startX, startY, count, pattern) {
    for (let i = 0; i < count; i++) {
        let x, y;
        switch(pattern) {
            case 'vertical':
                x = startX;
                y = startY + (i * 60);
                break;
            case 'circle':
                let angle = (i / count) * Math.PI * 2;
                x = startX + Math.cos(angle) * 60;
                y = startY + Math.sin(angle) * 60;
                break;
            case 'zigzag':
                x = startX + (i * 60);
                y = startY + (i % 2 === 0 ? 0 : 60);
                break;
            case 'triangle':
                if (i === 0) {
                    x = startX; 
                    y = startY;
                } else if (i === 1) {
                    x = startX - 30; 
                    y = startY + 60;
                } else {
                    x = startX + 30; 
                    y = startY + 60;
                }
                break;
            default:
                x = startX + (i * 60);
                y = startY;
        }
        collectibles.push(new Coin(x, y));
    }
}

/**
 * Creates a pattern of poison bottles
 * @param {Array} collectibles - Array to store the collectible objects
 * @param {number} startX - Starting X coordinate for the pattern
 * @param {number} startY - Starting Y coordinate for the pattern
 * @param {number} count - Number of poison bottles to create
 * @param {string} pattern - Pattern type ('spaced'|'stacked')
 */
function createPoisonPattern(collectibles, startX, startY, count, pattern = 'spaced') {
    switch(pattern) {
        case 'spaced':
            for (let i = 0; i < count; i++) {
                collectibles.push(new Posion(startX + (i * 120), startY));
            }
            break;
        case 'stacked':
            for (let i = 0; i < count; i++) {
                collectibles.push(new Posion(startX, startY - (i * 100)));
            }
            break;
    }
}

/**
 * Creates and returns an array of background objects for the level
 * @returns {Array<BackgroundObject>} Array containing all background layer instances
 */
function createBackground() {
    return [
        new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', -720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', -720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', -720),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', -720),

        new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 0),
        new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 720),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 720),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 720),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 720),

        new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 720*2),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 720*2),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 720*2),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 720*2),
        new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 720*3),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 720*3),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 720*3),
        new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 720*3),
    ];
}
