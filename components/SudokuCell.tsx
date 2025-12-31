import { Pressable, Animated } from "react-native";
import { Text } from "./ThemedText";
import { useRef } from "react";

type Props = {
    value: number | null;
    isSelected: boolean;
    isRelated: boolean;
    isSameNumber: boolean;
    isFixed: boolean;
    onPress: () => void;
    borderClass: string;
};

const SudokuCell = ({
    value,
    isSelected,
    isRelated,
    isSameNumber,
    onPress,
    isFixed,
    borderClass,
}: Props) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        onPress();
        Animated.parallel([
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 0.95,
                    duration: 70,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 70,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 70,
                    useNativeDriver: true,
                }),
                Animated.spring(rotateAnim, {
                    toValue: 0,
                    tension: 60,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    };

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
            }}
        >
            <Pressable
                onPress={handlePress}
                className={`w-[44px] h-[44px] items-center justify-center
                            ${isSelected ? "bg-regularblue" : isSameNumber ? "bg-regularblue/80" : isRelated ? "bg-lightblue/20" : "bg-white"}
                            ${borderClass}
                            `}
            >
                <Text
                    className={`font-medium text-4xl
                        ${isSelected || isSameNumber ? "text-white" : isFixed ? "text-darkblue" : "text-regularblue"}
                        `}
                >
                    {value}
                </Text>
            </Pressable>
        </Animated.View>
    );
};

export default SudokuCell;
