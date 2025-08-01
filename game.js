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
            177,
            150,
            "sprite/Run (1).png"
        );
        this.height = 700;
        this.width = 1000;
        this.edibleMushrooms = [];
        this.poisonousMushrooms = [];
        this.score = 0;
        this.lives = 5;
        this.remainingTime = 90;
        this.gameOver = false;
        //this.gameIntervalId = null;
        //this.gameLoopFrequency = Math.floor(1000 / 30);
        this.backgroundX = 0;
        //this.edibleMushroomId = null;
        //this.poisonMushroomId = null;
        //this.edibleInterval = 5000;
        //this.poisonousInterval = 3000;
        this.counter = 0; // only neccessary for different method for creating mushrooms
        this.timer = 0;
        this.edibleRate = 100;
        this.poisonRate = 100;
        this.jumpingBobFrames = [
            "sprite/Jump (1).png",
            "sprite/Jump (2).png",
            "sprite/Jump (3).png",
            "sprite/Jump (4).png",
            "sprite/Jump (5).png",
            "sprite/Jump (6).png",
            "sprite/Jump (7).png",
            "sprite/Jump (8).png",
            "sprite/Jump (9).png",
            "sprite/Jump (10).png",
            "sprite/Jump (11).png",
            "sprite/Jump (12).png"
        ];
        this.animation = document.querySelector("#animation");
        this.currentBobFrame = 0;
        this.endAnimationInterval = null;
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.position = "relative";
        this.gameScreen.style.overflow = "hidden";

        this.startScreen.style.display = "none";
        this.gameContainer.style.display = "flex";

        //this.gameIntervalId = setInterval(() => {
        this.gameLoop()
        // }, this.gameLoopFrequency);

        this.setTimer();

        this.updateLivesDisplay();
        this.updateScoreDisplay();

        /*this.edibleMushroomId = setInterval(() => {
            this.generateEdibleMushroom()
        }, this.edibleInterval);*/

        //this.startEdibleInterval(this.edibleInterval); 

        /*this.poisonMushroomId = setInterval(() => {
            this.generatePoisonMushroom()
        }, this.poisonousInterval);*/
    }

    setTimer() {
        this.timer = setInterval(() => {
            this.remainingTime -= 1;

            const minutes = Math.floor(this.remainingTime / 60).toString().padStart(2, "0");
            const seconds = (this.remainingTime % 60).toString().padStart(2, "0");
            const timeContainer = document.getElementById("time");
            timeContainer.innerText = `TIME ${minutes}:${seconds}`;

            if (this.remainingTime === 0) {
                clearInterval(this.timer);
                this.endGame();
            }
        }, 1000);
    }

    scrollBackground() {
        this.backgroundX -= 3;
        document.querySelector("#background").style.backgroundPositionX = `${this.backgroundX}px`
    }

    /* startEdibleInterval(interval) {
         if(this.edibleMushroomId) clearInterval(this.edibleMushroomId); 
         this.edibleMushroomId = setInterval(() => {
             this.generateEdibleMushroom(); 
         }, interval); 
     }*/

    gameLoop() {
        if (this.gameOver) return;
        this.counter++
        this.scrollBackground();

        this.update();

        //alternative way to create mushrooms at different intervals 
        if (this.counter % this.edibleRate === 0) {
            this.generateEdibleMushroom()
        }
        if (this.counter % this.poisonRate === 0) {
            this.generatePoisonMushroom()
        }
        //console.log(this.edibleMushrooms)
        requestAnimationFrame(() => this.gameLoop())
    }

    updateDifficulty() {
        if (this.score === 5)
            this.poisonRate = 50;

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
            heart.src = "images/freepik__upload__80113.png"
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
            boletus.move();

            if (this.player.didCollide(boletus)) {
                this.score++;
                this.updateScoreDisplay();

                boletus.element.remove();
                this.edibleMushrooms.splice(i, 1);
                i--;

                let positiveSound = new Audio('sounds/cartoon-yay-kurz.mp3');
                positiveSound.volume = 0.4; 
                positiveSound.play();
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

                let negativeSound = new Audio("sounds/e-oh-91679.mp3");
                negativeSound.volume = 0.4; 
                negativeSound.play();

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

    startEndAnimation() {
        if (this.endAnimationInterval) return;

        this.endAnimationInterval = setInterval(() => {
            this.currentBobFrame = (this.currentBobFrame + 1) % this.jumpingBobFrames.length;
            this.animation.style.backgroundImage = `url("${this.jumpingBobFrames[this.currentBobFrame]}")`;
        }, 200);
    }

    stopEndAnimation() {
        clearInterval(this.endAnimationInterval);
        this.endAnimationInterval = null;
    }

    endGame() {
        this.gameOver = true;
        this.gameContainer.style.display = "none";
        this.endScreen.style.display = "flex";
        this.endScreen.style.backgroundImage = "url('images/background_endscreen.jpg')"

        //clearInterval(this.gameIntervalId);
        // clearInterval(this.edibleMushroomId);
        //clearInterval(this.poisonMushroomId);
        clearInterval(this.timer);

        const finalMessage = document.querySelector("#final-message");

        if (this.lives === 0) {
            finalMessage.innerHTML = "Be careful, you and Bob picked too many poisonous mushrooms!<br> Try again!";
            this.animation.style.backgroundImage = "url('sprite/Hurt (1).png')";

        } else if (this.remainingTime === 0) {
            finalMessage.innerHTML = `You and Bob had a relaxing stroll and picked ${this.score} mushrooms!<br> Want to try again for some more?`;
            this.animation.style.backgroundImage = "url('sprite/Slide (5).png')";

        } else {
            finalMessage.innerHTML = `Congratulations, you and Bob picked ${this.score} mushrooms!<br> He can cook a delicious mushroom dish now!`;
            this.currentBobFrame = 0;
            this.animation.style.backgroundImage = `url("${this.jumpingBobFrames[this.currentBobFrame]}")`;
            setTimeout(() => {
                this.startEndAnimation();
            }, 100);

        }

        window.mySound.pause();

        this.player.element.remove();
        this.edibleMushrooms.forEach(boletus => boletus.element.remove());
        this.poisonousMushrooms.forEach(flyAgaric => flyAgaric.element.remove());
    }
}