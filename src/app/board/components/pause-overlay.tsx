import { View, Pressable, useColorScheme } from "react-native";
import { Text } from "@/components/ui/text";
import { FontAwesome6 } from "@expo/vector-icons";

type Props = {
    onResume: () => void;
};

const PauseOverlay = ({ onResume }: Props) => {
    const colorScheme = useColorScheme();
    const iconColor = colorScheme === "dark" ? "#E6EAF2" : "#1C4D8D";
    
    return (
        <View className="absolute inset-0 h-full bg-light-background dark:bg-dark-background justify-center items-center z-50">
            <View className="items-center">
                <FontAwesome6 name="pause-circle" size={80} color={iconColor} />
                <Text className="text-light-textPrimary dark:text-dark-textPrimary text-3xl font-bold mt-6">Game Paused</Text>
                <Pressable
                    onPress={onResume}
                    className="bg-light-primary dark:bg-dark-primary py-4 px-8 rounded-xl mt-8 active:opacity-80"
                >
                    <Text className="text-light-background dark:text-dark-textPrimary text-xl font-bold">Resume</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PauseOverlay;
