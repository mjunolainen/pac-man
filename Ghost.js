import { WIDTH } from './setup.js';

class Ghost {
  constructor(speed = 2, startPosition, name) {
    this.name = name;
    this.startPosition = startPosition;
    this.position = startPosition;
    this.direction = 38;
    this.speed = speed;
    this.timer = NaN;
    this.isScared = false;
  }
}
export default Ghost;
