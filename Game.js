import { countDots, createBoard, squares, startButton } from "./board.js";
import { POWER_PELLET_TIME } from "./setup.js";
import { Pacman } from "./Pacman.js";
import { Ghost } from "./Ghost.js";

export class Game {
  constructor() {
    createBoard();
    this.lastTime = null;
    this.reqAnimationId = null;
    this.gameWin = false;
    this.gameStarted = false;
    this.score = 0;
    this.powerPelletTimer = null;
    this.dotCount = countDots();
    this.pacman = new Pacman(20, 657);
    this.ghosts = [
      new Ghost(12, 347, "blinky"),
      new Ghost(11, 376, "inky"),
      new Ghost(10, 405, "pinky"),
      new Ghost(9, 434, "clyde"),
    ];
  }

  powerPelletExpiring = () => {
    this.powerPelletTimer = setTimeout(
      () => (this.pacman.powerPellet = false),
      POWER_PELLET_TIME
    );
  };

  resetGame() {
    squares[this.pacman.position].classList.remove("pac-man");
    squares[this.pacman.position].style.transform = `rotate(0deg)`;

    this.ghosts.forEach((ghost) => {
      squares[ghost.position].classList.remove(
        "ghost",
        "scared",
        `${ghost.name}`
      );
    });
  }
}
