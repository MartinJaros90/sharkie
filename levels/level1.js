const level1 = new Level(
    
    [
        new EnemyFish(),
        new EnemyFish(),
        new EnemyFish(),
        new EnemyPink(),
        new EnemyPink(),
        new EnemyJelly(),
        new EnemyJelly(),
        new EnemyJelly(),
        new EnemyYellow(),
        new EnemyYellow(),
        new EnemyYellow(),
        new EnemyBubble(),
        new EnemyBubble(),
        new Endboss()
    ],
    [
        new Light(),

        new Posion(),
        new Posion(),
        new Posion(),
        new Posion(),
        new Posion(),
        new Posion(),
        
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
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
        new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 720*3)
        
    ]
);