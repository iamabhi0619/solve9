import { View, Pressable, Animated } from "react-native";
import { useRef } from "react";
import { Entypo } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

type Props = {
    onNumberPress: (num: number) => void;
    remaining: (num: number) => number;
};

const NumberButton = ({
    number,
    remaining,
    onPress,
}: {
    number: number;
    remaining: number;
    onPress: () => void;
}) => {
    const scale = useRef(new Animated.Value(1)).current;
    const disabled = remaining === 0;

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            onPressIn={() =>
                Animated.timing(scale, {
                    toValue: 0.9,
                    duration: 80,
                    useNativeDriver: true,
                }).start()
            }
            onPressOut={() =>
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 6,
                    tension: 120,
                    useNativeDriver: true,
                }).start()
            }
        >
            <Animated.View
                style={{ transform: [{ scale }] }}
                className={`
          rounded-lg items-center justify-center shadow-sm
          w-11 p-1
          ${disabled ? "dark:bg-dark-border" : "bg-light-primary dark:bg-dark-primary"}
        `}
            >
                <Text
                    className={`font-medium text-4xl ${disabled ? "dark:text-dark-textPrimary/70" : "text-white"
                        }`}
                >
                    {number}
                </Text>

                {remaining > 0 ? (
                    <Text
                        className={`font-light text-xs text-light-surface dark:text-dark-textSecondary`}
                    >
                        {remaining}
                    </Text>
                ) : (
                    <Entypo name="check" size={16} color="#AAB2C5" />
                )}
            </Animated.View>
        </Pressable>
    );
};

const NumberRow = ({ onNumberPress, remaining }: Props) => {
    return (
        <View className="flex-row justify-between mt-6 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <NumberButton
                    key={num}
                    number={num}
                    remaining={remaining(num)}
                    onPress={() => onNumberPress(num)}
                />
            ))}
        </View>
    );
};

export default NumberRow;
