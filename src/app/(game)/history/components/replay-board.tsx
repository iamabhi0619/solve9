import { View, Dimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { useMemo } from "react";

type ReplayBoardProps = {
    grid: (number | null)[][];
    initialGrid: (number | null)[][];
    solutionGrid: (number | null)[][];
    highlightedCell?: { row: number; col: number } | null;
};

function ReplayBoard({ grid, initialGrid, solutionGrid, highlightedCell }: ReplayBoardProps) {
    const screenWidth = Dimensions.get("window").width;
    const boardSize = Math.min(screenWidth - 64, 400);
    const cellSize = boardSize / 9;
    const fontSize = cellSize * 0.5;

    const getCellStyle = (row: number, col: number) => {
        const isFixed = initialGrid[row][col] !== null;
        const value = grid[row][col];
        const isHighlighted = highlightedCell?.row === row && highlightedCell?.col === col;
        const isWrong = value !== null && value !== solutionGrid[row][col];

        let bgClass = "bg-transparent";
        if (isHighlighted) {
            bgClass = "bg-primary";
        }

        return {
            bgClass,
            isFixed,
            isWrong,
            isHighlighted,
        };
    };

    const renderCell = (row: number, col: number) => {
        const value = grid[row][col];
        const { bgClass, isFixed, isWrong, isHighlighted } = getCellStyle(row, col);

        const borderRight = col === 2 || col === 5 ? 2 : 1;
        const borderBottom = row === 2 || row === 5 ? 2 : 1;

        return (
            <View
                key={`${row}-${col}`}
                className={bgClass}
                style={{
                    width: cellSize,
                    height: cellSize,
                    borderRightWidth: borderRight,
                    borderBottomWidth: borderBottom,
                    borderColor: "#9CA3AF",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {value !== null && (
                    <Text
                        className={
                            isWrong
                                ? "text-error font-medium" :
                                isHighlighted ? "text-surface"
                                    : isFixed
                                        ? "text-foreground font-medium"
                                        : "text-primary font-medium"
                        }
                        style={{ fontSize }}
                    >
                        {value}
                    </Text>
                )}
            </View>
        );
    };

    return (
        <View
            className="bg-surface rounded-xl border-2 border-border overflow-hidden h-fit w-fit"
        // style={{ width: boardSize, height: boardSize }}
        >
            {Array.from({ length: 9 }, (_, row) => (
                <View key={row} style={{ flexDirection: "row" }}>
                    {Array.from({ length: 9 }, (_, col) => renderCell(row, col))}
                </View>
            ))}
        </View>
    );
}

export default ReplayBoard;
