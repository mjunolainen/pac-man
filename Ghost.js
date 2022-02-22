class Ghost {
  constructor(speed = 2, startPosition, movement, name) {
    this.name = name;
    this.movement = movement;
    this.startPosition = startPosition;
    this.position = startPosition;
    this.direction = 39;
    this.speed = speed;
    this.timer = NaN;
    this.isScared = false;
  }
}
export default Ghost;
