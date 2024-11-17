class MobileControls {
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.initTouchControls();
    }

    initTouchControls() {

        this.addTouchListener('.up-btn', 'UP');
        this.addTouchListener('.down-btn', 'DOWN');
        this.addTouchListener('.left-btn', 'LEFT');
        this.addTouchListener('.right-btn', 'RIGHT');
        this.addTouchListener('.bubble-btn', 'SPACE');
        this.addTouchListener('.slap-btn', 'D');     
    }

    addTouchListener(selector, key) {
        let button = document.querySelector(selector);
        if (!button) {
            console.warn(`Button ${selector} nicht gefunden!`);
            return;
        }
    
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keyboard[key] = true;
        });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keyboard[key] = false;
        });

        button.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            this.keyboard[key] = false;
        });

        button.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
    }
}