import {
  createBoard,
  startButton,
  dotCount,
  squares,
  scoreTable,
} from './board.js';
import { POWER_PELLET_TIME } from './setup.js';
import Pacman from './Pacman.js';
import Ghost from './Ghost.js';
import { checkCollision, gameWin } from './utilities.js';

// Setup
let score = 0;
let lastTime;
let powerPelletActive = false;
let powerPelletTimer = null;
let dotsLeft = dotCount;
// Create game board, pac-man and ghosts
createBoard();
export const pacman = new Pacman(20, 657);
const ghosts = [
  new Ghost(13, 347, 'blinky'),
  new Ghost(11, 376, 'inky'),
  new Ghost(9, 405, 'pinky'),
  new Ghost(8, 434, 'clyde'),
];

export function gameLoop(currentTime) {
  if (lastTime === null) {
    lastTime = currentTime;
    window.requestAnimationFrame(gameLoop);
    return;
  }
  //const delta = currentTime - lastTime; Is this needed?
  // move pac-man
  pacman.movePacman();
  // check collision
  checkCollision(pacman, ghosts);
  // move ghost
  ghosts.forEach(ghost => ghost.moveGhost());
  // check collision
  checkCollision(pacman, ghosts);
  // check if pac-man eats a dot
  if (squares[pacman.position].classList.contains('dot')) {
    squares[pacman.position].classList.remove('dot');
    dotsLeft--;
    score += 10;
  }
  // check if pac-ma eats a power-pellet
  if (squares[pacman.position].classList.contains('power-pellet')) {
    squares[pacman.position].classList.remove('power-pellet');
    pacman.powerPellet = true;
    score += 50;

    clearTimeout(powerPelletTimer);
    powerPelletTimer = setTimeout(
      () => (pacman.powerPellet = false),
      POWER_PELLET_TIME
    );
  }

  // Change ghost scare mode depending on power pill
  if (pacman.powerPellet) {
    ghosts.forEach(ghost => squares[ghost.position].classList.add('scared'));
  }

  scoreTable.textContent = String(score);
  lastTime = currentTime;
  requestAnimationFrame(gameLoop);
}

function startGame() {
  //gameWin = false;
  powerPelletActive = false;
  score = 0;
  pacman.setupPacman();
  ghosts.forEach(ghost => {
    ghost.setupGhost();
  });
  startButton.classList.add('hide');
  document.addEventListener('keydown', e => pacman.handleKeyInput(e));
  window.requestAnimationFrame(gameLoop);
}
startButton.addEventListener('click', startGame, { once: true });

// TODO check collision
// TODO check winner / game over
// TODO show game status
// TODO check requirements
