import { View, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { useMenuStore } from "@/store/menu";
import { useTheme } from "@/theme";
import { formateElapsedTime } from "@/utils/formate-time";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";

export default function HistoryScreen() {
    const { gameHistory, clearHistory, loadHistoryAndUnsolved } = useMenuStore();
    const { resolvedMode } = useTheme();
    const iconColor = resolvedMode === "light" ? "#0F2854" : "#E6EAF2";
    const emptyIconColor = resolvedMode === "light" ? "#9CA3AF" : "#6B7280";

    useEffect(() => {
        loadHistoryAndUnsolved();
    }, []);

    const handleBack = () => {
        router.back();
    };

    const renderHistoryItem = ({ item }: any) => {
        const date = new Date(item.completedAt);
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return (
            <View className="bg-surface rounded-xl p-4 mb-3 border border-border">
                <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                        {item.isWin ? (
                            <FontAwesome5 name="trophy" size={20} color="#10B981" />
                        ) : (
                            <FontAwesome5 name="times-circle" size={20} color="#EF4444" />
                        )}
                        <Text className="ml-2 text-lg font-bold capitalize text-foreground">
                            {item.level}
                        </Text>
                    </View>
                    <Text className="text-muted text-sm">
                        {formattedDate}
                    </Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <View className="flex-row gap-4">
                        <View>
                            <Text className="text-xs text-muted">
                                Time
                            </Text>
                            <Text className="text-sm font-semibold text-foreground">
                                {formateElapsedTime(item.timeElapsed)}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-xs text-muted">
                                Moves
                            </Text>
                            <Text className="text-sm font-semibold text-foreground">
                                {item.moves}
                            </Text>
                        </View>
                        <View>
                            <Text className="text-xs text-muted">
                                Mistakes
                            </Text>
                            <Text className="text-sm font-semibold text-foreground">
                                {item.mistakes}/3
                            </Text>
                        </View>
                    </View>
                    <Text className="text-xs text-muted">
                        {formattedTime}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView
            style={{ flex: 1 }}
            className="bg-background"
        >
            <View className="flex-1 px-6">
                <View className="flex-row items-center justify-between py-4">
                    <Pressable onPress={handleBack} className="p-2">
                        <FontAwesome5
                            name="arrow-left"
                            size={24}
                            color={iconColor}
                        />
                    </Pressable>
                    <Text className="text-2xl font-bold text-foreground">
                        Game History
                    </Text>
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

                {gameHistory.length === 0 ? (
                    <View className="flex-1 items-center justify-center">
                        <FontAwesome5
                            name="history"
                            size={64}
                            color={emptyIconColor}
                        />
                        <Text className="text-xl text-muted">
                            No game history yet
                        </Text>
                        <Text className="text-muted mt-2 text-center">
                            Complete some games to see your history here
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={gameHistory}
                        renderItem={renderHistoryItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
