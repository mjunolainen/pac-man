import { startButton, squares, scoreTable } from "./board.js";
import { gameOver, pauseGame, pause } from "./utilities.js";
import { Game } from "./Game.js";

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

  if (!pause) {
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
      gameOver(pacman, game.reqAnimationId);
    }

    scoreTable.textContent = String(game.score);
  } else {
    startButton.textContent = "New game?";
    startButton.classList.remove("hide");
    startButton.addEventListener(
      "click",
      window.location.reload.bind(window.location)
    );
  }
}

function startGame() {
  pacman.setupPacman();
  ghosts.forEach((ghost) => {
    ghost.setupGhost();
  });
  startButton.classList.add("hide");
  window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keyup", (e) => pacman.handleKeyInput(e));
document.addEventListener("keyup", (ev) => pauseGame(ev));

startButton.addEventListener("click", startGame);

// FPS meter
let startTime = Date.now();
let frame = 0;

function tick() {
  let time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    console.log((frame / ((time - startTime) / 1000)).toFixed(1));
    startTime = time;
    frame = 0;
  }
  window.requestAnimationFrame(tick);
}
tick();
