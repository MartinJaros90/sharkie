
class GameOver {
    constructor(world) {
        this.world = world;
        this.canvas = world.canvas;
        this.ctx = world.ctx;
    }

    /**
     * Shows the game over screen and disables mobile controls if necessary
     */
    show() {
        this.world.gameIsRunning = false;
        
        if (isMobile()) {
            document.querySelector('.mobile-controls').style.display = 'none';
        }
        
        this.setup();
    }
    
    /**
     * Sets up the game over screen with image and event handlers
     */
    setup() {
        let gameOverImage = new Image();
        gameOverImage.src = 'img/6.Botones/Tittles/Game Over/Recurso 12.png';
        let isHovered = false;

        this.handlers = this.createEventHandlers(gameOverImage, isHovered);
        this.addEventListeners(this.handlers);
        
        if (gameOverImage.complete) {
            this.render(gameOverImage, isHovered);
        } else {
            gameOverImage.onload = () => this.render(gameOverImage, isHovered);
        }
    }
    
    /**
     * Creates event handlers for mouse and keyboard interactions
     * @param {HTMLImageElement} gameOverImage - The game over screen image
     * @param {boolean} isHovered - Current hover state
     * @returns {Object} Object containing event handler functions
     */
    createEventHandlers(gameOverImage, isHovered) {
        let handleClick = (event) => {
            if (this.isButtonClicked(event, gameOverImage)) {
                this.restartGame();
            }
        };
    
        let handleMouseMove = (event) => {
            let newIsHovered = this.isButtonHovered(event, gameOverImage);
            if (newIsHovered !== isHovered) {
                isHovered = newIsHovered;
                this.canvas.style.cursor = isHovered ? 'pointer' : 'default';
            }
        };
    
        let handleKeydown = (e) => {
            if (e.key === 'Enter') this.restartGame();
        };
    
        return { handleClick, handleMouseMove, handleKeydown };
    }
    
    /**
     * Adds event listeners for user interactions
     * @param {Object} handlers - Object containing event handler functions
     */
    addEventListeners({ handleClick, handleMouseMove, handleKeydown }) {
        this.canvas.addEventListener('mousemove', handleMouseMove);
        this.canvas.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydown);
    }
    
    /**
     * Restarts the game and cleans up event listeners
     */
    restartGame() {
        let { handleClick, handleMouseMove, handleKeydown } = this.handlers;
        this.canvas.removeEventListener('mousemove', handleMouseMove);
        this.canvas.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeydown);

        if (isMobile()) {
            document.querySelector('.mobile-controls').style.display = 'flex';
        }
        
        location.reload();
    }
    
    /**
     * Checks if the restart button was clicked
     * @param {MouseEvent} event - The mouse event
     * @param {HTMLImageElement} gameOverImage - The game over screen image
     * @returns {boolean} Whether the button was clicked
     */
    isButtonClicked(event, gameOverImage) {
        let { x, y } = this.getMousePosition(event);
        let buttonDimensions = this.getButtonDimensions(gameOverImage);
        return this.isPointInButton(x, y, buttonDimensions);
    }
    
    isButtonHovered(event, gameOverImage) {
        let { x, y } = this.getMousePosition(event);
        let buttonDimensions = this.getButtonDimensions(gameOverImage);
        return this.isPointInButton(x, y, buttonDimensions);
    }
    
    /**
     * Gets the current mouse position relative to canvas
     * @param {MouseEvent} event - The mouse event
     * @returns {Object} Object containing x and y coordinates
     */
    getMousePosition(event) {
        let rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    
    /**
     * Calculates button dimensions based on canvas size
     * @param {HTMLImageElement} gameOverImage - The game over screen image
     * @returns {Object} Object containing button dimensions and position
     */
    getButtonDimensions(gameOverImage) {
        let buttonWidth = 200;
        let buttonHeight = 50;
        let buttonX = (this.canvas.width - buttonWidth) / 2;
        let buttonY = (this.canvas.height / 2) + 
                     (this.canvas.width * 0.6 * gameOverImage.height / gameOverImage.width) / 2 + 20;
        return { buttonX, buttonY, buttonWidth, buttonHeight };
    }
    
    isPointInButton(x, y, { buttonX, buttonY, buttonWidth, buttonHeight }) {
        return x >= buttonX && x <= buttonX + buttonWidth &&
               y >= buttonY && y <= buttonY + buttonHeight;
    }
    
    /**
     * Renders the game over screen
     * @param {HTMLImageElement} gameOverImage - The game over screen image
     * @param {boolean} isHovered - Current hover state
     */
    render(gameOverImage, isHovered) {
        this.drawBackground();
        
        if (gameOverImage.complete) {
            this.drawGameOverImage(gameOverImage);
            this.drawButton(gameOverImage, isHovered);
        }
        
        if (!this.world.gameIsRunning) {
            requestAnimationFrame(() => this.render(gameOverImage, isHovered));
        }
    }
    
    /**
     * Draws the semi-transparent background
     */
    drawBackground() {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Draws the game over image
     * @param {HTMLImageElement} gameOverImage - The game over screen image
     */
    drawGameOverImage(gameOverImage) {
        let imgWidth = this.canvas.width * 0.6;
        let imgHeight = (imgWidth * gameOverImage.height) / gameOverImage.width;
        let x = (this.canvas.width - imgWidth) / 2;
        let y = (this.canvas.height - imgHeight) / 2;
        this.ctx.drawImage(gameOverImage, x, y, imgWidth, imgHeight);
    }
    
    /**
     * Draws the restart button with all its effects
     * @param {HTMLImageElement} gameOverImage - The game over screen image
     * @param {boolean} isHovered - Current hover state
     */
    drawButton(gameOverImage, isHovered) {
        let dimensions = this.getButtonDimensions(gameOverImage);
        
        this.drawButtonBackground(dimensions, isHovered);
        this.drawButtonBorder(dimensions);
        this.drawButtonShadow(isHovered);
        this.drawButtonText(dimensions, isHovered);
        
        if (isHovered) {
            this.drawButtonHoverEffect(dimensions);
        }
        
        this.ctx.restore();
    }
    
    /**
     * Draws the button background with hover effects
     * @param {Object} dimensions - Button dimensions and position
     * @param {boolean} isHovered - Current hover state
     */
    drawButtonBackground({ buttonX, buttonY, buttonWidth, buttonHeight }, isHovered) {
        this.ctx.beginPath();
        this.ctx.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 25);
        this.ctx.fillStyle = isHovered ? 'rgba(127, 255, 224, 1)' : 'rgba(127, 255, 224, 0.9)';
        this.ctx.fill();
    }
    
    drawButtonBorder({ buttonX, buttonY, buttonWidth, buttonHeight }) {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }
    
    drawButtonShadow(isHovered) {
        if (isHovered) {
            this.ctx.shadowColor = 'rgba(127, 255, 224, 0.8)';
            this.ctx.shadowBlur = 25;
            this.ctx.shadowOffsetY = 6;
        } else {
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowOffsetY = 4;
        }
        this.ctx.shadowOffsetX = 0;
    }
    
    drawButtonText({ buttonX, buttonY, buttonHeight }, isHovered) {
        this.ctx.font = "22px 'luckiest-guy'";
        this.ctx.fillStyle = isHovered ? '#1a0f0a' : '#2c1810';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        let textY = buttonY + buttonHeight / 2;
        this.ctx.fillText('TRY AGAIN', this.canvas.width / 2, isHovered ? textY - 3 : textY);
    }
    
    /**
     * Draws the button's hover effect gradient
     * @param {Object} dimensions - Button dimensions and position
     */
    drawButtonHoverEffect({ buttonX, buttonY, buttonWidth, buttonHeight }) {
        let gradient = this.ctx.createLinearGradient(buttonX, buttonY, buttonX + buttonWidth, buttonY + buttonHeight);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
}