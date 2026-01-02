type Board = number[][];

const SIZE = 9;
const BOX_SIZE = 3;

/**
 * Create empty 9x9 board
 */
function createEmptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

/**
 * Shuffle array (Fisher–Yates)
 */
function shuffle(nums: number[]): number[] {
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  return nums;
}

/**
 * Check if num can be placed at board[row][col]
 */
function isValid(board: Board, row: number, col: number, num: number): boolean {
  // Row & Column
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }

  // 3x3 Box
  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
  const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;

  for (let r = 0; r < BOX_SIZE; r++) {
    for (let c = 0; c < BOX_SIZE; c++) {
      if (board[boxRow + r][boxCol + c] === num) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Backtracking Sudoku Generator
 */
function fillBoard(board: Board): boolean {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (const num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;

            if (fillBoard(board)) {
              return true;
            }

            board[row][col] = 0; // backtrack
          }
        }
        return false;
      }
    }
  }
  return true;
}


const board = createEmptyBoard();
fillBoard(board);
console.table(board);
