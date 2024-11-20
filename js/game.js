let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let mobileControls;



/**
 * Initializes the game and sets up controls based on device type
 */
function init() {
    canvas = document.getElementById('canvas');
    setupControls();
    
    updateSoundUI(AudioManager.muted);
    if (!AudioManager.muted) {
        AudioManager.startBackgroundMusic();
    }

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', debounce(setupControls, 250));
}

/**
 * Checks if the device is a mobile device or tablet
 * @returns {boolean} True if mobile device or tablet, false otherwise
 */
function isMobile() {
    let hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let MOBILE_WIDTH = 768;
    let TABLET_WIDTH = 1024;
    let mobileTabletRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|Tab/i;
    
    return (
        hasTouch && (
            window.innerWidth <= TABLET_WIDTH ||
            mobileTabletRegex.test(navigator.userAgent) ||
            (window.innerWidth / window.innerHeight < 1.3)
        )
    );
}

/**
 * Sets up appropriate controls based on device type and screen size
 */
function setupControls() {
    if (isMobile()) {
        if (!mobileControls) {
            mobileControls = new MobileControls(keyboard);
        }
        if (gameStarted) {
            document.querySelector('.mobile-controls').style.display = 'flex';
        } else {
            document.querySelector('.mobile-controls').style.display = 'none';
        }
    } else {
        if (mobileControls) {
            document.querySelector('.mobile-controls').style.display = 'none';
        }
    }
}

/**
 * Adjusts touch area sizes based on screen dimensions
 */
function adjustTouchAreaSizes() {
    let controls = document.querySelector('.mobile-controls');
    if (!controls) return;

    let isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    let buttonSize = isTablet ? '60px' : '45px';
    let buttonMargin = isTablet ? '15px' : '10px';

    document.querySelectorAll('.mobile-controls button').forEach(button => {
        button.style.width = buttonSize;
        button.style.height = buttonSize;
        button.style.margin = buttonMargin;
    });
}

/**
 * Handles orientation changes on mobile devices
 */
function handleOrientationChange() {
    setTimeout(() => {
        setupControls();
        adjustGameCanvas();
    }, 100);
}

/**
 * Debounce function to limit rapid repeated calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        let later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Adjusts game canvas size based on screen dimensions
 */
function adjustGameCanvas() {
    let canvas = document.getElementById('canvas');
    if (!canvas) return;

    if (window.innerWidth <= 1024) {
        let maxWidth = Math.min(window.innerWidth * 0.95, 720);
        canvas.style.width = `${maxWidth}px`;
        canvas.style.height = 'auto';
    } else {
        canvas.style.width = '720px';
        canvas.style.height = '480px';
    }
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
                setupControls(); 
                if (!AudioManager.muted) {   
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
    AudioManager.muted = !AudioManager.muted;
    updateSoundUI(AudioManager.muted);
    localStorage.setItem('isMuted', AudioManager.muted);
}

/**
 * Updates the sound UI elements based on mute state
 * @param {boolean} isMuted - Whether sound is muted
 */
function updateSoundUI(isMuted) {
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

function showImpressum() {
    document.getElementById('impressum-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
}

function hideImpressum() {
    document.getElementById('impressum-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Erlaubt wieder Scrollen
}

// Schließen des Modals wenn außerhalb geklickt wird
window.onclick = function(event) {
    let modal = document.getElementById('impressum-modal');
    if (event.target == modal) {
        hideImpressum();
    }
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