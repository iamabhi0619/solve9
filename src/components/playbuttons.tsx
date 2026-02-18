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
          className="w-full items-center bg-primary/10 py-3 rounded-xl border border-border"
        >
          <Text className="text-xl font-bold text-foreground">
            Continue
          </Text>
          <View className="flex-row">
            <Text className="text-muted">
              {formateElapsedTime(oldGame.timeElapsed)}
            </Text>
            <Text className="capitalize ml-2 text-muted">
              {oldGame.level}
            </Text>
          </View>
        </Pressable>
      )}
      <Pressable
        onPress={startNewGame}
        className="w-full items-center bg-primary py-3 rounded-xl mt-4"
      >
        <Text className="text-background text-xl font-bold">
          New Game
        </Text>
      </Pressable>
    </View>
  );
}

export default PlayButtons;
