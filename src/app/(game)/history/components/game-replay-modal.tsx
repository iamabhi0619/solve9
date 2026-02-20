import { Modal, View, Pressable, ScrollView, Dimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useMemo, useEffect } from "react";
import ReplayBoard from "./replay-board";
import MoveTimeline from "./move-timeline";
import { useThemeColors } from "@/utils/useThemeColors";
import { formateElapsedTime } from "@/utils/formate-time";

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
    initialGrid: (number | null)[][];
    solutionGrid: (number | null)[][];
    moveHistory: Move[];
};

type GameReplayModalProps = {
    visible: boolean;
    game: GameHistory | null;
    onClose: () => void;
};

function GameReplayModal({ visible, game, onClose }: GameReplayModalProps) {
    const colors = useThemeColors();

    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    // Reset when game changes or modal opens
    useEffect(() => {
        if (visible) {
            setCurrentMoveIndex(-1);
            setIsPlaying(false);
        }
    }, [visible, game?.id]);

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying || !game) return;

        const timer = setInterval(() => {
            setCurrentMoveIndex((prev) => {
                if (prev >= game.moveHistory.length - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        return () => clearInterval(timer);
    }, [isPlaying, game]);

    const currentGrid = useMemo(() => {
        if (!game) return null;

        const grid = game.initialGrid.map(row => [...row]);

        for (let i = 0; i <= currentMoveIndex; i++) {
            const move = game.moveHistory[i];
            if (move) {
                grid[move.row][move.col] = move.newValue;
            }
        }

        return grid;
    }, [game, currentMoveIndex]);

    const highlightedCell = useMemo(() => {
        if (currentMoveIndex < 0 || !game) return null;
        const move = game.moveHistory[currentMoveIndex];
        return move ? { row: move.row, col: move.col } : null;
    }, [currentMoveIndex, game]);

    const handleNext = () => {
        if (!game || currentMoveIndex >= game.moveHistory.length - 1) return;
        setCurrentMoveIndex(prev => prev + 1);
        setIsPlaying(false);
    };

    const handlePrevious = () => {
        if (currentMoveIndex < 0) return;
        setCurrentMoveIndex(prev => prev - 1);
        setIsPlaying(false);
    };

    const handleReset = () => {
        setCurrentMoveIndex(-1);
        setIsPlaying(false);
    };

    const handlePlayPause = () => {
        if (!game) return;
        if (currentMoveIndex >= game.moveHistory.length - 1) {
            setCurrentMoveIndex(-1);
        }
        setIsPlaying(!isPlaying);
    };

    if (!game) return null;

    const date = new Date(game.completedAt);
    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            transparent={false}
        >
            <View className="flex-1 bg-background">
                {/* Header */}
                <View className="bg-surface border-b border-border px-4 py-4">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                            <View className="flex-row items-center gap-2">
                                {game.isWin ? (
                                    <FontAwesome5 name="trophy" size={20} color="#10B981" />
                                ) : (
                                    <FontAwesome5 name="times-circle" size={20} color="#EF4444" />
                                )}
                                <Text className="text-xl font-bold capitalize text-foreground">
                                    {game.level} - {game.isWin ? "Victory" : "Game Over"}
                                </Text>
                            </View>
                            <Text className="text-sm text-muted mt-1">{formattedDate}</Text>
                        </View>

                        <Pressable
                            onPress={onClose}
                            className="w-10 h-10 rounded-full bg-background border border-border items-center justify-center"
                        >
                            <FontAwesome5 name="times" size={20} color={colors.foreground} />
                        </Pressable>
                    </View>

                    {/* Stats Bar */}
                    <View className="flex-row justify-around mt-4 bg-background rounded-lg p-3">
                        <View className="items-center">
                            <Text className="text-xs text-muted">Time</Text>
                            <Text className="text-sm font-bold text-foreground mt-1">
                                {formateElapsedTime(game.timeElapsed)}
                            </Text>
                        </View>
                        <View className="w-px bg-border" />
                        <View className="items-center">
                            <Text className="text-xs text-muted">Moves</Text>
                            <Text className="text-sm font-bold text-foreground mt-1">{game.moves}</Text>
                        </View>
                        <View className="w-px bg-border" />
                        <View className="items-center">
                            <Text className="text-xs text-muted">Mistakes</Text>
                            <Text className="text-sm font-bold text-foreground mt-1">{game.mistakes}/3</Text>
                        </View>
                        <View className="w-px bg-border" />
                        <View className="items-center">
                            <Text className="text-xs text-muted">Accuracy</Text>
                            <Text className="text-sm font-bold text-foreground mt-1">
                                {game.moves > 0 ? Math.round(((game.moves - game.mistakes) / game.moves) * 100) : 0}%
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="flex-1">
                    {/* Board */}
                    <View className="items-center mb-6 mt-3">
                        {currentGrid && (
                            <ReplayBoard
                                grid={currentGrid}
                                initialGrid={game.initialGrid}
                                solutionGrid={game.solutionGrid}
                                highlightedCell={highlightedCell}
                            />
                        )}
                    </View>

                    {/* Playback Controls */}
                    <View className="bg-surface rounded-xl p-4 mb-4 border border-border mx-4">
                        <Text className="text-sm font-bold text-foreground mb-3">Playback Controls</Text>
                        <View className="flex-row items-center justify-center gap-3">
                            <Pressable
                                onPress={handleReset}
                                className="w-12 h-12 rounded-full bg-background border border-border items-center justify-center active:opacity-60"
                                disabled={currentMoveIndex < 0}
                            >
                                <FontAwesome5
                                    name="redo"
                                    size={18}
                                    color={currentMoveIndex < 0 ? "#9CA3AF" : colors.foreground}
                                />
                            </Pressable>

                            <Pressable
                                onPress={handlePrevious}
                                className="w-12 h-12 rounded-full bg-background border border-border items-center justify-center active:opacity-60"
                                disabled={currentMoveIndex < 0}
                            >
                                <FontAwesome5
                                    name="step-backward"
                                    size={18}
                                    color={currentMoveIndex < 0 ? "#9CA3AF" : colors.foreground}
                                />
                            </Pressable>

                            <Pressable
                                onPress={handlePlayPause}
                                className="w-16 h-16 rounded-full bg-primary items-center justify-center active:opacity-80"
                            >
                                <FontAwesome5
                                    name={isPlaying ? "pause" : "play"}
                                    size={24}
                                    color="#FFFFFF"
                                    style={{ marginLeft: isPlaying ? 0 : 3 }}
                                />
                            </Pressable>

                            <Pressable
                                onPress={handleNext}
                                className="w-12 h-12 rounded-full bg-background border border-border items-center justify-center active:opacity-60"
                                disabled={currentMoveIndex >= game.moveHistory.length - 1}
                            >
                                <FontAwesome5
                                    name="step-forward"
                                    size={18}
                                    color={currentMoveIndex >= game.moveHistory.length - 1 ? "#9CA3AF" : colors.foreground}
                                />
                            </Pressable>

                            <Pressable
                                onPress={() => setCurrentMoveIndex(game.moveHistory.length - 1)}
                                className="w-12 h-12 rounded-full bg-background border border-border items-center justify-center active:opacity-60"
                                disabled={currentMoveIndex >= game.moveHistory.length - 1}
                            >
                                <FontAwesome5
                                    name="fast-forward"
                                    size={18}
                                    color={currentMoveIndex >= game.moveHistory.length - 1 ? "#9CA3AF" : colors.foreground}
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* Move Timeline */}
                    {game.moveHistory.length > 0 && (
                        <MoveTimeline
                            moves={game.moveHistory}
                            currentMoveIndex={currentMoveIndex}
                            onMoveSelect={setCurrentMoveIndex}
                            solutionGrid={game.solutionGrid}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
}

export default GameReplayModal;
