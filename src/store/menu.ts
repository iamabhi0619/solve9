import { createPuzzle } from "@/sudoku/create-puzzle";
import { generateFullBoard } from "@/sudoku/generate-full-board";
import { Board } from "@/sudoku/types";
import { create } from "zustand";
import { router } from "expo-router";

type Move = {
  row: number;
  col: number;
  oldValue: number | null;
  newValue: number | null;
  isNote?: boolean;
};

type GameStore = {
  level: "easy" | "medium" | "hard" | "expert" | null;
  setLevel: (level: "easy" | "medium" | "hard" | "expert") => void;
  oldGame: {
    grid: number[][];
    solvedGrid: number[][];
    size: number;
    level: "easy" | "medium" | "hard" | "expert";
    moves: number;
    timeElapsed: number;
  } | null;
  solution: Board | null;
  fixed: Board | null;
  board: Board | null;
  notes: Set<number>[][] | null;
  moves: number;
  history: Move[];
  mistakes: number;
  timeElapsed: number;
  isPaused: boolean;
  isGameOver: boolean;
  isGameWon: boolean;
  isPencilMode: boolean;
  startNewGame: () => void;
  handleInput: (row: number, col: number, value: number | null) => void;
  undo: () => void;
  erase: () => void;
  togglePencilMode: () => void;
  getHint: () => void;
  togglePause: () => void;
  incrementTime: () => void;
  checkWin: () => boolean;
  resetGame: () => void;
};

export const useMenuStore = create<GameStore>((set, get) => ({
  level: "medium",
  setLevel: (level) => set({ level }),
  oldGame: null,
  board: null,
  solution: null,
  fixed: null,
  notes: null,
  moves: 0,
  history: [],
  mistakes: 0,
  timeElapsed: 0,
  isPaused: false,
  isGameOver: false,
  isGameWon: false,
  isPencilMode: false,

  startNewGame: () => {
    const currentLevel = get().level;
    if (!currentLevel) {
      return;
    }
    const fullBoard = generateFullBoard();
    const puzzleBoard = createPuzzle(fullBoard, currentLevel);
    const notes = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => new Set<number>())
    );
    set({
      board: puzzleBoard,
      solution: fullBoard,
      fixed: puzzleBoard.map((row) => [...row]),
      notes,
      moves: 0,
      history: [],
      mistakes: 0,
      timeElapsed: 0,
      isPaused: false,
      isGameOver: false,
      isGameWon: false,
      isPencilMode: false,
      oldGame: null,
    });
    router.push("/board");
  },

  handleInput: (row, col, value) => {
    const { board, solution, fixed, isPencilMode, notes, mistakes, isPaused, isGameOver } = get();
    if (!board || !solution || !notes || row < 0 || col < 0 || isPaused || isGameOver) return;
    if (fixed?.[row][col] !== null) return;

    // Handle erase (value is null)
    if (value === null) {
      const oldValue = board[row][col];
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = null;

      const newNotes = notes.map((r) => r.map((c) => new Set(c)));
      newNotes[row][col].clear();

      const history = get().history;
      history.push({ row, col, oldValue, newValue: null });

      set({
        board: newBoard,
        notes: newNotes,
        history,
      });
      return;
    }

    if (isPencilMode && value) {
      // Toggle note
      const newNotes = notes.map((r) => r.map((c) => new Set(c)));
      if (newNotes[row][col].has(value)) {
        newNotes[row][col].delete(value);
      } else {
        newNotes[row][col].add(value);
      }
      set({ notes: newNotes });
      return;
    }

    const oldValue = board[row][col];
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value;

    // Clear notes when entering a value
    const newNotes = notes.map((r) => r.map((c) => new Set(c)));
    newNotes[row][col].clear();

    // Check if the value is correct
    let newMistakes = mistakes;
    if (value !== null && value !== solution[row][col]) {
      newMistakes++;
      if (newMistakes >= 3) {
        set({
          board: newBoard,
          notes: newNotes,
          mistakes: newMistakes,
          isGameOver: true,
        });
        return;
      }
    }

    const history = get().history;
    history.push({ row, col, oldValue, newValue: value });

    set({
      board: newBoard,
      notes: newNotes,
      moves: get().moves + 1,
      mistakes: newMistakes,
      history,
    });

    // Check win condition
    get().checkWin();
  },

  undo: () => {
    const { history, board, notes } = get();
    if (history.length === 0 || !board || !notes) return;

    const lastMove = history.pop();
    if (!lastMove) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[lastMove.row][lastMove.col] = lastMove.oldValue;

    set({ board: newBoard, history: [...history] });
  },

  erase: () => {
    const { board, fixed, notes } = get();
    if (!board || !notes) return;

    // Find selected cell from grid component - we'll pass it as parameter
    // For now, this will be called from grid with selected cell
  },

  togglePencilMode: () => {
    set({ isPencilMode: !get().isPencilMode });
  },

  getHint: () => {
    const { board, solution, fixed } = get();
    if (!board || !solution) return;

    // Find an empty cell and fill it with the correct value
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === null && fixed?.[r][c] === null) {
          get().handleInput(r, c, solution[r][c]);
          return;
        }
      }
    }
  },

  togglePause: () => {
    set({ isPaused: !get().isPaused });
  },

  incrementTime: () => {
    const { isPaused, isGameOver, isGameWon } = get();
    if (!isPaused && !isGameOver && !isGameWon) {
      set({ timeElapsed: get().timeElapsed + 1 });
    }
  },

  checkWin: () => {
    const { board, solution } = get();
    if (!board || !solution) return false;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== solution[r][c]) {
          return false;
        }
      }
    }

    set({ isGameWon: true });
    return true;
  },

  resetGame: () => {
    set({
      isGameOver: false,
      isGameWon: false,
      mistakes: 0,
      timeElapsed: 0,
      moves: 0,
      history: [],
      isPaused: false,
    });
  },
}));
