let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function toggleSound() {
    isMuted = !isMuted;
    const soundBtn = document.querySelector('.sound-btn');
    const soundIcon = document.getElementById('soundIcon');
    
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