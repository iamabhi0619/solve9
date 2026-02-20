import { View, Pressable, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { useThemeColors } from "@/utils/useThemeColors";


const Footer = () => {
    const githubUrl = "https://github.com/iamabhi0619/solve9.git";
    const colors = useThemeColors();

    return (
        <View className="flex-row items-center">
            <Text className="text-foreground">Made with Love - </Text>
            <Pressable onPress={() => Linking.openURL(githubUrl)}>
                <FontAwesome5 name="github" size={20} color={colors.foreground} />
            </Pressable>
        </View>
    );
};

export default Footer;
