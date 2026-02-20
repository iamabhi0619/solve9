import { View, useWindowDimensions } from "react-native";
import { useState, useMemo, useCallback } from "react";
import SudokuCell from "./SudokuCell";
import NumberRow from "./number-row";
import Toolbar from "./tool-bar";
import InfoBar from "./info-bar";
import { useMenuStore } from "@/store/menu";

const GRID_SIZE = 9;
const BOX_SIZE = 3;
const MAX_PER_NUMBER = 9;

const Grid = () => {
    /* -------------------- STORE -------------------- */
    const { board, fixed, solution, notes, moves, handleInput, isPaused } = useMenuStore();

    /* -------------------- DIMENSIONS -------------------- */
    const { width: screenWidth } = useWindowDimensions();
    // Leave horizontal padding (48px each side) and a little breathing room
    const gridSize = Math.min(screenWidth - 32, 380);
    const cellSize = Math.floor(gridSize / GRID_SIZE);
    const actualGridSize = cellSize * GRID_SIZE;

    /* -------------------- STATE -------------------- */
    const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);

    const isFixedCell = useCallback(
        (row: number, col: number) => fixed?.[row]?.[col] !== null,
        [fixed]
    );

    /* -------------------- DERIVED DATA -------------------- */
    const numberCounts = useMemo(() => {
        const counts = Array.from({ length: GRID_SIZE + 1 }, () => 0);
        for (let r = 0; r < GRID_SIZE; r++)
            for (let c = 0; c < GRID_SIZE; c++) {
                const v = board?.[r][c] ?? null;
                if (v !== null) counts[v]++;
            }
        return counts;
    }, [board]);

    const remaining = useCallback(
        (num: number) => Math.max(0, MAX_PER_NUMBER - numberCounts[num]),
        [numberCounts]
    );

    /* -------------------- HANDLERS -------------------- */
    const handleCellSelect = useCallback(
        (row: number, col: number) => {
            if (!isPaused) setSelected({ row, col });
        },
        [isPaused]
    );

    const handleErase = useCallback(() => {
        if (selected && !isPaused) handleInput(selected.row, selected.col, null);
    }, [selected, handleInput, isPaused]);

    /* -------------------- HELPERS -------------------- */
    const isSameBox = (r: number, c: number) => {
        if (!selected) return false;
        return (
            Math.floor(r / BOX_SIZE) === Math.floor(selected.row / BOX_SIZE) &&
            Math.floor(c / BOX_SIZE) === Math.floor(selected.col / BOX_SIZE)
        );
    };

    const isSameNumber = (r: number, c: number) => {
        if (!selected) return false;
        const sv = board?.[selected.row][selected.col] ?? null;
        const cv = board?.[r][c] ?? null;
        return sv !== null && sv === cv;
    };

    const isError = (r: number, c: number) => {
        const cv = board?.[r][c];
        return cv !== null && cv !== solution?.[r][c];
    };

    // A cell is "locked" when the user correctly entered the right number (not original-fixed)
    const isLockedCell = useCallback(
        (row: number, col: number) => {
            if (!board || !solution) return false;
            const val = board[row][col];
            if (val === null) return false;
            if (fixed?.[row][col] !== null) return false; // original fixed cell, not locked
            return val === solution[row][col];
        },
        [board, solution, fixed]
    );

    /* -------------------- RENDER -------------------- */
    return (
        <View className="w-full items-center justify-center py-3">
            <InfoBar />

            {/* Outer grid wrapper */}
            <View
                className="border-2 border-primary bg-surface rounded-xl overflow-hidden mt-2"
                style={{
                    width: actualGridSize + 4,
                    height: actualGridSize + 4,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.18,
                    shadowRadius: 10,
                    elevation: 6,
                }}
            >
                <View className="flex-col" style={{ width: actualGridSize, height: actualGridSize }}>
                    {/* 3×3 boxes */}
                    {[0, 1, 2].map((boxRow) => (
                        <View key={boxRow} className="flex-row">
                            {[0, 1, 2].map((boxCol) => (
                                <View
                                    key={boxCol}
                                    className={[
                                        "flex-col overflow-hidden",
                                        boxCol < 2 ? "border-r-2 border-primary" : "",
                                        boxRow < 2 ? "border-b-2 border-primary" : "",
                                    ].join(" ")}
                                    style={{ width: cellSize * 3, height: cellSize * 3 }}
                                >
                                    {[0, 1, 2].map((cellRow) => {
                                        const r = boxRow * BOX_SIZE + cellRow;
                                        return (
                                            <View key={cellRow} className="flex-row">
                                                {[0, 1, 2].map((cellCol) => {
                                                    const c = boxCol * BOX_SIZE + cellCol;
                                                    return (
                                                        <View
                                                            key={cellCol}
                                                            className={[
                                                                cellCol < 2 ? "border-r border-border" : "",
                                                                cellRow < 2 ? "border-b border-border" : "",
                                                            ].join(" ")}
                                                            style={{ width: cellSize, height: cellSize }}
                                                        >
                                                            <SudokuCell
                                                                value={board?.[r][c] ?? null}
                                                                isSelected={
                                                                    selected?.row === r && selected?.col === c
                                                                }
                                                                isRelated={
                                                                    selected?.row === r ||
                                                                    selected?.col === c ||
                                                                    isSameBox(r, c)
                                                                }
                                                                isSameNumber={isSameNumber(r, c)}
                                                                isFixed={isFixedCell(r, c)}
                                                                isLocked={isLockedCell(r, c)}
                                                                isError={isError(r, c)}
                                                                notes={notes?.[r][c] || new Set()}
                                                                onPress={() => handleCellSelect(r, c)}
                                                                cellSize={cellSize}
                                                            />
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        );
                                    })}
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>

            <Toolbar onErase={handleErase} selected={selected} />
            <NumberRow
                onNumberPress={(num) =>
                    handleInput(selected?.row ?? -1, selected?.col ?? -1, num)
                }
                remaining={remaining}
            />
        </View>
    );
};

export default Grid;
