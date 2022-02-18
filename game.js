import { gameBoard, buildGameBoard } from './grid.js';

let lastRenderTime = 0;
buildGameBoard();

function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / FASTEST_SPEED) return;
  lastRenderTime = currentTime;
}
window.requestAnimationFrame(main);
