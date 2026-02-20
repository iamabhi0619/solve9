import { Pressable, Animated, View, StyleSheet, Platform } from "react-native";
import { useRef, useEffect } from "react";
import { Text } from "@/components/ui/text";

type Props = {
    value: number | null;
    isSelected: boolean;
    isRelated: boolean;
    isSameNumber: boolean;
    isFixed: boolean;
    isLocked: boolean;
    isError: boolean;
    notes: Set<number>;
    onPress: () => void;
    cellSize: number;
};

const NOTE_NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SudokuCell = ({
    value,
    isSelected,
    isRelated,
    isSameNumber,
    onPress,
    isFixed,
    isLocked,
    isError,
    notes,
    cellSize,
}: Props) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const popAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const prevValue = useRef(value);

    useEffect(() => {
        if (value !== null && prevValue.current === null && !isFixed) {
            popAnim.setValue(0.6);
            fadeAnim.setValue(0);
            Animated.parallel([
                Animated.spring(popAnim, {
                    toValue: 1,
                    tension: 120,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        prevValue.current = value;
    }, [value, isFixed]);

    const handlePress = () => {
        onPress();
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.88,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 180,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const noteSize = cellSize / 3;
    const noteFontSize = Math.max(8, noteSize * 0.75);
    const valueFontSize = cellSize * 0.72;

    return (
        <Animated.View
            style={[
                styles.cellWrapper,
                { width: cellSize, height: cellSize },
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <Pressable
                onPress={handlePress}
                className={[
                    isError
                        ? "bg-error-bg"
                        : isSelected
                            ? "bg-cell-selected"
                            : isSameNumber
                                ? "bg-cell-same"
                                : isRelated
                                    ? "bg-cell-related"
                                    : "bg-transparent",
                ].join(" ")}
                style={[styles.cell, { width: cellSize, height: cellSize }]}
            >
                {value ? (
                    <Animated.View
                        style={{
                            transform: [{ scale: popAnim }],
                            opacity: fadeAnim,
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Text
                            className={
                                `${isError
                                    ? "text-error"
                                    : isSelected
                                        ? "text-foreground"
                                        : isSameNumber
                                            ? "text-foreground"
                                            : isFixed
                                                ? "text-foreground"
                                                : "text-primary"} font-medium`}
                            style={{
                                fontSize: valueFontSize,
                                lineHeight: valueFontSize * 1.1,
                                textAlign: "center",
                            }}
                        >
                            {value}
                        </Text>
                    </Animated.View>
                ) : notes.size > 0 ? (
                    <View style={[styles.notesGrid, { width: cellSize, height: cellSize }]}>
                        {NOTE_NUMS.map((num) => (
                            <View
                                key={num}
                                style={{ width: noteSize, height: noteSize, alignItems: "center", justifyContent: "center" }}
                            >
                                {notes.has(num) ? (
                                    <Text
                                        className="text-note"
                                        style={{
                                            fontSize: noteFontSize,
                                            lineHeight: noteFontSize * 1.2,
                                            textAlign: "center",
                                        }}
                                    >
                                        {num}
                                    </Text>
                                ) : null}
                            </View>
                        ))}
                    </View>
                ) : null}
            </Pressable>
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    cellWrapper: {
        // no overflow so scale animation isn't clipped
    },
    cell: {
        alignItems: "center",
        justifyContent: "center",
    },
    notesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export default SudokuCell;
