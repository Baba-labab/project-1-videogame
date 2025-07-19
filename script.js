window.onload = function () {
  const startButton = document.querySelector("#start-btn")
  const restartButton = document.querySelector("#restart-btn")


  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();
  }

  startButton.addEventListener('click', function () {
    startGame()
  });



  function handleKeyDown(event) {
    const key = event.key;
    const possibleKeyStrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown"
    ];
    //check if the pressed key is in the possibleKeyStrokes array: 
    if (possibleKeyStrokes.includes(key)) {
      event.preventDefault();

      //update player's directionX and Y based on key pressed: 
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = +2;
          break;
        case "ArrowUp":
          game.player.directionY = -2;
          break;
        case "ArrowRight":
          game.player.directionX = -2;
          break;
        case "ArrowDown":
          game.player.directionY = 2;
          break;
      }
    }
  }

  function handleKeyUp(e) {
    switch (e.key) {
      case "ArrowLeft":
        game.player.directionX = 0;
        break;
      case "ArrowRight":
        game.player.directionX = 0;
        break;
      case "ArrowUp":
        game.player.directionY = 0;
      case "ArrowDown":
        game.player.directionY = 0;
        break;
    }
  }

  //add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);


  restartButton.addEventListener("click", function () {
    restartGame();
  });

  function restartGame() {
    location.reload();
  }
};