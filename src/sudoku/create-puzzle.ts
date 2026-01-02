import { Board, Difficulty } from "./types";
import { DIFFICULTY_CLUES } from "./difficulty.config";
import { shuffle, copyBoard } from "./utils";
import { countSolutions } from "./solver";

export function createPuzzle(
  fullBoard: Board,
  difficulty: Difficulty
): Board {
  const board = copyBoard(fullBoard);
  const minClues = DIFFICULTY_CLUES[difficulty];

  let clues = 81;
  const cells = shuffle([...Array(81).keys()]);

  for (const idx of cells) {
    if (clues <= minClues) break;

    const r = Math.floor(idx / 9);
    const c = idx % 9;

    const backup = board[r][c];
    board[r][c] = null;

    if (countSolutions(copyBoard(board), 2) !== 1) {
      board[r][c] = backup;
    } else {
      clues--;
    }
  }

  return board;
}
