import { WIDTH, HEIGHT } from './setup.js';
class Pacman {
  constructor(speed, startPosition) {
    this.position = startPosition;
    this.speed = speed;
    this.direction = null;
    this.timer = 0;
    this.powerPellet = false;
  }
  movePacman(e, squares) {
    squares[this.position].classList.remove('pac-man');
    switch (e.keyCode) {
      case 37: // ArrowLeft
        if (
          this.position % WIDTH !== 0 &&
          !squares[this.position - 1].classList.contains('wall') &&
          !squares[this.position - 1].classList.contains('ghost-lair')
        ) {
          this.position -= 1;
          this.direction = this.position - 1;
        }
        break;
      case 38: // ArrowUp
        if (
          this.position - WIDTH >= 0 &&
          !squares[this.position - WIDTH].classList.contains('wall') &&
          !squares[this.position - WIDTH].classList.contains('wall')
        ) {
          this.position -= WIDTH;
          this.direction = this.position - WIDTH;
        }
        break;
      case 39: // ArrowRight
        if (
          this.position % WIDTH < WIDTH - 1 &&
          !squares[this.position + 1].classList.contains('wall') &&
          !squares[this.position + 1].classList.contains('ghost-lair')
        ) {
          this.position += 1;
          this.direction = this.position + 1;
        }
        break;

      case 40: // ArrowDown
        if (
          this.position + WIDTH < WIDTH * HEIGHT &&
          !squares[this.position + WIDTH].classList.contains('wall') &&
          !squares[this.position + WIDTH].classList.contains('ghost-lair')
        ) {
          this.position += WIDTH;
          this.direction = this.position + WIDTH;
        }
        break;
    }
    squares[this.position].classList.add('pac-man');
    console.log(this.direction);
  }
}

export default Pacman;
