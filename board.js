import { LAYOUT } from "./setup.js";

export const gameGrid = document.querySelector("#game-grid");
export const scoreTable = document.querySelector("#score-board");
export const startButton = document.querySelector("#start-button");
export const squares = [];

export function createBoard() {
  for (let i = 0; i < LAYOUT.length; i++) {
    const square = document.createElement("div");
    gameGrid.appendChild(square);
    squares.push(square);

    switch (LAYOUT[i]) {
      case 1:
        squares[i].classList.add("wall");
        break;
      case 2:
        squares[i].classList.add("dot");
        break;
      case 7:
        squares[i].classList.add("power-pellet");
        break;
      case 9:
        squares[i].classList.add("ghost-lair");
        break;
    }
  }
}

export function countDots() {
  let dotCount = 0;
  for (const square of squares) {
    if (square.classList.contains("dot")) dotCount++;
  }
  return dotCount;
}
