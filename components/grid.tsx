import { View } from "react-native";
import { useState, useMemo, useCallback } from "react";
import SudokuCell from "./SudokuCell";
import NumberRow from "./number-row";
import initialPuzzle from "./tempdata";

type Props = {
    GRID_SIZE?: number;
};

const BOX_SIZE = 3;
const MAX_PER_NUMBER = 9;

const Grid = ({ GRID_SIZE = 9 }: Props) => {
    /* -------------------- STATE -------------------- */
    const [grid, setGrid] = useState<(number | null)[][]>(() =>
        initialPuzzle.map((row) => [...row])
    );

    const [fixedCells] = useState<boolean[][]>(() =>
        initialPuzzle.map((row) => row.map((cell) => cell !== null))
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
                const value = grid[r][c];
                if (value !== null) counts[value]++;
            }
        }

        return counts;
    }, [grid, GRID_SIZE]);

    const remaining = useCallback(
        (num: number) => Math.max(0, MAX_PER_NUMBER - numberCounts[num]),
        [numberCounts]
    );

    /* -------------------- HANDLERS -------------------- */

    const handleCellSelect = useCallback((row: number, col: number) => {
        setSelected({ row, col });
    }, []);

    const handleNumberInput = useCallback(
        (num: number) => {
            if (!selected) return;
            if (fixedCells[selected.row][selected.col]) return;

            setGrid((prev) => {
                const next = prev.map((row) => [...row]);
                next[selected.row][selected.col] = num;
                return next;
            });
        },
        [selected, fixedCells]
    );


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
        const selectedValue = grid[selected.row][selected.col];
        const cellValue = grid[r][c];
        return selectedValue !== null && selectedValue === cellValue;
    };

    const getBorderClass = (r: number, c: number) => `
    border-[0.2px] border-darkblue
    ${c % BOX_SIZE === BOX_SIZE - 1 && c !== GRID_SIZE - 1 ? "border-r" : ""}
    ${r % BOX_SIZE === BOX_SIZE - 1 && r !== GRID_SIZE - 1 ? "border-b" : ""}
    ${c === 0 ? "border-l" : ""}
    ${r === 0 ? "border-t" : ""}
    ${c === GRID_SIZE - 1 ? "border-r" : ""}
    ${r === GRID_SIZE - 1 ? "border-b" : ""}
  `;

    /* -------------------- RENDER -------------------- */

    return (
        <View className="w-full items-center justify-center py-4">
            <View className="bg-white rounded-2xl p-2 shadow-md">
                {grid.map((row, rowIndex) => (
                    <View key={rowIndex} className="flex-row">
                        {row.map((_, colIndex) => (
                            <SudokuCell
                                key={colIndex}
                                value={grid[rowIndex][colIndex]}
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
                                onPress={() => handleCellSelect(rowIndex, colIndex)}
                                borderClass={getBorderClass(rowIndex, colIndex)}
                            />
                        ))}
                    </View>
                ))}
            </View>

            <NumberRow
                onNumberPress={handleNumberInput}
                remaining={remaining}
            />
        </View>
    );
};

export default Grid;
