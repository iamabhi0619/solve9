import { View, Pressable, Animated } from "react-native";
import { useRef } from "react";
import { Text } from "./ThemedText";
import { IconCheck } from "@tabler/icons-react-native";

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
          w-10 p-1
          ${disabled ? "bg-cyan" : "bg-regularblue"}
        `}
            >
                <Text
                    className={`font-medium text-3xl ${disabled ? "text-gray-700" : "text-white"
                        }`}
                >
                    {number}
                </Text>

                {remaining > 0 ? (
                    <Text
                        className={`font-light text-xs ${disabled ? "text-gray-500" : "text-white/85"
                            }`}
                    >
                        {remaining}
                    </Text>
                ) : (
                    <IconCheck color="white" size={13} />
                )}
            </Animated.View>
        </Pressable>
    );
};

const NumberRow = ({ onNumberPress, remaining }: Props) => {
    return (
        <View className="flex-row justify-between px-4 mt-6 w-full">
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
