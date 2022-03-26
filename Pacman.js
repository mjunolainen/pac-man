import { WIDTH } from "./setup.js";
import { squares } from "./board.js";
import { gameOver } from "./utilities.js";
import { game } from "./app.js";

export class Pacman {
  constructor(speed, startPosition) {
    this.position = startPosition;
    this.speed = speed;
    this.direction = null;
    this.keyDirection = null;
    this.timer = 0;
    this.rotation = 0;
    this.powerPellet = false;
  }

  setupPacman() {
    squares[this.position].classList.add("pac-man");
  }

  // Determine if a key has been pressed at the beginning of the game or
  // if pac-man should move based on the input speed
  shouldMove() {
    if (!this.direction) return;
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  movePacman() {
    if (this.shouldMove()) {
      if (this.checkObstruction()) {
        squares[this.position].classList.remove("pac-man");
        squares[this.position].style.transform = `rotate(0deg)`;
        this.changePositionDirection(this.keyDirection, this.rotation);
        squares[this.position].classList.add("pac-man");
        squares[this.position].style.transform = `rotate(${this.rotation}deg)`;
      }
    }
  }

  handleKeyInput(e) {
    if (!game.pause && !game.gameOverBool) {
      squares[this.position].classList.remove("pac-man");
      squares[this.position].style.transform = `rotate(0deg)`;
      if (!e.repeat) {
        switch (e.code) {
          case "ArrowLeft":
            if (this.checkKeyPressObstruction(-1)) {
              this.keyDirection = -1;
              this.rotation = 180;
              if (this.checkObstruction()) {
                this.direction = this.position + this.keyDirection;
              }
            }
            break;
          case "ArrowUp":
            if (this.checkKeyPressObstruction(-WIDTH)) {
              this.keyDirection = -WIDTH;
              this.rotation = 270;
              if (this.checkObstruction()) {
                this.direction = this.position + this.keyDirection;
              }
            }
            break;
          case "ArrowRight":
            if (this.checkKeyPressObstruction(+1)) {
              this.keyDirection = +1;
              this.rotation = 0;
              if (this.checkObstruction()) {
                this.direction = this.position + this.keyDirection;
              }
            }
            break;
          case "ArrowDown":
            if (this.checkKeyPressObstruction(+WIDTH)) {
              this.keyDirection = +WIDTH;
              this.rotation = 90;
              if (this.checkObstruction()) {
                this.direction = this.position + this.keyDirection;
              }
            }
            break;
        }
        squares[this.position].classList.add("pac-man");
        squares[this.position].style.transform = `rotate(${this.rotation}deg)`;
      }
    }
  }

  checkObstruction() {
    return (
      !squares[this.position + this.keyDirection].classList.contains("wall") &&
      !squares[this.position + this.keyDirection].classList.contains(
        "ghost-lair"
      )
    );
  }
  checkKeyPressObstruction(keyPressDirection) {
    return (
      !squares[this.position + keyPressDirection].classList.contains("wall") &&
      !squares[this.position + keyPressDirection].classList.contains(
        "ghost-lair"
      )
    );
  }

  changePositionDirection() {
    this.position += this.keyDirection;
    this.direction = this.position + this.keyDirection;
  }

  checkCollision(ghosts, frameId) {
    const collision = ghosts.find((ghost) => this.position === ghost.position);
    if (collision) {
      if (this.powerPellet) {
        squares[collision.position].classList.remove(
          "ghost",
          "scared",
          `${collision.name}`
        );
        collision.position = collision.startPosition;
        game.score += 100;
      } else {
        squares[this.position].classList.remove("pac-man");
        squares[this.position].style.transform = `rotate(0deg)`;
        ghosts.forEach((ghost) => {
          squares[ghost.position].classList.remove(
            "ghost",
            "scared",
            `${ghost.name}`
          );
        });
        gameOver(this, frameId);
      }
    }
  }

  eatDot() {
    if (squares[this.position].classList.contains("dot")) {
      squares[this.position].classList.remove("dot");
      game.score += 10;
      game.dotCount -= 1;
    }
  }

  eatPowerPellet() {
    if (squares[this.position].classList.contains("power-pellet")) {
      squares[this.position].classList.remove("power-pellet");
      this.powerPellet = true;
      game.score += 50;
      clearTimeout(game.powerPelletTimer);
      game.powerPelletExpiring();
    }
  }
}
