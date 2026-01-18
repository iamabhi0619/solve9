import { createPuzzle } from "@/sudoku/create-puzzle";
import { generateFullBoard } from "@/sudoku/generate-full-board";
import { Board } from "@/sudoku/types";
import { create } from "zustand";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Move = {
  row: number;
  col: number;
  oldValue: number | null;
  newValue: number | null;
  isNote?: boolean;
};

type GameHistory = {
  id: string;
  level: "easy" | "medium" | "hard" | "expert";
  timeElapsed: number;
  moves: number;
  mistakes: number;
  completedAt: Date;
  isWin: boolean;
};

type UnsolvedGame = {
  id: string;
  grid: Board;
  solvedGrid: Board;
  fixed: Board;
  notes: Set<number>[][];
  level: "easy" | "medium" | "hard" | "expert";
  moves: number;
  mistakes: number;
  timeElapsed: number;
  history: Move[];
  savedAt: Date;
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
  currentGameId: string | null;
  gameHistory: GameHistory[];
  unsolvedGames: UnsolvedGame[];
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
  saveGameToHistory: (isWin: boolean) => void;
  saveUnsolvedGame: () => void;
  loadUnsolvedGame: (gameId: string) => void;
  deleteUnsolvedGame: (gameId: string) => void;
  loadHistoryAndUnsolved: () => Promise<void>;
  clearHistory: () => void;
  canAutoComplete: () => boolean;
  autoComplete: () => Promise<void>;
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
  currentGameId: null,
  gameHistory: [],
  unsolvedGames: [],

  startNewGame: () => {
    const currentLevel = get().level;
    if (!currentLevel) {
      return;
    }
    const fullBoard = generateFullBoard();
    const puzzleBoard = createPuzzle(fullBoard, currentLevel);
    const notes = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => new Set<number>()),
    );
    const gameId = Date.now().toString();
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
      currentGameId: gameId,
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

  saveGameToHistory: async (isWin: boolean) => {
    const { currentGameId, level, timeElapsed, moves, mistakes, gameHistory } = get();
    if (!currentGameId || !level) return;

    const historyEntry: GameHistory = {
      id: currentGameId,
      level,
      timeElapsed,
      moves,
      mistakes,
      completedAt: new Date(),
      isWin,
    };

    const newHistory = [historyEntry, ...gameHistory].slice(0, 50); // Keep last 50 games
    set({ gameHistory: newHistory });

    // Delete from unsolved games if it exists
    get().deleteUnsolvedGame(currentGameId);

    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem("gameHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Failed to save game history:", error);
    }
  },

  saveUnsolvedGame: async () => {
    const {
      currentGameId,
      board,
      solution,
      fixed,
      notes,
      level,
      moves,
      mistakes,
      timeElapsed,
      history,
      unsolvedGames,
    } = get();

    if (!currentGameId || !board || !solution || !fixed || !notes || !level) return;

    // Convert Sets to arrays for JSON serialization
    const notesArray = notes.map((row) => row.map((cell) => Array.from(cell)));

    const unsolvedGame: UnsolvedGame = {
      id: currentGameId,
      grid: board,
      solvedGrid: solution,
      fixed,
      notes: notesArray as any,
      level,
      moves,
      mistakes,
      timeElapsed,
      history,
      savedAt: new Date(),
    };

    // Remove existing entry if present and add new one
    const filteredGames = unsolvedGames.filter((g) => g.id !== currentGameId);
    const newUnsolved = [unsolvedGame, ...filteredGames].slice(0, 10); // Keep last 10 unsolved
    set({ unsolvedGames: newUnsolved });

    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem("unsolvedGames", JSON.stringify(newUnsolved));
    } catch (error) {
      console.error("Failed to save unsolved game:", error);
    }
  },

  loadUnsolvedGame: (gameId: string) => {
    const { unsolvedGames } = get();
    const game = unsolvedGames.find((g) => g.id === gameId);

    if (!game) return;

    // Reconstruct Sets from arrays
    const reconstructedNotes = game.notes.map((row) =>
      row.map((cell) => new Set(Array.isArray(cell) ? cell : [])),
    );

    set({
      board: game.grid,
      solution: game.solvedGrid,
      fixed: game.fixed,
      notes: reconstructedNotes,
      level: game.level,
      moves: game.moves,
      mistakes: game.mistakes,
      timeElapsed: game.timeElapsed,
      history: game.history,
      currentGameId: game.id,
      isPaused: false,
      isGameOver: false,
      isGameWon: false,
      isPencilMode: false,
      oldGame: null,
    });

    router.push("/board");
  },

  deleteUnsolvedGame: async (gameId: string) => {
    const { unsolvedGames } = get();
    const newUnsolved = unsolvedGames.filter((g) => g.id !== gameId);
    set({ unsolvedGames: newUnsolved });

    try {
      await AsyncStorage.setItem("unsolvedGames", JSON.stringify(newUnsolved));
    } catch (error) {
      console.error("Failed to delete unsolved game:", error);
    }
  },

  loadHistoryAndUnsolved: async () => {
    try {
      const [historyData, unsolvedData] = await Promise.all([
        AsyncStorage.getItem("gameHistory"),
        AsyncStorage.getItem("unsolvedGames"),
      ]);

      if (historyData) {
        const history = JSON.parse(historyData);
        set({ gameHistory: history });
      }

      if (unsolvedData) {
        const unsolved = JSON.parse(unsolvedData);
        // Reconstruct Sets from loaded data
        const reconstructed = unsolved.map((game: any) => ({
          ...game,
          notes: game.notes.map((row: any[]) =>
            row.map((cell: any[]) => new Set(Array.isArray(cell) ? cell : [])),
          ),
        }));
        set({ unsolvedGames: reconstructed });
      }
    } catch (error) {
      console.error("Failed to load history and unsolved games:", error);
    }
  },

  clearHistory: async () => {
    set({ gameHistory: [] });
    try {
      await AsyncStorage.removeItem("gameHistory");
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  },

  canAutoComplete: () => {
    const { board, solution, mistakes } = get();
    if (!board || !solution || mistakes > 0) return false;

    // Check if there are any mistakes on the board
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const cellValue = board[r][c];
        const correctValue = solution[r][c];
        if (cellValue !== null && cellValue !== correctValue) {
          return false; // Has mistakes, can't auto-complete
        }
      }
    }

    // Check if all empty cells have exactly one valid option
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === null) {
          const validNumbers = getValidNumbers(board, r, c);
          if (validNumbers.length !== 1) {
            return false; // Cell has 0 or multiple options
          }
        }
      }
    }

    // Check if there's at least one empty cell
    const hasEmptyCells = board.some((row) => row.some((cell) => cell === null));
    return hasEmptyCells;
  },

  autoComplete: async () => {
    const { board, solution, handleInput } = get();
    if (!board || !solution) return;

    // Collect all empty cells
    const emptyCells: { row: number; col: number; value: number }[] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === null && solution[r][c] !== null) {
          emptyCells.push({ row: r, col: c, value: solution[r][c]! });
        }
      }
    }

    // Fill cells one by one with animation delay
    for (const cell of emptyCells) {
      await new Promise((resolve) => setTimeout(resolve, 150)); // 150ms delay between fills
      handleInput(cell.row, cell.col, cell.value);
    }
  },
}));

// Helper function to get valid numbers for a cell
function getValidNumbers(board: (number | null)[][], row: number, col: number): number[] {
  const valid: number[] = [];

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      valid.push(num);
    }
  }

  return valid;
}

function isValidPlacement(
  board: (number | null)[][],
  row: number,
  col: number,
  num: number,
): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }

  return true;
}
