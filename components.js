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
        this.element.style.zIndex = "5"; 
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
        if (this.top > this.gameScreen.offsetHeight - this.height - 60) {
            this.top = this.gameScreen.offsetHeight - this.height - 60
        }

        //create boolean value for movement (condition for scrolling background)

        //if (movementHappened) { return true, } else { return flase }

        this.updatePosition();

    }

    didCollide(mushroom) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = mushroom.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top 
        ) {
            console.log("Found one!");
            return true;
        } else {
            return false;
        }

    }
}



class Mushroom extends Components {
    constructor(gameScreen, imgScr) {
        super(gameScreen, Math.floor(Math.random() * 400 + 250), 0, 50, 50, imgScr)
        //this.randomTop = ;
        //this.startRight = 0;
    }

    move() {
        this.right += 3;

        this.updatePosition();
    }



}