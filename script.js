// Ensure you have the correct import path for confetti.js
import { startConfetti, stopConfetti } from './confetti.js';

// 0 Empty Box
// 1 X
// 2 O
// 3 draw
let turn = document.querySelector("#container #first #turn");
let boxes = document.querySelectorAll("#container .elements div ");
let xScore = document.querySelector("#container #last #x span");
let oScore = document.querySelector("#container #last #o span");
let dScore = document.querySelector("#container #last #ties span");
let again = document.querySelector("#container #first #again");

let currentTurn = 0;
let state = Array.from({ length: 3 }, () => Array(3).fill(0));
let game = 1;

again.addEventListener("click", () => {
  state = Array.from({ length: 3 }, () => Array(3).fill(0));
  currentTurn = 0;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
  }
  turn.textContent = "X TURN";
  game = 1;
  stopConfetti(); // Stop confetti when the game is reset
});

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (game) {
      if (currentTurn === 1) {
        turn.textContent = "X TURN";
      } else {
        turn.textContent = "O TURN";
      }
      updateState(index);
      
      if (updateGame(checkWinner()) !== 0) {
        game = 0;
        return;
      }
      currentTurn = (currentTurn + 1) % 2;
    }
  });
});

function updateState(index) {
  let row = Math.floor(index / state[0].length);
  let col = index % state[0].length;
  if (currentTurn === 1) {
    if (state[row][col] === 0) {
      boxes[index].style.color = "rgb(242, 178, 55)";
      boxes[index].textContent = "O";
      state[row][col] = 2;
    }
  } else {
    if (state[row][col] === 0) {
      boxes[index].style.color = "rgb(47, 196, 194)";
      boxes[index].textContent = "X";
      state[row][col] = 1;
    }
  }
}

function checkWinner() {
  let rowPlayerO = 0;
  let rowPlayerX = 0;
  let colPlayerO = 0;
  let colPlayerX = 0;
  let diagonalO = 0;
  let diagonalX = 0;
  let revDiagonalO = 0;
  let revDiagonalX = 0;
  let draw = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (state[i][j] === 1) {
        rowPlayerX++;
        draw++;
        if (i === j) {
          diagonalX++;
        }
        if (2 - i === j) {
          revDiagonalX++;
        }
      } else if (state[i][j] === 2) {
        rowPlayerO++;
        draw++;
        if (i === j) {
          diagonalO++;
        }
        if (2 - i === j) {
          revDiagonalO++;
        }
      }
      if (state[j][i] === 1) {
        colPlayerX++;
      } else if (state[j][i] === 2) {
        colPlayerO++;
      }
    }

    if (rowPlayerO === 3 || colPlayerO === 3) return 2;
    if (rowPlayerX === 3 || colPlayerX === 3) return 1;
    rowPlayerO = rowPlayerX = colPlayerO = colPlayerX = 0;
  }

  if (diagonalO === 3 || revDiagonalO === 3) return 2;
  if (diagonalX === 3 || revDiagonalX === 3) return 1;
  if (draw === 9) return 3;

  return 0;
}

function updateGame(game) {
  if (game === 0) return 0;
  if (game === 1) {
    turn.textContent = "X Winner";
    xScore.textContent = Number(xScore.textContent) + 1;
    startConfetti(); // Start confetti for X winner
    return 1;
  }
  if (game === 2) {
    turn.textContent = "O Winner";
    oScore.textContent = Number(oScore.textContent) + 1;
    startConfetti(); // Start confetti for O winner
    return 2;
  }
  if (game === 3) {
    turn.textContent = "Draw";
    dScore.textContent = Number(dScore.textContent) + 1;
    return 3;
  }
}
