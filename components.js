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
    constructor(gameScreen, top, right, width, height, imgScr) {
        super(gameScreen, top, right, width, height, imgScr)

        this.directionX = 0;
        this.directionY = 0;
    }

    move() {
        this.top += this.directionY;
        this.right += this.directionX;

        //make sure it stays within the screen
        //left
        if (this.right < 10) {
            this.right = 10
        }
        //top
        if (this.top < 200) {
            this.top = 200;
        }
        //right
        if (this.right > this.gameScreen.offsetWidth - this.width - 10) {
            this.right = this.gameScreen.offsetWidth - this.width - 10
        }
        //bottom
        if (this.top > this.gameScreen.offsetHeight - this.height - 100) {
            this.top = this.gameScreen.offsetHeight - this.height - 100
        }

        //create boolean value for movement (condition for scrolling background)

        //if (movementHappened) { return true, } else { return flase }

        this.updatePosition();

    }

    didCollide() {

    }

}

class Mushroom extends Components {
    constructor(gameScreen, width, height, imgScr) {

        const randomTop = Math.floor(Math.random() * 400 + 150);
        const startRight = 0;

        super(gameScreen, randomTop, startRight, width, height, imgScr)
    }

    move() {
        this.right -= 2;

        this.updatePosition();
    }

}