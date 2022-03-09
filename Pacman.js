import { WIDTH } from './setup.js';
import { squares } from './board.js';

class Pacman {
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
    squares[this.position].classList.add('pac-man');
  }

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
      if (this.checkObstruction(this.keyDirection)) {
        squares[this.position].classList.remove('pac-man');
        squares[this.position].style.transform = `rotate(0deg)`;
        this.changePositionDirection(this.keyDirection, this.rotation);
        squares[this.position].classList.add('pac-man');
        squares[this.position].style.transform = `rotate(${this.rotation}deg)`;
      }
    }
  }

  handleKeyInput(e) {
    // prevent the screen from moving up and down with the default key actions
    e.preventDefault();
    // clear pac-man and div rotation from current position
    squares[this.position].classList.remove('pac-man');
    squares[this.position].style.transform = `rotate(0deg)`;
    if (!e.repeat) {
      switch (e.code) {
        case 'ArrowLeft':
          this.keyDirection = -1;
          this.rotation = 180;
          if (this.checkObstruction()) {
            this.changePositionDirection();
          }
          break;
        case 'ArrowUp':
          this.keyDirection = -WIDTH;
          this.rotation = 270;
          if (this.checkObstruction()) {
            this.changePositionDirection();
          }
          break;
        case 'ArrowRight':
          this.keyDirection = +1;
          this.rotation = 0;
          if (this.checkObstruction()) {
            this.changePositionDirection();
          }
          break;
        case 'ArrowDown':
          this.keyDirection = +WIDTH;
          this.rotation = 90;
          if (this.checkObstruction()) {
            this.changePositionDirection();
          }
          break;
      }
      squares[this.position].classList.add('pac-man');
      squares[this.position].style.transform = `rotate(${this.rotation}deg)`;
    }
  }

  checkObstruction() {
    return (
      !squares[this.position + this.keyDirection].classList.contains('wall') &&
      !squares[this.position + this.keyDirection].classList.contains(
        'ghost-lair'
      )
    );
  }

  changePositionDirection() {
    this.position += this.keyDirection;
    this.direction = this.position + this.keyDirection;
  }
}
export default Pacman;
