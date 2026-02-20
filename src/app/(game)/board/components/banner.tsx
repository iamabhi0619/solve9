import { Text } from "@/components/ui/text"
import { Image, View, Pressable } from "react-native"
import { router } from "expo-router"
import { useMenuStore } from "@/store/menu"
import { useTheme } from "@/theme"
import { useThemeColors } from "@/utils/useThemeColors"
import { FontAwesome5 } from "@expo/vector-icons"

type Props = {}

function Banner({ }: Props) {
    const { saveUnsolvedGame, isGameOver, isGameWon } = useMenuStore();
    const { resolvedMode } = useTheme();
    const colors = useThemeColors();

    const handleBack = async () => {
        // Only save if game is not over or won
        if (!isGameOver && !isGameWon) {
            await saveUnsolvedGame();
        }
        router.back();
    };

    return (
        <View className="pt-4 w-full">
            <View className="flex-row items-center justify-between px-4">
                <Pressable onPress={handleBack} className="p-2">
                    <FontAwesome5
                        name="arrow-left"
                        size={24}
                        color={colors.foreground}
                    />
                </Pressable>
                <View className="flex-row items-center">
                    <Image
                        source={
                            resolvedMode === "light"
                                ? require('../../../../assets/icon.png')
                                : require('../../../../assets/icon-dark.png')
                        }
                        style={{ width: 50, height: 50 }}
                    />
                    <Text className="text-4xl ml-2 font-bold text-foreground">Solve9</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>
        </View>
    )
}

export default Banner