import { addScoreEatGhost, gameWin } from './app.js';
import { gameGrid, squares, startButton } from './board.js';
import ghost from './Ghost.js';

export function gameOver(pacman, frameId) {
  // this doesn't work
  document.removeEventListener('keydown', e => pacman.handleKeyInput(e));
  window.cancelAnimationFrame(frameId);
  showGameStatus(gameWin);
  startButton.classList.remove('hide');
  startButton.textContent = 'New game?';
  startButton.addEventListener(
    'click',
    window.location.reload.bind(window.location)
  );
}

export function showGameStatus(gameWin) {
  const div = document.createElement('div');
  div.classList.add('game-status');
  div.innerHTML = `${gameWin ? `YOU WON!` : `GAME OVER!`}`;
  gameGrid.appendChild(div);
}

export function checkCollision(pacman, ghosts, frameId) {
  const collision = ghosts.find(ghost => pacman.position === ghost.position);
  if (collision) {
    if (pacman.powerPellet) {
      squares[collision.position].classList.remove(
        'ghost',
        'scared',
        `${collision.name}`
      );
      collision.position = collision.startPosition;
      addScoreEatGhost();
    } else {
      squares[pacman.position].classList.remove('pac-man');
      squares[pacman.position].style.transform = `rotate(0deg)`;
      ghosts.forEach(ghost => {
        squares[ghost.position].classList.remove(
          'ghost',
          'scared',
          `${ghost.name}`
        );
      });
      gameOver(pacman, frameId);
    }
  }
}
