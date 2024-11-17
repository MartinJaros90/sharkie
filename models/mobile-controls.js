class MobileControls {

    /**
     * Creates mobile touch controls and links them to keyboard events
     * @constructor
     * @param {Object} keyboard - The keyboard state object to update
     */
    constructor(keyboard) {
        this.keyboard = keyboard;
        this.initTouchControls();
    }

    /**
     * Initializes all touch control buttons
     * Sets up event listeners for each control button
     */
    initTouchControls() {

        this.addTouchListener('.up-btn', 'UP');
        this.addTouchListener('.down-btn', 'DOWN');
        this.addTouchListener('.left-btn', 'LEFT');
        this.addTouchListener('.right-btn', 'RIGHT');
        this.addTouchListener('.bubble-btn', 'SPACE');
        this.addTouchListener('.slap-btn', 'D');     
    }

    /**
     * Adds touch event listeners to a specific control button
     * @param {string} selector - CSS selector for the button
     * @param {string} key - Corresponding keyboard key to simulate
     */
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