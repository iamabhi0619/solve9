import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/theme";

export default function BoardLoader() {
    const { resolvedMode } = useTheme();

    const spin = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.timing(spin, {
                toValue: 1,
                duration: 900,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);
    const rotate = spin.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const pulse = useRef(new Animated.Value(0.4)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 0.4,
                    duration: 700,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const spinnerBorder =
        resolvedMode === "dark" ? "#5B8CFF" : "#1C4D8D";
    const spinnerTrack =
        resolvedMode === "dark" ? "#2A3142" : "#D9E1F0";

    return (
        <View className="flex-1 items-center justify-center bg-background">

            <Animated.View style={{ opacity: pulse }} className="mb-8">
                <SkeletonGrid />
            </Animated.View>
            <View className="items-center gap-3">
                {/* Ring
                <View
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        borderWidth: 3.5,
                        borderColor: spinnerTrack,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Animated.View
                        style={{
                            position: "absolute",
                            width: 44,
                            height: 44,
                            borderRadius: 22,
                            borderWidth: 3.5,
                            borderColor: "transparent",
                            borderTopColor: spinnerBorder,
                            transform: [{ rotate }],
                        }}
                    />
                </View> */}
                <Text className="text-sm font-semibold text-muted tracking-wide">
                    Building your puzzle…
                </Text>
            </View>
        </View>
    );
}

function SkeletonGrid() {
    return (
        <View className="border-2 border-primary rounded-xl overflow-hidden">
            {[0, 1, 2].map((boxRow) => (
                <View
                    key={boxRow}
                    className={[
                        "flex-row",
                        boxRow < 2 ? "border-b-2 border-primary" : "",
                    ].join(" ")}
                >
                    {[0, 1, 2].map((boxCol) => (
                        <View
                            key={boxCol}
                            className={[
                                "flex-col",
                                boxCol < 2 ? "border-r-2 border-primary" : "",
                            ].join(" ")}
                        >
                            {[0, 1, 2].map((cellRow) => (
                                <View key={cellRow} className="flex-row">
                                    {[0, 1, 2].map((cellCol) => (
                                        <SkeletonCell key={cellCol} />
                                    ))}
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

function SkeletonCell() {
    return (
        <View
            className="bg-surface border-[0.5px] border-border items-center justify-center"
            style={{ width: 36, height: 36 }}
        >
            <View className="w-4 h-4 rounded-full bg-border" />
        </View>
    );
}
