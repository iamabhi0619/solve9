import { View } from "react-native";
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

    /* -------------------- STATE -------------------- */

    const [fixedCells] = useState<boolean[][]>(() =>
        board ? board.map((row) => row.map((cell) => cell !== null)) : Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false))
    );

    const [selected, setSelected] = useState<{
        row: number;
        col: number;
    } | null>(null);

    /* -------------------- DERIVED DATA -------------------- */

    const numberCounts = useMemo(() => {
        const counts = Array.from({ length: GRID_SIZE + 1 }, () => 0);

        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const value = board?.[r][c] ?? null;
                if (value !== null) counts[value]++;
            }
        }

        return counts;
    }, [board, GRID_SIZE]);

    const remaining = useCallback(
        (num: number) => Math.max(0, MAX_PER_NUMBER - numberCounts[num]),
        [numberCounts]
    );

    /* -------------------- HANDLERS -------------------- */

    const handleCellSelect = useCallback((row: number, col: number) => {
        if (!isPaused) {
            setSelected({ row, col });
        }
    }, [isPaused]);

    const handleErase = useCallback(() => {
        if (selected && !isPaused) {
            handleInput(selected.row, selected.col, null);
        }
    }, [selected, handleInput, isPaused]);

    /* -------------------- HELPERS -------------------- */

    const isSameRow = (r: number) => selected?.row === r;
    const isSameCol = (c: number) => selected?.col === c;

    const isSameBox = (r: number, c: number) => {
        if (!selected) return false;
        return (
            Math.floor(r / BOX_SIZE) === Math.floor(selected.row / BOX_SIZE) &&
            Math.floor(c / BOX_SIZE) === Math.floor(selected.col / BOX_SIZE)
        );
    };
    
    const isSameNumber = (r: number, c: number) => {
        if (!selected) return false;
        const selectedValue = board?.[selected.row][selected.col] ?? null;
        const cellValue = board?.[r][c] ?? null;
        return selectedValue !== null && selectedValue === cellValue;
    };

    const isError = (r: number, c: number) => {
        const cellValue = board?.[r][c];
        const correctValue = solution?.[r][c];
        return cellValue !== null && cellValue !== correctValue;
    };

    const getBorderClass = (r: number, c: number) => `
    border-[0.2px] border-light-primary dark:border-dark-primary
    ${c % BOX_SIZE === BOX_SIZE - 1 && c !== GRID_SIZE - 1 ? "border-r" : ""}
    ${r % BOX_SIZE === BOX_SIZE - 1 && r !== GRID_SIZE - 1 ? "border-b" : ""}
    ${c === 0 ? "border-l" : ""}
    ${r === 0 ? "border-t" : ""}
    ${c === GRID_SIZE - 1 ? "border-r" : ""}
    ${r === GRID_SIZE - 1 ? "border-b" : ""}
  `;

    /* -------------------- RENDER -------------------- */

    return (
        <View className="w-full items-center justify-center py-4 ">
            <InfoBar />
            <View className="shadow-md">
                {board?.map((row, rowIndex) => (
                    <View key={rowIndex} className="flex-row">
                        {row.map((_, colIndex) => (
                            <SudokuCell
                                key={colIndex}
                                value={board?.[rowIndex][colIndex]}
                                isSelected={
                                    selected?.row === rowIndex &&
                                    selected?.col === colIndex
                                }
                                isRelated={
                                    isSameRow(rowIndex) ||
                                    isSameCol(colIndex) ||
                                    isSameBox(rowIndex, colIndex)
                                }
                                isSameNumber={isSameNumber(rowIndex, colIndex)}
                                isFixed={fixedCells[rowIndex][colIndex]}
                                isError={isError(rowIndex, colIndex)}
                                notes={notes?.[rowIndex][colIndex] || new Set()}
                                onPress={() => handleCellSelect(rowIndex, colIndex)}
                                borderClass={getBorderClass(rowIndex, colIndex)}
                            />
                        ))}
                    </View>
                ))}
            </View>
            <Toolbar onErase={handleErase} />
            <NumberRow
                onNumberPress={(num) => handleInput(selected?.row ?? -1, selected?.col ?? -1, num)}
                remaining={remaining}
            />
        </View>
    );
};

export default Grid;
