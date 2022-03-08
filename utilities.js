import { pacman, gameLoop } from './app.js';
import { gameGrid, startButton } from './board.js';
import ghost from './Ghost.js';
export let gameWin = false;

export function gameOver(pacman) {
  document.removeEventListener('keydown', e => pacman.handleKeyInput(e));
  showGameStatus(gameWin);
  startButton.classList.remove('hide');
  window.cancelAnimationFrame(gameLoop);
}

export function showGameStatus(gameWin) {
  const div = document.createElement('div');
  div.classList.add('game-status');
  div.innerHTML = `${gameWin ? `YOU WON!` : `GAME OVER!`}`;
  gameGrid.appendChild(div);
}

export function checkCollision(pacman, ghosts) {
  const collision = ghosts.find(ghost => pacman.position === ghost.position);

  if (collision) {
  }
}
