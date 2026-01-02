import { Modal, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useMenuStore } from "@/store/menu";
import { router } from "expo-router";
import { formateElapsedTime } from "@/utils/formate-time";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
    visible: boolean;
    isWin: boolean;
    onClose: () => void;
};

const GameModal = ({ visible, isWin, onClose }: Props) => {
    const { timeElapsed, moves, mistakes, startNewGame, level } = useMenuStore();

    const handleNewGame = () => {
        onClose();
        startNewGame();
    };

    const handleBackToMenu = () => {
        onClose();
        router.back();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-center items-center px-6">
                <View className="bg-light-background dark:bg-dark-background rounded-2xl p-6 w-full max-w-md shadow-xl">
                    <View className="items-center mb-6">
                        {isWin ? (
                            <FontAwesome5 name="trophy" size={64} color="#10B981" />
                        ) : (
                            <FontAwesome5 name="times-circle" size={64} color="#EF4444" />
                        )}
                        <Text className="text-3xl font-bold mt-4 text-light-textPrimary dark:text-dark-textPrimary">
                            {isWin ? "Congratulations!" : "Game Over"}
                        </Text>
                        <Text className="text-lg text-light-textSecondary dark:text-dark-textSecondary mt-2 text-center">
                            {isWin 
                                ? "You completed the puzzle!" 
                                : "Too many mistakes. Better luck next time!"}
                        </Text>
                    </View>

                    <View className="bg-light-surface dark:bg-dark-surface rounded-xl p-4 mb-6">
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-light-textSecondary dark:text-dark-textSecondary">
                                Difficulty
                            </Text>
                            <Text className="text-light-textPrimary dark:text-dark-textPrimary font-semibold capitalize">
                                {level}
                            </Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-light-textSecondary dark:text-dark-textSecondary">
                                Time
                            </Text>
                            <Text className="text-light-textPrimary dark:text-dark-textPrimary font-semibold">
                                {formateElapsedTime(timeElapsed)}
                            </Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-light-textSecondary dark:text-dark-textSecondary">
                                Moves
                            </Text>
                            <Text className="text-light-textPrimary dark:text-dark-textPrimary font-semibold">
                                {moves}
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-light-textSecondary dark:text-dark-textSecondary">
                                Mistakes
                            </Text>
                            <Text className="text-light-textPrimary dark:text-dark-textPrimary font-semibold">
                                {mistakes}/3
                            </Text>
                        </View>
                    </View>

                    <View className="gap-3">
                        <Pressable
                            onPress={handleNewGame}
                            className="bg-light-primary dark:bg-dark-primary py-4 rounded-xl items-center active:opacity-80"
                        >
                            <Text className="text-white dark:text-dark-textPrimary text-lg font-bold">
                                New Game
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={handleBackToMenu}
                            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border py-4 rounded-xl items-center active:opacity-80"
                        >
                            <Text className="text-light-textPrimary dark:text-dark-textPrimary text-lg font-bold">
                                Back to Menu
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default GameModal;
