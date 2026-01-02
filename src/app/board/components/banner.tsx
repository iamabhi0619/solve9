import { Text } from "@/components/ui/text"
import { Image, View, useColorScheme } from "react-native"

type Props = {}

function Banner({ }: Props) {
    const colorScheme = useColorScheme();
    
    return (
        <View className="pt-4">
            <View className="flex-row items-center">
                <Image 
                    source={
                        colorScheme === "dark"
                            ? require('@/assets/icon-dark.png')
                            : require('@/assets/icon.png')
                    } 
                    style={{ width: 50, height: 50 }} 
                />
                <Text className="text-4xl ml-2 font-bold text-light-textPrimary dark:text-dark-textPrimary">Solve9</Text>
            </View>
        </View>
    )
}

export default Banner