import { useMenuStore } from "@/store/menu";
import { Text } from "./ui/text";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

const levels = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
  { id: "expert", label: "Expert" },
] as const;

const INDICATOR_WIDTH = 80;

export default function LevelSelector() {
  const { level, setLevel } = useMenuStore();
  const indicatorPosition = useSharedValue(1);

  useEffect(() => {
    const index = levels.findIndex((l) => l.id === level);
    indicatorPosition.value = withSpring(index, {
      damping: 20,
      stiffness: 90,
    });
  }, [level, indicatorPosition]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value * INDICATOR_WIDTH }],
    };
  });

  return (
    <View className="w-full mt-10">
      <View className="flex-row bg-surface rounded-full border border-light-border dark:border-dark-border">
        <Animated.View
          className="absolute rounded-full bg-primary"
          style={[
            animatedIndicatorStyle,
            { width: INDICATOR_WIDTH, top: 4, bottom: 4 },
          ]}
        />

        {levels.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setLevel(item.id)}
            className={`flex-1 items-center justify-center py-2 px-3 ${level === item.id ? "bg-light-primary rounded-full" : "opacity-80"}`}
            style={{ width: INDICATOR_WIDTH }}
          >
            <Text
              className={`text-xl font-medium ${level === item.id ? "text-light-surface dark:text-dark-textPrimary" : "text-light-textSecondary dark:text-dark-textSecondary"}`}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
