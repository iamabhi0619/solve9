import { Board } from "./types";
import { shuffle } from "./utils";

const SIZE = 9;
const BOX = 3;

function isValid(board: Board, row: number, col: number, num: number): boolean {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / BOX) * BOX;
  const boxCol = Math.floor(col / BOX) * BOX;

  for (let r = 0; r < BOX; r++) {
    for (let c = 0; c < BOX; c++) {
      if (board[boxRow + r][boxCol + c] === num) return false;
    }
  }

  return true;
}

function fillBoard(board: Board): boolean {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === null) {
        for (const num of shuffle([1,2,3,4,5,6,7,8,9])) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) return true;
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function generateFullBoard(): Board {
  const board: Board = Array.from({ length: 9 }, () => Array(9).fill(null));
  fillBoard(board);
  return board;
}
