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
import { checkCollision, gameOver } from './utilities.js';

// Setup
export let score = 0;
export const addScoreEatGhost = () => (score += 100);
let lastTime;
let powerPelletActive = false;
let powerPelletTimer = null;
export let gameWin = false;
let reqAnimationId;
export let pause = false;
// Create game board, pac-man and ghosts
createBoard();
let dotsLeft = dotCount;
export const pacman = new Pacman(20, 657);
export const ghosts = [
  new Ghost(13, 347, 'blinky'),
  new Ghost(11, 376, 'inky'),
  new Ghost(9, 405, 'pinky'),
  new Ghost(8, 434, 'clyde'),
];

// Game loop
export function gameLoop(currentTime) {
  if (lastTime === null) {
    lastTime = currentTime;
    window.requestAnimationFrame(gameLoop);
    return;
  }
  lastTime = currentTime;
  reqAnimationId = requestAnimationFrame(gameLoop);

  if (!pause) {
    // Move Pac-man
    pacman.movePacman();
    // Check collision
    checkCollision(pacman, ghosts, reqAnimationId);
    // Move ghosts
    ghosts.forEach(ghost => ghost.moveGhost());
    // Check collision
    checkCollision(pacman, ghosts);
    // Check if pac-man eats a dot
    if (squares[pacman.position].classList.contains('dot')) {
      squares[pacman.position].classList.remove('dot');
      dotsLeft--;
      score += 10;
    }
    // Check if pac-ma eats a power-pellet
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
    // Change ghost scare mode
    if (pacman.powerPellet) {
      ghosts.forEach(ghost => squares[ghost.position].classList.add('scared'));
    }
    if (dotsLeft === 0) {
      gameWin = true;
      gameOver(pacman, reqAnimationId);
    }
    // Update score
    scoreTable.textContent = String(score);
  } else {
    startButton.textContent = 'New game?';
    startButton.classList.remove('hide');
    startButton.addEventListener(
      'click',
      window.location.reload.bind(window.location)
    );
  }
}

function startGame() {
  score = 0;
  lastTime = null;
  powerPelletActive = false;
  powerPelletTimer = null;
  gameWin = false;
  pause = false;
  reqAnimationId = null;
  pacman.setupPacman();
  ghosts.forEach(ghost => {
    ghost.setupGhost();
  });
  startButton.classList.add('hide');
  document.addEventListener('keydown', e => pacman.handleKeyInput(e));
  document.addEventListener('keydown', ev => {
    if (ev.code === 'Space') {
      pause = !pause;
    }
    if (!pause) {
      startButton.classList.add('hide');
    }
  });

  window.requestAnimationFrame(gameLoop);
}
startButton.addEventListener('click', startGame);

//TODO new Game class
//TODO game over disable key input
// TODO the speed of pac-man varies when changing direction
