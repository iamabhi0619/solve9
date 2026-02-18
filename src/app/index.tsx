import LevelSelector from "@/components/level-slector";
import PlayButtons from "@/components/playbuttons";
import UnsolvedGames from "@/components/unsolved-games";
import { Text } from "@/components/ui/text";
import { useMenuStore } from "@/store/menu";
import { useTheme } from "@/theme";
import { Image, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

export default function IndexScreen() {
  const { loadHistoryAndUnsolved } = useMenuStore();
  const { resolvedMode } = useTheme();

  const iconColor = resolvedMode === "light" ? "#0F2854" : "#E6EAF2";

  useEffect(() => {
    loadHistoryAndUnsolved();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="font-sans"
    >
      <View className="flex-1 items-center justify-center px-6 w-full">
        <View className="absolute top-4 right-6 flex-row gap-3">
          <Pressable
            onPress={() => router.push("/settings")}
            className="p-3 bg-surface rounded-full border border-border"
            accessibilityLabel="Settings"
          >
            <Ionicons name="settings-outline" size={22} color={iconColor} />
          </Pressable>
          <Pressable
            onPress={() => router.push("/history")}
            className="p-3 bg-surface rounded-full border border-border"
            accessibilityLabel="History"
          >
            <FontAwesome5 name="history" size={22} color={iconColor} />
          </Pressable>
        </View>

        <View className="flex-col items-center w-full mb-8">
          <View className="mb-6">
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: 180, height: 180 }}
            />
          </View>
          <View className="items-center">
            <Text className="text-6xl font-bold text-foreground">
              Solve
              <Text className="text-6xl font-bold text-foreground">
                9
              </Text>
            </Text>
            <Text className="text-xl mt-2 text-foreground tracking-wider">
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
