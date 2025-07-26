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
        this.remainingTime = 120;
        this.gameOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = Math.floor(1000 / 30);
        this.backgroundX = 0;
        this.edibleMushroomId = null;
        this.poisonMushroomId = null;
        //this.counter = 0; // only neccessary for different method for creating mushrooms
        this.timer = 0;
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

        this.setTimer();

        this.updateLivesDisplay();

        this.updateScoreDisplay();


        this.edibleMushroomId = setInterval(() => {
            this.generateEdibleMushroom()
        }, 5000);

        this.poisonMushroomId = setInterval(() => {
            this.generatePoisonMushroom()
        }, 3000);

    }


    setTimer() {
        this.timer = setInterval(() => {
            this.remainingTime -= 1;

            const minutes = Math.floor(this.remainingTime / 60).toString().padStart(2, "0");
            const seconds = (this.remainingTime % 60).toString().padStart(2, "0");
            const timeContainer = document.getElementById("time");
            timeContainer.innerText = `TIME ${minutes}:${seconds}`;


            if (this.remainingTime === 0) {
                clearInterval(timer);
                this.endGame();
            }
        }, 1000);
    }

    scrollBackground() {
        this.backgroundX -= 3;
        document.querySelector("#background").style.backgroundPositionX = `${this.backgroundX}px`
    }

    gameLoop() {
        this.counter++
        this.scrollBackground();

        this.update();

        if (this.gameOver === true) {
            clearInterval(this.gameIntervalId);
            clearInterval(this.edibleMushroomId);
            clearInterval(this.poisonMushroomId);
        }

        //alternative way to create mushrooms at different intervals but I chose setInterval in start()
        //  if (this.counter % 100 === 0) {
        //     this.generateEdibleMushroom()
        // }
        // if (this.counter % 120 === 0) {
        //   this.generatePoisonMushroom()
        // }
        //console.log(this.edibleMushrooms)
    }

    generateEdibleMushroom() {
        const boletus = new Mushroom(this.gameScreen, "images/boletus.png")

        this.edibleMushrooms.push(boletus);


    }

    generatePoisonMushroom() {
        const flyAgaric = new Mushroom(this.gameScreen, "images/fly_agaric.png");

        this.poisonousMushrooms.push(flyAgaric);
    }

    updateLivesDisplay() {
        const livesContainer = document.querySelector("#lives");
        livesContainer.innerHTML = "LIVES ";

        for (let i = 0; i < this.lives; i++) {
            const heart = document.createElement("img");
            heart.src = "images/green_heart_freigestellt.jpg"
            heart.alt = "Heart";
            heart.width = 30;
            heart.hight = 30;
            livesContainer.appendChild(heart);

        }
    }

    updateScoreDisplay() {
        document.querySelector("#score").innerHTML = `SCORE ${this.score}`;
    }

    update() {
        this.player.move();

        //move mushrooms, check collision, remove, count score and lives
        for (let i = 0; i < this.edibleMushrooms.length; i++) {
            let boletus = this.edibleMushrooms[i];
            console.log(boletus.right)
            boletus.move();

            if (this.player.didCollide(boletus)) {
                this.score++;
                this.updateScoreDisplay();

                boletus.element.remove();
                this.edibleMushrooms.splice(i, 1);
                i--;
            } else if (boletus.right > this.right) {
                boletus.element.remove();
                this.edibleMushrooms.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < this.poisonousMushrooms.length; i++) {
            let flyAgaric = this.poisonousMushrooms[i];
            flyAgaric.move();

            if (this.player.didCollide(flyAgaric)) {
                this.lives--;
                this.updateLivesDisplay();
                flyAgaric.element.remove();
                this.poisonousMushrooms.splice(i, 1);
                i--;
            } else if (flyAgaric.right > this.right) {
                flyAgaric.element.remove();
                this.poisonousMushrooms.splice(i, 1);
                i--;
            }
        }

        if (this.lives === 0 || this.score === 10 || this.remainingTime === 0) {
            this.endGame();
        }

    }

    endGame() {
        this.gameContainer.style.display = "none";
        this.endScreen.style.display = "block";


        if (this.lives === 0) {
            document.querySelector("#final-message").innerText = "Be careful, you picked too many poisonous mushrooms! Try again!"
            document.body.style.backgroundImage = "url ('images/toadstool-background.jpg')"; 
        } else if (this.remainingTime === 0) {
            document.querySelector("#final-message").innerText = `You had a realxing stroll and picked ${this.score} mushrooms! Want to try again for some more?`;
        } else {
            document.querySelector("#final-message").innerText = `Congratulations! Your basket is full of yellow boletus. You can cook yourself a delicious mushroom dish!`
        }

        //show score

    }
}