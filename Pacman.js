import { WIDTH, HEIGHT } from './setup.js';
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
        this.changePositionDirectionRotation(this.keyDirection, this.rotation);
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

    switch (e.key) {
      case 'ArrowLeft':
        this.keyDirection = -1;
        if (this.checkObstruction(this.keyDirection)) {
          this.changePositionDirectionRotation(this.keyDirection, 180);
        }
        break;
      case 'ArrowUp':
        this.keyDirection = -WIDTH;
        if (this.checkObstruction(this.keyDirection)) {
          this.changePositionDirectionRotation(this.keyDirection, 270);
        }
        break;
      case 'ArrowRight':
        this.keyDirection = +1;
        if (this.checkObstruction(this.keyDirection)) {
          this.changePositionDirectionRotation(this.keyDirection, 0);
        }
        break;
      case 'ArrowDown':
        this.keyDirection = +WIDTH;
        if (this.checkObstruction(this.keyDirection)) {
          this.changePositionDirectionRotation(this.keyDirection, 90);
        }
        break;
    }
    squares[this.position].classList.add('pac-man');
    squares[this.position].style.transform = `rotate(${this.rotation}deg)`;
  }

  checkObstruction(keyDirection) {
    return (
      !squares[this.position + keyDirection].classList.contains('wall') &&
      !squares[this.position + keyDirection].classList.contains('ghost-lair')
    );
  }

  changePositionDirectionRotation(keyDirection, rotation) {
    this.position += keyDirection;
    this.direction = this.position + keyDirection;
    this.rotation = rotation;
  }
}
export default Pacman;
