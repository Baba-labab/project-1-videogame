class Components {
    constructor(gameScreen, top, right, width, height, imgScr) {
        this.gameScreen = gameScreen
        this.top = top;
        this.right = right;
        this.width = width;
        this.height = height;
        this.element = document.createElement("img")

        this.element.src = imgScr;
        this.element.style.position = "absolute"; 
        this.element.style.height = `${this.height}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.top = `${this.top}px`; 
        this.element.style.right = `${this.right}px`; 

        this.gameScreen.appendChild(this.element);

    }

    updatePosition() {
        this.element.style.right = `${this.right}px`;
        this.element.style.top = `${this.top}px`; 

    }
}

class Player extends Components {
    constructor (gameScreen, top, right, width, height, imgScr) {
        super(gameScreen, top, right, width, height, imgScr)
        
        this.directionX = 0; 
        this.directionY = 0; 
    }

    move() {

    }
    
}