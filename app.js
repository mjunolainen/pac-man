import { LAYOUT, WIDTH, HEIGHT } from './setup.js';
import Pacman from './Pacman.js';
import Ghost from './Ghost.js';
// DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
// without waiting for stylesheets, images, and sub frames to finish loading.
document.addEventListener('DOMContentLoaded', () => {
  // Setup
  let score = 0;
  let timer = null;

  const gameGrid = document.querySelector('#game-grid');
  const scoreTable = document.querySelector('#score-board');
  const startButton = document.querySelector('#start-button');

  const squares = [];

  function createBoard() {
    for (let i = 0; i < LAYOUT.length; i++) {
      const square = document.createElement('div');
      gameGrid.appendChild(square);
      squares.push(square);

      switch (LAYOUT[i]) {
        case 1:
          squares[i].classList.add('wall');
          break;
        case 2:
          squares[i].classList.add('dot');
          break;
        case 7:
          squares[i].classList.add('power-pellet');
          break;
        case 9:
          squares[i].classList.add('ghost-lair');
          break;
      }
    }
  }
  createBoard();

  // Game-loop --> startGame sets it to 80ms interval
  function gameLoop(pacman, ghosts) {
    //move pacman
    function movePacmanGameLoop(pacman) {}
    //check collision pac-man and ghosts
    //place ghosts on board
    ghosts.forEach(ghost => {
      squares[ghost.startPosition].classList.add('ghost');
      squares[ghost.startPosition].classList.add(ghost.name);
    });
    // move ghosts on board

    // check collision pac-man and ghosts
    //check if pac-man eats a dot
    //check if pac-man eats a power-pellet
    //change ghost scare mode
    // check if all dots have been eaten --> winner
    // add score to the scoreboard
  }

  function startGame() {
    score = 0;
    //starting position of pac-man
    const pacman = new Pacman(2, 657);
    squares[pacman.position].classList.add('pac-man');
    startButton.classList.add('hide');
    // Make ghosts
    const ghosts = [
      new Ghost(2, 347, 'blinky'),
      new Ghost(3, 376, 'inky'),
      new Ghost(4, 405, 'pinky'),
      new Ghost(5, 434, 'clyde'),
    ];
    document.addEventListener('keyup', e => pacman.movePacman(e, squares));
    //timer = setInterval(() => gameLoop(pacman, ghosts), 80);
  }
  // Start the game by pressing the start button
  startButton.addEventListener('click', startGame);

  //FUNCTIONS

  // document ending
});
