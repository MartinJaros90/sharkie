let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = true;
let gameStarted = false;
let mobileControls;


/**
 * Initializes the game and sets up mobile controls if needed
 */
function init() {
    canvas = document.getElementById('canvas');
    if (isMobile()) {
        mobileControls = new MobileControls(keyboard);
    }
}

/**
 * Checks if the device is a mobile device
 * @returns {boolean} True if mobile device, false otherwise
 */
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Starts the game and initializes the game world
 */
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('start-screen').style.display = 'none';
        canvas.style.display = 'block';
        
        showCanvasLoading()
            .then(() => {
                world = new World(canvas, keyboard);
                world.startGame();
                if (isMobile()) {
                    document.querySelector('.mobile-controls').style.display = 'flex';
                }
                if (!isMuted) {
                    AudioManager.startBackgroundMusic();
                }
            });
    }
}

/**
 * Hides the mobile controls UI element
 */
function hideMobileControls() {
    document.querySelector('.mobile-controls').style.display = 'none';
}

/**
 * Shows a loading screen with animation
 * @returns {Promise} Promise that resolves when loading is complete
 */
function showCanvasLoading() {
    return new Promise(resolve => {
        hideMobileControls();
        
        let loadingState = initializeLoadingState();
        let sharkieImg = loadSharkieImage();
        
        function draw() {
            drawLoadingBackground(loadingState.ctx);
            drawSharkieCharacter(loadingState, sharkieImg);
            drawLoadingBar(loadingState);
            drawLoadingText(loadingState.ctx);
            
            if (updateProgress(loadingState)) {
                requestAnimationFrame(draw);
            } else {
                setTimeout(resolve, 100);
            }
        }

        draw();
    });
}

/**
 * Loads the Sharkie character image
 * @returns {HTMLImageElement} The loaded image element
 */
function initializeLoadingState() {
    return {
        ctx: canvas.getContext('2d'),
        startTime: Date.now(),
        progress: 0,
        bounceY: 0
    };
}

function loadSharkieImage() {
    let img = new Image();
    img.src = 'img/1.Sharkie/1.IDLE/1.png';
    return img;
}

/**
 * Draws the loading background on the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
 */
function drawLoadingBackground(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 50, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws the Sharkie character on the loading screen with bounce animation
 * @param {Object} state - The current loading state object
 * @param {HTMLImageElement} sharkieImg - The Sharkie image element to draw
 */
function drawSharkieCharacter(state, sharkieImg) {
    if (sharkieImg.complete) {
        let elapsedTime = Date.now() - state.startTime;
        state.bounceY = Math.sin(elapsedTime / 500) * 20;
        
        state.ctx.drawImage(
            sharkieImg,
            canvas.width/2 - 50,
            canvas.height/2 - 100 + state.bounceY,
            100,
            100
        );
    }
}

/**
 * Draws the complete loading bar including background and progress
 * @param {Object} state - The current loading state object
 */
function drawLoadingBar(state) {
    drawLoadingBarBackground(state.ctx);
    drawLoadingBarProgress(state);
}

/**
 * Draws the loading bar background
 * @param {CanvasRenderingContext2D} ctx The canvas context
 */
function drawLoadingBarBackground(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.roundRect(canvas.width/2 - 100, canvas.height/2 + 20, 200, 20, 10);
    ctx.fill();
}

/**
 * Draws the loading bar progress
 * @param {Object} state - The current loading state object containing context and progress
 */
function drawLoadingBarProgress(state) {
    state.ctx.fillStyle = '#4e9fff';
    state.ctx.beginPath();
    state.ctx.roundRect(
        canvas.width/2 - 100,
        canvas.height/2 + 20,
        state.progress * 2,
        20,
        10
    );
    state.ctx.fill();
}

/**
 * Draws the loading text on the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
 */
function drawLoadingText(ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '24px "luckiest-guy"';
    ctx.textAlign = 'center';
    ctx.fillText('Loading...', canvas.width/2, canvas.height/2 + 80);
}

/**
 * Updates the loading progress
 * @param {Object} state The current loading state
 * @returns {boolean} True if still loading, false when complete
 */
function updateProgress(state) {
    let elapsedTime = Date.now() - state.startTime;
    state.progress = Math.min(100, (elapsedTime / 2000) * 100);
    return state.progress < 100;
}

/**
 * Toggles sound on/off and updates UI accordingly
 */
function toggleSound() {
    isMuted = !isMuted;
    let soundBtn = document.querySelector('.sound-btn');
    let soundIcon = document.getElementById('soundIcon');
    
    if (isMuted) {
        soundBtn.classList.add('muted');
        AudioManager.muteAll();
        soundIcon.src = 'img/6.Botones/mute.png'; 
    } else {
        soundBtn.classList.remove('muted');
        AudioManager.unmuteAll();
        soundIcon.src = 'img/6.Botones/sound.png';
    }
}

/**
 * Shows the game instructions screen and hides the main menu
 */
function showInstructions() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('instructions').style.display = 'flex';
}

/**
 * Hides the instructions screen and shows the main menu
 */
function hideInstructions() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
}

/**
 * Event handler for keyboard inputs
 * @param {KeyboardEvent} e The keyboard event
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode ==  39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

     if (e.keyCode == 68) {
        keyboard.D  = true;
    }
    
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode ==  39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE  = false;
    }

    if (e.keyCode == 68) {
        keyboard.D  = false;
    }
});