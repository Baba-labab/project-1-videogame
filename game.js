class Game {
    constructor() {
        this.startScreen = document.querySelector("#start-screen");
        this.gameContainer = document.querySelector("#game-container")
        this.gameScreen = document.querySelector("#game-screen");
        this.endScreen = document.querySelector("#end-screen");
        this.player = new Player(
            this.gameScreen,
            400,
            900,
            100,
            150,
            "images/child.png"
        );
        this.height = 700;
        this.width = 1000;
        this.edibleMushrooms = [];
        this.poisonousMushrooms = [];
        this.score = 0;
        this.lives = 5;
        this.gameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.floor(1000 / 30);
        this.backgroundX = 0;
        this.edibleMushroomId = null;
        this.poisonMushroomId = null;
        this.counter = 0;
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

        //  setInterval(() => {
        //     this.generateEdibleMushroom()
        // }, 5000);

        // setInterval(() => {
        //     this.generatePoisonMushroom()
        // }, 3000);

    }

    scrollBackground() {
        this.backgroundX -= 1;
        document.querySelector("#background").style.backgroundPositionX = `${this.backgroundX}px`
    }

    gameLoop() {
        this.counter++
        this.scrollBackground(); 

        this.update();

        if (this.gameOver === true) {
            clearInterval(this.gameIntervalId);
        }
        if(this.counter % 100 === 0) {
            this.generateEdibleMushroom()
        }
        if(this.counter % 80 === 0) {
            this.generatePoisonMushroom()
        }
        console.log(this.edibleMushrooms)
    }

    generateEdibleMushroom() {
        const chanterelle = new Mushroom(this.gameScreen, 50, 50, "images/chanterelle.jpg");
        this.edibleMushrooms.push(chanterelle);
    }

    generatePoisonMushroom() {
        const flyAgaric = new Mushroom(this.gameScreen, 50, 50, "images/fly_agaric.png");

        this.poisonousMushrooms.push(flyAgaric);
    }

    update() {

        this.player.move();

        //move mushrooms
       

        //check collision

        //remove mushrooms that left screen or collided


    }

    endGame() {
        this.gameContainer.style.display = "none";
        this.endScreen.style.display = "block";



        //show score

    }
}