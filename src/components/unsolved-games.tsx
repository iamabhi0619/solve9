import { useMenuStore } from "@/store/menu";
import { Pressable, View, ScrollView } from "react-native";
import { Text } from "./ui/text";
import { formateElapsedTime } from "@/utils/formate-time";
import { FontAwesome5 } from "@expo/vector-icons";

function UnsolvedGames() {
    const { unsolvedGames, loadUnsolvedGame, deleteUnsolvedGame } = useMenuStore();

    if (unsolvedGames.length === 0) {
        return null;
    }

    return (
        <View className="w-full mb-4">
            <View className="flex-row items-center justify-between mb-2 px-1">
                <View className="flex-row items-center">
                    <View className="w-1 h-5 bg-light-primary dark:bg-dark-primary rounded-full mr-2" />
                    <Text className="text-base font-bold text-light-textPrimary dark:text-dark-textPrimary">
                        Continue Playing
                    </Text>
                </View>
                <View className="bg-light-primary/10 dark:bg-dark-primary/10 px-2 py-0.5 rounded-full">
                    <Text className="text-[10px] font-semibold text-light-primary dark:text-dark-primary">
                        {unsolvedGames.length}
                    </Text>
                </View>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="w-full -mx-1"
                contentContainerStyle={{ paddingHorizontal: 4 }}
            >
                {unsolvedGames.map((game) => {
                    const date = new Date(game.savedAt);
                    const formattedDate = date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    });

                    return (
                        <Pressable
                            key={game.id}
                            onPress={() => loadUnsolvedGame(game.id)}
                            className="bg-light-surface dark:bg-dark-surface border border-light-primary/30 dark:border-dark-primary/30 rounded-2xl p-3 mr-3 w-44"
                           
                        >
                            <View className="flex-row justify-between items-center mb-2">
                                <View className="bg-light-primary dark:bg-dark-primary rounded-lg px-2.5 py-1">
                                    <Text className="text-xs font-bold capitalize text-white dark:text-dark-background">
                                        {game.level}
                                    </Text>
                                </View>
                                <Pressable
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        deleteUnsolvedGame(game.id);
                                    }}
                                    className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-full active:opacity-70"
                                >
                                    <FontAwesome5 name="trash" size={10} color="#EF4444" />
                                </Pressable>
                            </View>

                            <View className="mb-2">
                                <View className="flex-row items-center mb-2">
                                    <FontAwesome5 name="clock" size={11} color="#6B7280" />
                                    <Text className="ml-1.5 text-sm font-bold text-light-textPrimary dark:text-dark-textPrimary">
                                        {formateElapsedTime(game.timeElapsed)}
                                    </Text>
                                </View>

                                <View className="flex-row justify-between">
                                    <View className="flex-row items-center">
                                        <FontAwesome5 name="walking" size={9} color="#6B7280" />
                                        <Text className="ml-1 text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                            {game.moves}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <FontAwesome5 name="times-circle" size={9} color="#EF4444" />
                                        <Text className="ml-1 text-xs text-red-500 font-semibold">
                                            {game.mistakes}/3
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View className="border-t border-light-border dark:border-dark-border pt-2">
                                <Text className="text-[9px] text-light-textSecondary dark:text-dark-textSecondary">
                                    {formattedDate}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default UnsolvedGames;
