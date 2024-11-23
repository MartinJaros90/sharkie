class VictoryScreen extends GameOver {
    /**
     * Creates a new VictoryScreen instance
     * @param {World} world - The game world instance
     */
    constructor(world) {
        super(world);
        this.victoryImage = new Image();
        this.victoryImage.src = 'img/6.Botones/Tittles/You win/Recurso 19.png';
        this.isHovered = false;
        this.handlers = {
            handleClick: this.createClickHandler(this.victoryImage),
            handleMouseMove: this.createMouseMoveHandler(this.victoryImage, this.isHovered),
            handleKeydown: this.createKeydownHandler(),
            handleTouch: this.createTouchHandler(this.victoryImage)
        };
        
        this.addEventListeners(this.handlers);
    }

    /**
     * Shows the victory screen and handles mobile controls visibility
     */
    show() {
        this.world.gameIsRunning = false;
        if (isMobile()) {
            document.querySelector('.mobile-controls').style.display = 'none';
        }
        this.render();
    }

    /**
     * Calculates and returns the dimensions and position of the try again button
     * @returns {Object} Button dimensions and coordinates
     * @property {number} buttonX - X coordinate of the button
     * @property {number} buttonY - Y coordinate of the button
     * @property {number} buttonWidth - Width of the button
     * @property {number} buttonHeight - Height of the button
     */
    getButtonDimensions() {
        let buttonWidth = 200;
        let buttonHeight = 50;
        let buttonX = (this.canvas.width - buttonWidth) / 2;
        let buttonY = this.canvas.height * 0.8;
        
        return {
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight
        };
    }

    /**
     * Renders the victory screen with animation frame loop
     */
    render() {
        const animate = () => {
            this.drawBackground();
            if (this.victoryImage.complete) {
                this.drawVictoryImage();
                this.drawStars();
                this.drawVictoryText();
                this.drawButton(this.isHovered);
            }

            if (!this.world.gameIsRunning) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    /**
     * Draws the semi-transparent background
     */
    drawBackground() {
        this.ctx.fillStyle = 'rgba(0, 0, 50, 0.9)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the victory image centered on the screen
     */
    drawVictoryImage() {
        let imgWidth = this.canvas.width * 0.6;
        let imgHeight = (imgWidth * this.victoryImage.height) / this.victoryImage.width;
        let x = (this.canvas.width - imgWidth) / 2;
        let y = (this.canvas.height - imgHeight) / 3;
        this.ctx.drawImage(this.victoryImage, x, y, imgWidth, imgHeight);
    }

    /**
     * Draws animated stars in the background
     * Creates a particle effect with random positions, sizes, and opacity
     */
    drawStars() {
        for (let i = 0; i < 100; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height;
            let size = Math.random() * 2 + 1;
            let alpha = 0.5 + Math.random() * 0.5;
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    /**
     * Draws the congratulations text
     */
    drawVictoryText() {
        this.ctx.font = "30px 'luckiest-guy'";
        this.ctx.fillStyle = 'rgba(127, 255, 224, 1)';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Congratulations!', this.canvas.width / 2, this.canvas.height * 0.7);
    }

    /**
     * Draws the try again button with hover effect
     * @param {boolean} isHovered - Whether the button is currently being hovered over
     */
    drawButton(isHovered) {
        let dims = this.getButtonDimensions();
        
        this.ctx.beginPath();
        this.ctx.roundRect(dims.buttonX, dims.buttonY, dims.buttonWidth, dims.buttonHeight, 25);
        this.ctx.fillStyle = isHovered ? 'rgba(127, 255, 224, 1)' : 'rgba(127, 255, 224, 0.9)';
        this.ctx.fill();
        
        this.ctx.font = "22px 'luckiest-guy'";
        this.ctx.fillStyle = isHovered ? '#1a0f0a' : '#2c1810';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        let textY = dims.buttonY + dims.buttonHeight / 2;
        this.ctx.fillText('TRY AGAIN', this.canvas.width / 2, isHovered ? textY - 3 : textY);
    }
}