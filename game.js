import { gameBoard, buildGameBoard } from './grid.js';

const FASTEST_SPEED = 2;

let lastRenderTime = 0;
buildGameBoard();

function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / FASTEST_SPEED) return;
  lastRenderTime = currentTime;

  update();
  render();
}
window.requestAnimationFrame(main);

const pacMan = [{ x: 14, y: 24 }];

function update() {}

function render() {}
