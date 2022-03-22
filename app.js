import {
  createBoard,
  startButton,
  dotCount,
  squares,
  scoreTable,
} from "./board.js";
import { POWER_PELLET_TIME } from "./setup.js";
import { Pacman } from "./Pacman.js";
import { Ghost } from "./Ghost.js";
import { gameOver, pauseGame, pause } from "./utilities.js";

// Setup
createBoard();
let lastTime;
export let reqAnimationId;
export let gameWin = false;
let score = 0;
let dotsLeft = dotCount;
export const addScoreEatDot = () => (score += 10);
export const addScoreEatPowerPellet = () => (score += 50);
export const addScoreEatGhost = () => (score += 100);
export const reduceDots = () => (dotsLeft -= 1);

let powerPelletActive = false;
export let powerPelletTimer = null;
export const powerPelletExpiring = () => {
  powerPelletTimer = setTimeout(
    () => (pacman.powerPellet = false),
    POWER_PELLET_TIME
  );
};

export const pacman = new Pacman(20, 657);

export const ghosts = [
  new Ghost(13, 347, "blinky"),
  new Ghost(11, 376, "inky"),
  new Ghost(9, 405, "pinky"),
  new Ghost(8, 434, "clyde"),
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
    pacman.movePacman();
    pacman.checkCollision(ghosts, reqAnimationId);
    ghosts.forEach((ghost) => ghost.moveGhost());
    pacman.checkCollision(ghosts, reqAnimationId);
    pacman.eatDot();
    pacman.eatPowerPellet();

    if (pacman.powerPellet) {
      ghosts.forEach((ghost) =>
        squares[ghost.position].classList.add("scared")
      );
    }
    if (dotsLeft === 0) {
      gameWin = true;
      gameOver(pacman, reqAnimationId);
    }
    scoreTable.textContent = String(score);
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
  score = 0;
  lastTime = null;
  powerPelletActive = false;
  powerPelletTimer = null;
  gameWin = false;
  reqAnimationId = null;
  pacman.setupPacman();
  ghosts.forEach((ghost) => {
    ghost.setupGhost();
  });
  startButton.classList.add("hide");
  window.requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => pacman.handleKeyInput(e));
document.addEventListener("keydown", (ev) => pauseGame(ev));

startButton.addEventListener("click", startGame);

// TODO the speed of pac-man varies when changing direction
