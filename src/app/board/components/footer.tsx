import { View, Pressable, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "react-native";


const Footer = () => {
    const githubUrl = "https://github.com/iamabhi0619/solve9.git";
    const colorScheme = useColorScheme();

    return (
        <View className="flex-row items-center">
            <Text className="text-light-textPrimary dark:text-dark-textPrimary">Made with Love - </Text>
            <Pressable onPress={() => Linking.openURL(githubUrl)}>
                <FontAwesome5 name="github" size={20} color={colorScheme === "dark" ? "#E6EAF2" : "#0F2854"} />
            </Pressable>
        </View>
    );
};

export default Footer;
