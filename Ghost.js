import { WIDTH } from "./setup.js";
import { squares } from "./board.js";
import { fps, gameSpeed } from "./utilities.js";

export class Ghost {
  constructor(speed = 2, startPosition, name) {
    this.name = name;
    this.startPosition = startPosition;
    this.previousPosition = startPosition;
    this.position = startPosition;
    this.direction = -WIDTH;
    this.speed = speed;
    this.timer = 0;
  }

  setupGhost() {
    squares[this.position].classList.add("ghost", `${this.name}`);
  }

  // Determine if the ghost should move based on the input speed
  shouldMove() {
    if (this.timer >= fps) {
      this.timer = 0;
      return true;
    }
    this.timer+= fps/gameSpeed;
    return false;
  }

  moveGhost() {
    if (this.shouldMove()) {
      // check if the current moving direction has no obstructions
      if (
        !squares[this.position + this.direction].classList.contains("ghost") &&
        !squares[this.position + this.direction].classList.contains("wall")
      ) {
        this.previousPosition = this.position;
        squares[this.position].classList.remove(
          "ghost",
          "scared",
          `${this.name}`
        );
        this.position += this.direction;
        squares[this.position].classList.add("ghost", `${this.name}`);
        return;
      }
      // if current moving direction has obstructions, get a new random direction
      const directions = [-1, -WIDTH, +1, +WIDTH];
      let direction = directions[Math.floor(Math.random() * directions.length)];
      if (
        !squares[this.position + direction].classList.contains("ghost") &&
        !squares[this.position + direction].classList.contains("wall")
      ) {
        this.previousPosition = this.position;
        squares[this.position].classList.remove(
          "ghost",
          "scared",
          `${this.name}`
        );
        this.position += direction;
        this.direction = this.position - this.previousPosition;
        squares[this.position].classList.add("ghost", `${this.name}`);
      }
    }
  }
}
