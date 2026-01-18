import LevelSelector from "@/components/level-slector";
import PlayButtons from "@/components/playbuttons";
import UnsolvedGames from "@/components/unsolved-games";
import { Text } from "@/components/ui/text";
import { useMenuStore } from "@/store/menu";
import { Image, useColorScheme, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const { loadHistoryAndUnsolved } = useMenuStore();

  useEffect(() => {
    loadHistoryAndUnsolved();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="bg-light-background dark:bg-dark-background"
    >
      <View className="flex-1 items-center justify-center px-6 w-full">
        <View className="absolute top-4 right-6">
          <Pressable
            onPress={() => router.push("/history")}
            className="p-3 bg-light-surface dark:bg-dark-surface rounded-full border border-light-border dark:border-dark-border"
          >
            <FontAwesome5
              name="history"
              size={24}
              color={colorScheme === "dark" ? "#E6EAF2" : "#0F2854"}
            />
          </Pressable>
        </View>
        <View className="flex-col items-center w-full mb-8">
          <View className="mb-6 shadow-lg">
            <Image
              source={
                colorScheme === "dark"
                  ? require("../../assets/images/icon-dark.png")
                  : require("../../assets/images/icon.png")
              }
              style={{ width: 180, height: 180 }}
            />
          </View>
          <View className="items-center">
            <Text className="text-6xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
              Solve
              <Text className="text-6xl font-bold text-light-primary dark:text-dark-primary">
                9
              </Text>
            </Text>
            <Text className="text-xl mt-2 text-light-textSecondary dark:text-dark-textSecondary tracking-wider">
              Think in Grid
            </Text>
          </View>
        </View>
        <UnsolvedGames />
        <LevelSelector />
        <PlayButtons />
      </View>
    </SafeAreaView>
  );
}
