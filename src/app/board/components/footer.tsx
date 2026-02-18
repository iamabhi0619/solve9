import { View, Pressable, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/theme";


const Footer = () => {
    const githubUrl = "https://github.com/iamabhi0619/solve9.git";
    const { resolvedMode } = useTheme();
    const iconColor = resolvedMode === "light" ? "#0F2854" : "#E6EAF2";

    return (
        <View className="flex-row items-center">
            <Text className="text-foreground">Made with Love - </Text>
            <Pressable onPress={() => Linking.openURL(githubUrl)}>
                <FontAwesome5 name="github" size={20} color={iconColor} />
            </Pressable>
        </View>
    );
};

export default Footer;
