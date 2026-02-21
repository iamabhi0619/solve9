import { createPuzzle } from "@/sudoku/create-puzzle";
import { generateFullBoard } from "@/sudoku/generate-full-board";
import { Board } from "@/sudoku/types";
import { create } from "zustand";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** @deprecated Use `useTheme()` from `@/theme` instead. */
export type AppTheme = "light" | "dark" | "ocean" | "sunset" | "forest" | "lavender";

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
  initialGrid: Board;
  solutionGrid: Board;
  moveHistory?: Move[]; // Optional for backward compatibility
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

const MAX_HINTS = 2;

type GameStore = {
  level: "easy" | "medium" | "hard" | "expert" | null;
  setLevel: (level: "easy" | "medium" | "hard" | "expert") => void;
  hintsUsed: number;
  hintsRemaining: () => number;
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
  isGeneratingNewGame: boolean;
  currentGameId: string | null;
  gameHistory: GameHistory[];
  unsolvedGames: UnsolvedGame[];
  startNewGame: () => void;
  handleInput: (row: number, col: number, value: number | null) => void;
  undo: () => void;
  erase: () => void;
  togglePencilMode: () => void;
  getHint: (row: number, col: number) => void;
  togglePause: () => void;
  incrementTime: () => void;
  checkWin: () => boolean;
  resetGame: () => void;
  saveGameToHistory: (isWin: boolean) => void;
  saveUnsolvedGame: () => void;
  loadUnsolvedGame: (gameId: string) => void;
  restoreActiveGame: () => Promise<boolean>;
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
  isGeneratingNewGame: false,
  hintsUsed: 0,
  currentGameId: null,
  gameHistory: [],
  unsolvedGames: [],

  hintsRemaining: () => MAX_HINTS - get().hintsUsed,

  startNewGame: () => {
    const currentLevel = get().level;
    if (!currentLevel) {
      return;
    }

    // Clear the previous board so the loader shows immediately, then navigate.
    // Puzzle generation runs in the next macrotask so the loader frame can paint
    // before the JS thread is busy with the heavy computation.
    set({
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
      hintsUsed: 0,
      oldGame: null,
      currentGameId: null,
      isGeneratingNewGame: true,
    });

    router.push("/board");

    setTimeout(() => {
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
        currentGameId: gameId,
        isGeneratingNewGame: false,
      });
    }, 50);
  },

  handleInput: (row, col, value) => {
    const { board, solution, fixed, isPencilMode, notes, mistakes, isPaused, isGameOver } = get();
    if (!board || !solution || !notes || row < 0 || col < 0 || isPaused || isGameOver) return;
    if (fixed?.[row][col] !== null) return;
    // Lock: prevent changing a correctly entered number
    const current = board[row][col];
    if (current !== null && current === solution[row][col]) return;

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
    // erase is handled via handleInput(row, col, null) from grid
  },

  togglePencilMode: () => {
    set({ isPencilMode: !get().isPencilMode });
  },

  getHint: (row: number, col: number) => {
    const { board, solution, fixed, hintsUsed } = get();
    if (!board || !solution) return;
    // Enforce max hints per game
    if (hintsUsed >= MAX_HINTS) return;
    // Selected cell must be empty and not original-fixed
    if (row < 0 || col < 0) return;
    if (fixed?.[row][col] !== null) return;
    const current = board[row][col];
    // Cell must be empty or incorrectly filled
    const correct = solution[row][col];
    if (current === correct) return;
    set({ hintsUsed: hintsUsed + 1 });
    get().handleInput(row, col, correct);
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
    const { currentGameId, level, timeElapsed, moves, mistakes, gameHistory, fixed, solution, history } = get();
    if (!currentGameId || !level || !fixed || !solution) return;

    const historyEntry: GameHistory = {
      id: currentGameId,
      level,
      timeElapsed,
      moves,
      mistakes,
      completedAt: new Date(),
      isWin,
      initialGrid: fixed.map(row => [...row]),
      solutionGrid: solution.map(row => [...row]),
      moveHistory: [...history],
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
    
    // Update oldGame to reference the newly saved game
    const oldGame = {
      grid: board,
      solvedGrid: solution,
      size: 9,
      level,
      moves,
      timeElapsed,
    };
    
    set({ unsolvedGames: newUnsolved, oldGame });

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
      hintsUsed: 0,
      oldGame: null,
      isGeneratingNewGame: false,
    });

    router.push("/board");
  },

  restoreActiveGame: async () => {
    const { currentGameId, board } = get();
    
    // If board already exists, no need to restore
    if (board) return true;

    // Load unsolved games from storage
    try {
      const unsolvedData = await AsyncStorage.getItem("unsolvedGames");
      if (!unsolvedData) return false;

      const unsolved = JSON.parse(unsolvedData);
      if (!unsolved || unsolved.length === 0) return false;

      // Reconstruct Sets from loaded data
      const reconstructed = unsolved.map((game: any) => ({
        ...game,
        notes: game.notes.map((row: any[]) =>
          row.map((cell: any[]) => new Set(Array.isArray(cell) ? cell : [])),
        ),
      }));

      // Find the game to restore (current game if exists, otherwise most recent)
      let gameToRestore = currentGameId 
        ? reconstructed.find((g: UnsolvedGame) => g.id === currentGameId)
        : reconstructed[0]; // Most recent is first in the array

      if (!gameToRestore) return false;

      // Restore the game state
      set({
        board: gameToRestore.grid,
        solution: gameToRestore.solvedGrid,
        fixed: gameToRestore.fixed,
        notes: gameToRestore.notes,
        level: gameToRestore.level,
        moves: gameToRestore.moves,
        mistakes: gameToRestore.mistakes,
        timeElapsed: gameToRestore.timeElapsed,
        history: gameToRestore.history,
        currentGameId: gameToRestore.id,
        unsolvedGames: reconstructed,
        isGeneratingNewGame: false,
      });

      return true;
    } catch (error) {
      console.error("Failed to restore active game:", error);
      return false;
    }
  },

  deleteUnsolvedGame: async (gameId: string) => {
    const { unsolvedGames } = get();
    const newUnsolved = unsolvedGames.filter((g) => g.id !== gameId);
    
    // Update oldGame to the new most recent game
    const mostRecentGame = newUnsolved[0];
    const oldGame = mostRecentGame ? {
      grid: mostRecentGame.grid,
      solvedGrid: mostRecentGame.solvedGrid,
      size: 9,
      level: mostRecentGame.level,
      moves: mostRecentGame.moves,
      timeElapsed: mostRecentGame.timeElapsed,
    } : null;
    
    set({ unsolvedGames: newUnsolved, oldGame });

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
        
        // Set oldGame to the most recent unsolved game for the Continue button
        const mostRecentGame = reconstructed[0];
        const oldGame = mostRecentGame ? {
          grid: mostRecentGame.grid,
          solvedGrid: mostRecentGame.solvedGrid,
          size: 9,
          level: mostRecentGame.level,
          moves: mostRecentGame.moves,
          timeElapsed: mostRecentGame.timeElapsed,
        } : null;
        
        set({ unsolvedGames: reconstructed, oldGame });
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
