import { countDots, createBoard, gameGrid, startButton } from "./board.js";
import { POWER_PELLET_TIME } from "./setup.js";
import { Pacman } from "./Pacman.js";
import { Ghost } from "./Ghost.js";
import {resetTimer, startTimer} from "./utilities.js";

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
    //this.pacman = new Pacman(20, 657);
    this.pacman = new Pacman(657);
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

  pauseGame(ev) {
    if (ev.code === "Space") {
      this.pause = !this.pause;
    }
    if (!this.pause && !this.gameOverBool && this.gameStarted) {
      startTimer()
      startButton.classList.add("hide");
    }
  }

  gameOver() {
    document.getElementById("lives").innerText = ''
    resetTimer()
    this.gameOverBool = true;
    window.cancelAnimationFrame(this.reqAnimationId);
    this.showGameStatus(this.gameWin);
    startButton.classList.remove("hide");
    startButton.textContent = "New game?";
    startButton.addEventListener(
      "click",
      window.location.reload.bind(window.location)
    );
  }

  showGameStatus() {
    const div = document.createElement("div");
    div.classList.add("game-status");
    div.innerHTML = `${this.gameWin ? `YOU WON!` : `GAME OVER!`}`;
    gameGrid.appendChild(div);
  }
}
