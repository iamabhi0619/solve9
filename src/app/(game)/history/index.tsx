import { View, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { useMenuStore } from "@/store/menu";
import { useThemeColors } from "@/utils/useThemeColors";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import HistoryItem from "./components/history-item";
import StatsOverview from "./components/stats-overview";
import GameReplayModal from "./components/game-replay-modal";

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
    moveHistory?: any[]; // Optional for backward compatibility
};

export default function HistoryScreen() {
    const { gameHistory, clearHistory, loadHistoryAndUnsolved } = useMenuStore();
    const colors = useThemeColors();
    const emptyIconColor = "#6B7280";

    const [selectedGame, setSelectedGame] = useState<GameHistory | null>(null);
    const [showReplayModal, setShowReplayModal] = useState(false);
    const [showStats, setShowStats] = useState(true);

    useEffect(() => {
        loadHistoryAndUnsolved();
    }, []);

    const handleBack = () => {
        router.back();
    };

    const canReplayGame = (game: GameHistory): boolean => {
        // Check if game has all required data for replay
        return !!
            game.initialGrid &&
            Array.isArray(game.initialGrid) &&
            game.initialGrid.length > 0 &&
            game.solutionGrid &&
            Array.isArray(game.solutionGrid) &&
            game.solutionGrid.length > 0;
    };

    const handleGamePress = (game: GameHistory) => {
        if (!canReplayGame(game)) {
            Alert.alert(
                "Cannot Replay Game",
                "This game was saved in an older version of the app and doesn't have all the required data for replay. Only the game statistics are available.",
                [{ text: "OK" }]
            );
            return;
        }
        setSelectedGame(game);
        setShowReplayModal(true);
    };

    const handleCloseReplay = () => {
        setShowReplayModal(false);
        setSelectedGame(null);
    };

    const renderHistoryItem = ({ item }: { item: GameHistory }) => {
        return <HistoryItem item={item} onPress={() => handleGamePress(item)} />;
    };

    const renderHeader = () => (
        <>
            {gameHistory.length > 0 && showStats && (
                <StatsOverview gameHistory={gameHistory} />
            )}

            {gameHistory.length > 0 && (
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-lg font-bold text-foreground">
                        Recent Games ({gameHistory.length})
                    </Text>
                    <Pressable
                        onPress={() => setShowStats(!showStats)}
                        className="px-3 py-1.5 rounded-lg bg-surface border border-border"
                    >
                        <Text className="text-xs font-medium text-foreground">
                            {showStats ? "Hide Stats" : "Show Stats"}
                        </Text>
                    </Pressable>
                </View>
            )}
        </>
    );

    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-background">
            <View className="flex-1 px-3 relative">
                {/* Header */}
                <View className="flex-row items-center justify-between py-4">
                    <Pressable onPress={handleBack} className="p-2">
                        <FontAwesome5 name="arrow-left" size={24} color={colors.foreground} />
                    </Pressable>
                    <Text className="text-2xl font-bold text-foreground">Game History</Text>
                    <Pressable
                        onPress={clearHistory}
                        className="p-2"
                        disabled={gameHistory.length === 0}
                    >
                        <FontAwesome5
                            name="trash"
                            size={20}
                            color={gameHistory.length === 0 ? "#9CA3AF" : "#EF4444"}
                        />
                    </Pressable>
                </View>

                {/* Content */}
                {gameHistory.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <FontAwesome5 name="history" size={64} color={emptyIconColor} />
                        <Text className="text-xl text-muted mt-4">No game history yet</Text>
                        <Text className="text-muted mt-2 text-center px-8">
                            Complete some games to see your history and replay your moves here
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={gameHistory}
                        renderItem={renderHistoryItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={renderHeader}
                    />
                )}
            </View>

            {/* Replay Modal */}
            <GameReplayModal
                visible={showReplayModal}
                game={selectedGame}
                onClose={handleCloseReplay}
            />
        </SafeAreaView>
    );
}
