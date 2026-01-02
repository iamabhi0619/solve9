import { useMenuStore } from "@/store/menu";
import { Pressable, View } from "react-native";
import { Text } from "./ui/text";
import { formateElapsedTime } from "@/utils/formate-time";

function PlayButtons() {
  const { oldGame, startNewGame } = useMenuStore();
  return (
    <View className="flex-col w-full items-center mt-10">
      {oldGame && (
        <Pressable
          onPress={() => {}}
          className="w-full items-center bg-light-primary/10 dark:bg-dark-primary/10 py-3 rounded-xl border border-light-border dark:border-dark-border"
        >
          <Text className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
            Continue
          </Text>
          <View className="flex-row">
            <Text className="text-light-textSecondary dark:text-dark-textSecondary">
              {formateElapsedTime(oldGame.timeElapsed)}
            </Text>
            <Text className="capitalize ml-2 text-light-textSecondary dark:text-dark-textSecondary">
              {oldGame.level}
            </Text>
          </View>
        </Pressable>
      )}
      <Pressable
        onPress={startNewGame}
        className="w-full items-center bg-light-primary dark:bg-dark-primary py-3 rounded-xl mt-4"
      >
        <Text className="text-light-background dark:text-dark-textPrimary text-xl font-bold">
          New Game
        </Text>
      </Pressable>
    </View>
  );
}

export default PlayButtons;
