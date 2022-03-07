import { WIDTH } from './setup.js';
import { createBoard } from './board.js';
import Pacman from './Pacman.js';
import Ghost from './Ghost.js';
import ghost from './Ghost.js';

// Setup
let score = 0;
let timer = null;

const gameGrid = document.querySelector('#game-grid');
const scoreTable = document.querySelector('#score-board');
const startButton = document.querySelector('#start-button');
const squares = [];

// Create game board
createBoard(gameGrid, squares);

function gameLoop(pacman, ghosts) {
  ghosts.forEach(ghost => moveGhosts(ghost, squares));
  function moveGhosts(ghost, squares) {
    const directions = [-1, +1, -WIDTH, +WIDTH];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    if (
      !squares[ghost.position + direction].classList.contains('ghost') &&
      !squares[ghost.position + direction].classList.contains('wall')
    ) {
      ghost.startPosition = ghost.position;
      squares[ghost.position].classList.remove(
        'ghost',
        'scared-ghost',
        ghost.name
      );
      ghost.position += direction;
      ghost.direction = ghost.startPosition - ghost.position;
      squares[ghost.position].classList.add('ghost', ghost.name);
    }
  }
}

function startGame() {
  score = 0;
  const pacman = new Pacman(2, 657);
  squares[pacman.position].classList.add('pac-man');
  startButton.classList.add('hide');
  const ghosts = [
    new Ghost(2, 347, 'blinky'),
    new Ghost(3, 376, 'inky'),
    new Ghost(4, 405, 'pinky'),
    new Ghost(5, 434, 'clyde'),
  ];
  document.addEventListener('keyup', e => pacman.movePacman(e, squares));
  timer = setInterval(() => gameLoop(pacman, ghosts), 80);
}
startButton.addEventListener('click', startGame);
