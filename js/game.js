let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = true;
let gameStarted = false;

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('start-screen').style.display = 'none';
        canvas.style.display = 'block';
        
        showCanvasLoading()
            .then(() => {
                world = new World(canvas, keyboard);
                world.startGame();
                if (!isMuted) {
                    AudioManager.startBackgroundMusic();
                }
            });
    }
}

function showCanvasLoading() {
    return new Promise(resolve => {
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


function drawLoadingBackground(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 50, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


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


function drawLoadingBar(state) {
    drawLoadingBarBackground(state.ctx);
    drawLoadingBarProgress(state);
}


function drawLoadingBarBackground(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.roundRect(canvas.width/2 - 100, canvas.height/2 + 20, 200, 20, 10);
    ctx.fill();
}


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


function drawLoadingText(ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '24px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('Loading...', canvas.width/2, canvas.height/2 + 80);
}


function updateProgress(state) {
    let elapsedTime = Date.now() - state.startTime;
    state.progress = Math.min(100, (elapsedTime / 2000) * 100);
    return state.progress < 100;
}

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

function showInstructions() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('instructions').style.display = 'flex';
}

function hideInstructions() {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
}



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
        keyboard.SPACE  = true;
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