import { View, Pressable, Animated } from "react-native";
import { useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
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
    const opacity = useRef(new Animated.Value(1)).current;
    const disabled = remaining === 0;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 0.88,
                useNativeDriver: true,
                speed: 40,
                bounciness: 4,
            }),
            Animated.timing(opacity, {
                toValue: 0.85,
                duration: 60,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                friction: 4,
                tension: 180,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            className="flex-1 mx-[2.5px]"
        >
            <Animated.View
                style={{ transform: [{ scale }], opacity }}
                className={[
                    "rounded-[14px] items-center justify-center py-2.5 px-0.5 min-h-17",
                    disabled
                        ? "bg-transparent border-[1.5px] border-border"
                        : "bg-primary shadow-sm",
                ].join(" ")}
            >
                {/* Number */}
                <Text
                    className={[
                        "text-[26px] font-extrabold tracking-[0.5px] leading-7.5",
                        disabled
                            ? "text-muted"
                            : "text-white",
                    ].join(" ")}
                >
                    {number}
                </Text>

                {/* Footer: remaining count badge or check */}
                <View className="mt-1.25 items-center justify-center h-4">
                    {disabled ? (
                        <View className="bg-emerald-500 rounded-full w-4 h-4 items-center justify-center">
                            <MaterialIcons name="check" size={11} color="#fff" />
                        </View>
                    ) : (
                        <View className="bg-white/25 rounded-full px-1.5 py-px min-w-4.5 items-center">
                            <Text className="text-[9px] font-bold text-white leading-3">
                                {remaining}
                            </Text>
                        </View>
                    )}
                </View>
            </Animated.View>
        </Pressable>
    );
};

const NumberRow = ({ onNumberPress, remaining }: Props) => {
    return (
        <View className="flex-row items-center mt-6 w-full px-1">
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
