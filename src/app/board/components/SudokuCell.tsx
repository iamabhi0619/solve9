import { Pressable, Animated, View } from "react-native";
import { useRef } from "react";
import { Text } from "@/components/ui/text";

type Props = {
    value: number | null;
    isSelected: boolean;
    isRelated: boolean;
    isSameNumber: boolean;
    isFixed: boolean;
    isError: boolean;
    notes: Set<number>;
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
    isError,
    notes,
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
                            ${isError ? "bg-red-100 dark:bg-red-900/30" : isSelected ? "bg-light-primarySoft dark:bg-dark-primarySoft" : isSameNumber ? "bg-light-primarySoft/90 dark:bg-dark-primarySoft/90" : isRelated ? "bg-light-primarySoft/10 dark:bg-dark-primarySoft/10" : "bg-light-surface dark:bg-dark-surface"}
                            ${borderClass}
                            `}
            >
                {value ? (
                    <Text
                        className={`font-medium text-4xl
                            ${isError ? "text-red-600 dark:text-red-400" : isSelected || isSameNumber ? "text-light-background dark:text-dark-background" : isFixed ? "text-light-textPrimary dark:text-dark-textPrimary" : "text-light-primary dark:text-dark-primary"}
                            `}
                    >
                        {value}
                    </Text>
                ) : notes.size > 0 ? (
                    <View className="flex-row flex-wrap w-full h-full p-0.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <Text
                                key={num}
                                className="w-1/3 h-1/3 text-[10px] text-center text-light-textSecondary dark:text-dark-textSecondary"
                            >
                                {notes.has(num) ? num : ''}
                            </Text>
                        ))}
                    </View>
                ) : null}
            </Pressable>
        </Animated.View>
    );
};

export default SudokuCell;
