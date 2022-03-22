import { gameGrid, startButton } from "./board.js";
import { game } from "./app.js";
export let gameOverBool = false;
export let pause = false;

export function pauseGame(ev) {
  if (ev.code === "Space") {
    pause = !pause;
  }
  if (!pause && !gameOverBool) {
    startButton.classList.add("hide");
  }
}

export function gameOver(pacman, frameId) {
  gameOverBool = true;
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
