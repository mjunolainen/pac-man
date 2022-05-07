import { startButton, squares, scoreTable } from "./board.js";
import { Game } from "./Game.js";
import {fpsCounter, pauseTimer, startTimer} from "./utilities.js";

// Game setup
export let game = new Game();
const pacman = game.pacman;
const ghosts = game.ghosts;

// Game loop
function gameLoop(currentTime) {
  if (game.lastTime === null) {
    game.lastTime = currentTime;
    window.requestAnimationFrame(gameLoop);
    return;
  }
  game.lastTime = currentTime;
  game.reqAnimationId = requestAnimationFrame(gameLoop);
  if (!game.pause) {
    // Collision check is here twice on purpose - once after moving pac-man and
    // once after moving the ghosts, because they move at different speeds.
    pacman.movePacman();
    pacman.checkCollision(ghosts, game.reqAnimationId);
    ghosts.forEach((ghost) => ghost.moveGhost());
    pacman.checkCollision(ghosts, game.reqAnimationId);

    // Handle the regular dot scoring and power pellets
    pacman.eatDot();
    pacman.eatPowerPellet();

    // If pac-man eats the power pellets the ghosts become "edible"
    if (pacman.powerPellet) {
      ghosts.forEach((ghost) =>
        squares[ghost.position].classList.add("scared")
      );
    }

    if (game.dotCount === 0) {
      game.gameWin = true;
      game.gameOver();
    }

    scoreTable.textContent = String(game.score);
  } else {
    pauseTimer()
    startButton.textContent = "New game?";
    startButton.classList.remove("hide");
    startButton.addEventListener(
      "click",
      window.location.reload.bind(window.location)
    );
  }
}

function startGame() {
  startTimer()
  game.gameStarted = true;
  pacman.setupPacman();
  ghosts.forEach((ghost) => {
    ghost.setupGhost();
  });
  startButton.classList.add("hide");
  window.requestAnimationFrame(gameLoop);
}
// First event listener prevents the page from moving up and down with the default keypress.
document.addEventListener("keydown", (keypress) => keypress.preventDefault());
document.addEventListener("keyup", (e) => pacman.handleKeyInput(e));
if (!game.gameStarted)
  document.addEventListener("keydown", (ev) => game.pauseGame(ev));

startButton.addEventListener("click", startGame);

// FPS meter
fpsCounter();
