import { Pressable, View, useColorScheme } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import { useEffect } from "react"
import { Text } from "@/components/ui/text"
import { useMenuStore } from "@/store/menu"
import { formateElapsedTime } from "@/utils/formate-time"


type Props = {}

const InfoBar = (props: Props) => {
    const { level, mistakes, timeElapsed, isPaused, togglePause, incrementTime } = useMenuStore();
    const colorScheme = useColorScheme();
    const primaryColor = colorScheme === "dark" ? "#E6EAF2" : "#0F2854";

    useEffect(() => {
        const timer = setInterval(() => {
            incrementTime();
        }, 1000);

        return () => clearInterval(timer);
    }, [incrementTime]);

    return (
        <View className="w-full flex-row justify-between">
            <View className="gap-0">
                <Text className="text-light-textPrimary dark:text-dark-textPrimary text-lg font-medium leading-tight">Difficulty</Text>
                <Text className="text-light-primary dark:text-dark-primary text-xl font-bold leading-tight capitalize">{level || 'Medium'}</Text>
            </View>
            <View className="gap-0 flex-col items-center">
                <Text className="text-light-textPrimary dark:text-dark-textPrimary text-lg font-medium leading-tight">Mistake</Text>
                <Text className="text-light-primary dark:text-dark-primary text-xl font-bold leading-tight">{mistakes}/3</Text>
            </View>
            <View className="flex-row items-center">
                <View className="mr-2 gap-0">
                    <Text className="text-light-textPrimary dark:text-dark-textPrimary text-lg font-medium leading-tight">Time</Text>
                    <Text className="text-light-primary dark:text-dark-primary text-xl font-bold leading-tight">{formateElapsedTime(timeElapsed)}</Text>
                </View>
                <Pressable className="active:opacity-60" onPress={togglePause}>
                    {isPaused ? (
                        <FontAwesome6 name="play-circle" size={28} color={primaryColor} />
                    ) : (
                        <FontAwesome6 name="pause-circle" size={28} color={primaryColor} />
                    )}
                </Pressable>
            </View>
        </View>
    )
}

export default InfoBar