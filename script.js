window.onload = function () {
    const startButton = document.querySelector("start-btn")
    const restartButton = document.querySelector("restart-btn")

    startButton.addEventListener('click', function () {
        startGame()
    });

    function startGame() {
        console.log("start game");
        game = new Game();
        game.start();
    }

    function handleKeyDown(event) {
        const key = event.key;
        const possibleKeyStrokes = [
            "ArrowLeft",
            "ArrowUp", 
            "ArrowRight", 
            "ArrowDown"
        ]; 



    }


}