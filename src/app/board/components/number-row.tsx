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
          rounded-xl items-center justify-center h-16 w-10
          ${disabled
                        ? "bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
                        : "bg-light-primary dark:bg-dark-primary shadow-md"}
        `}
            >
                <Text
                    className={`font-semibold text-3xl ${disabled
                        ? "text-light-textSecondary dark:text-dark-textSecondary"
                        : "text-white dark:text-dark-background"
                        }`}
                >
                    {number}
                </Text>

                {remaining > 0 ? (
                    <Text
                        className={`font-semibold text-[10px] mt-0.5 ${disabled
                            ? "text-light-textSecondary/60 dark:text-dark-textSecondary/60"
                            : "text-white/80 dark:text-dark-background/80"
                            }`}
                    >
                        {remaining}
                    </Text>
                ) : (
                    <Entypo name="check" size={14} color={disabled ? "#9CA3AF" : "#10B981"} />
                )}
            </Animated.View>
        </Pressable>
    );
};

const NumberRow = ({ onNumberPress, remaining }: Props) => {
    return (
        <View className="flex-row justify-between items-center mt-6 w-full px-1">
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
