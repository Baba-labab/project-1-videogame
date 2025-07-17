class Game {
    constructor() {
        this.startScreen = document.querySelector("#start-screen");
        this.gameContainer = document.querySelector("#game-container")
        this.gameScreen = document.querySelector("#game-screen");
        this.endScreen = document.querySelector("#end-screen");
        this.player = null; 
        this.height = 600;
        this.width = 1000;
        this.edibleMushrooms = [];
        this.poisonousMushrooms = [];
        this.score = 0;
        this.lives = 5;
        this.gameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.floor(1000 / 60);
        this.backgroundX = 0;

    }

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.position = "relative";
        this.gameScreen.style.overflow = "hidden";

        this.startScreen.style.display = "none";
        this.gameContainer.style.display = "flex";

        this.gameIntervalId = setInterval(() => {
            this.gameLoop()
        }, this.gameLoopFrequency);

    }

    scrollBackground() {
        this.backgroundX -= 2;
        document.querySelector("#background").style.backgroundPositionX = `${this.backgroundX}px`
    }

    gameLoop() {

        this.scrollBackground();

        this.update();

        if (this.gameOver === true) {
            clearInterval(this.gameIntervalId);
        }

    }

    update() {

        this.player.move(); 

         //randomly generate new obstacle if no other obstacle is on sceen
        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }


    }

    endGame() {
        this.gameContainer.style.display = "none"; 
        this.endScreen.style.display = "block"; 

    }
}