import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { FontAwesome5 } from "@expo/vector-icons";
import { formateElapsedTime } from "@/utils/formate-time";

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
    moveHistory: any[];
};

type HistoryItemProps = {
    item: GameHistory;
    onPress: () => void;
};

function HistoryItem({ item, onPress }: HistoryItemProps) {
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
        <Pressable
            onPress={onPress}
            className="bg-surface rounded-xl p-4 mb-3 border border-border active:opacity-70"
        >
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                    {item.isWin ? (
                        <View className="w-10 h-10 rounded-full bg-green-500/20 items-center justify-center">
                            <FontAwesome5 name="trophy" size={18} color="#10B981" />
                        </View>
                    ) : (
                        <View className="w-10 h-10 rounded-full bg-red-500/20 items-center justify-center">
                            <FontAwesome5 name="times-circle" size={18} color="#EF4444" />
                        </View>
                    )}
                    <View className="ml-3">
                        <Text className="text-lg font-bold capitalize text-foreground">
                            {item.level}
                        </Text>
                        <Text className="text-xs text-muted mt-0.5">
                            {formattedDate} • {formattedTime}
                        </Text>
                    </View>
                </View>
                <FontAwesome5 name="chevron-right" size={16} color="#9CA3AF" />
            </View>

            <View className="flex-row justify-between items-center bg-background rounded-lg p-3">
                <View className="items-center">
                    <FontAwesome5 name="clock" size={14} color="#6B7280" />
                    <Text className="text-xs text-muted mt-1">Time</Text>
                    <Text className="text-sm font-bold text-foreground mt-0.5">
                        {formateElapsedTime(item.timeElapsed)}
                    </Text>
                </View>

                <View className="w-px h-12 bg-border" />

                <View className="items-center">
                    <FontAwesome5 name="hand-pointer" size={14} color="#6B7280" />
                    <Text className="text-xs text-muted mt-1">Moves</Text>
                    <Text className="text-sm font-bold text-foreground mt-0.5">
                        {item.moves}
                    </Text>
                </View>

                <View className="w-px h-12 bg-border" />

                <View className="items-center">
                    <FontAwesome5 name="exclamation-triangle" size={14} color="#6B7280" />
                    <Text className="text-xs text-muted mt-1">Mistakes</Text>
                    <Text className="text-sm font-bold text-foreground mt-0.5">
                        {item.mistakes}/3
                    </Text>
                </View>

                <View className="w-px h-12 bg-border" />

                <View className="items-center">
                    <FontAwesome5 name="history" size={14} color="#6B7280" />
                    <Text className="text-xs text-muted mt-1">History</Text>
                    <Text className="text-sm font-bold text-foreground mt-0.5">
                        {item.moveHistory?.length || 0}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

export default HistoryItem;
