import { Pressable, View } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import { useEffect, memo } from "react"
import { Text } from "@/components/ui/text"
import { useMenuStore } from "@/store/menu"
import { useThemeColors } from "@/utils/useThemeColors"
import { formateElapsedTime } from "@/utils/formate-time"

// Isolated component — only this re-renders every second
const TimeSection = memo(() => {
    const { timeElapsed, isPaused, togglePause, incrementTime, saveUnsolvedGame, isGameOver, isGameWon } = useMenuStore();
    const colors = useThemeColors();

    useEffect(() => {
        const timer = setInterval(() => {
            incrementTime();
            // Auto-save every second so accidental closes don't lose progress
            if (!isGameOver && !isGameWon) {
                saveUnsolvedGame();
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [incrementTime, saveUnsolvedGame, isGameOver, isGameWon]);

    return (
        <View className="flex-1 flex-row items-center justify-end">
            <View className="mr-2 gap-0">
                <Text className="text-foreground text-lg font-medium leading-tight">Time</Text>
                <Text className="text-foreground text-xl font-bold leading-tight">
                    {formateElapsedTime(timeElapsed)}
                </Text>
            </View>
            <Pressable className="active:opacity-60" onPress={togglePause}>
                {isPaused ? (
                    <FontAwesome6 name="play-circle" size={28} color={colors.foreground} />
                ) : (
                    <FontAwesome6 name="pause-circle" size={28} color={colors.foreground} />
                )}
            </Pressable>
        </View>
    );
});

type Props = {}

const InfoBar = (props: Props) => {
    const { level, mistakes } = useMenuStore();

    return (
        <View className="w-full flex-row justify-between">
            <View className="flex-1 gap-0">
                <Text className="text-foreground text-lg font-medium leading-tight">Difficulty</Text>
                <Text className="text-foreground text-xl font-bold leading-tight capitalize">{level || 'Medium'}</Text>
            </View>
            <View className="flex-1 gap-0 flex-col items-center">
                <Text className="text-foreground text-lg font-medium leading-tight">Mistake</Text>
                <Text className="text-foreground text-xl font-bold leading-tight">{mistakes}/3</Text>
            </View>
            <TimeSection />
        </View>
    )
}

export default InfoBar