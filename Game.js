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
    this.pause = false;
    this.gameOverBool = false;
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
    for (const square of squares) {
      if (square.classList.contains("pac-man")) {
        square.classList.remove("pac-man");
        square.style.transform = `rotate(0deg)`;
      }
      if (square.classList.contains("ghost")) {
        square.classList.remove(
          "ghost",
          "scared",
          "blinky",
          "inky",
          "pinky",
          "clyde"
        );
      }
    }
  }
}
