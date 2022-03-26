import { gameGrid, startButton } from "./board.js";
import { game } from "./app.js";
let frame = 0;
let startTime = Date.now();

export function pauseGame(ev) {
  if (ev.code === "Space") {
    game.pause = !game.pause;
  }
  if (!game.pause && !game.gameOverBool && game.gameStarted) {
    startButton.classList.add("hide");
  }
}

export function gameOver(pacman, frameId) {
  game.gameOverBool = true;
  window.cancelAnimationFrame(frameId);
  showGameStatus(game.gameWin);
  startButton.classList.remove("hide");
  startButton.textContent = "New game?";
  startButton.addEventListener(
    "click",
    window.location.reload.bind(window.location)
  );
}

export function showGameStatus(gameWin) {
  const div = document.createElement("div");
  div.classList.add("game-status");
  div.innerHTML = `${gameWin ? `YOU WON!` : `GAME OVER!`}`;
  gameGrid.appendChild(div);
}

export function fpsCounter() {
  let time = Date.now();
  frame++;
  if (time - startTime > 1000) {
    console.log((frame / ((time - startTime) / 1000)).toFixed(1));
    startTime = time;
    frame = 0;
  }
  window.requestAnimationFrame(fpsCounter);
}
