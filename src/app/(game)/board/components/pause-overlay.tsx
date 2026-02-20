import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { FontAwesome6 } from "@expo/vector-icons";
import { useThemeColors } from "@/utils/useThemeColors";

type Props = {
    onResume: () => void;
};

const PauseOverlay = ({ onResume }: Props) => {
    const colors = useThemeColors();
    
    return (
        <View className="absolute inset-0 h-full bg-background justify-center items-center z-50">
            <View className="items-center">
                <FontAwesome6 name="pause-circle" size={80} color={colors.primary} />
                <Text className="text-foreground text-3xl font-bold mt-6">Game Paused</Text>
                <Pressable
                    onPress={onResume}
                    className="bg-primary py-4 px-8 rounded-xl mt-8 active:opacity-80"
                >
                    <Text className="text-background text-xl font-bold">Resume</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default PauseOverlay;
