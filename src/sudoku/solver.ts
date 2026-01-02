import { Board } from "./types";

const SIZE = 9;
const BOX = 3;

function isValid(board: Board, row: number, col: number, num: number): boolean {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }

  const br = Math.floor(row / BOX) * BOX;
  const bc = Math.floor(col / BOX) * BOX;

  for (let r = 0; r < BOX; r++) {
    for (let c = 0; c < BOX; c++) {
      if (board[br + r][bc + c] === num) return false;
    }
  }

  return true;
}

export function countSolutions(board: Board, limit = 2): number {
  let count = 0;

  function solve(): void {
    if (count >= limit) return;

    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === null) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              solve();
              board[row][col] = null;
            }
          }
          return;
        }
      }
    }
    count++;
  }

  solve();
  return count;
}