import { View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { ThemeSelector } from "@/components/theme-selector";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/utils/useThemeColors";

export default function SettingsScreen() {
    const colors = useThemeColors();

    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-background">
            {/* Header */}
            <View className="flex-row items-center px-5 py-4 border-b border-border">
                <Pressable
                    onPress={() => router.back()}
                    className="p-2 rounded-full bg-surface border border-border mr-3"
                    accessibilityLabel="Go back"
                >
                    <Ionicons name="arrow-back" size={22} color={colors.foreground} />
                </Pressable>
                <Text className="text-xl font-bold text-foreground flex-1">Settings</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, gap: 32 }}>
                {/* Theme section */}
                <View className="gap-4">
                    <SectionHeader title="Appearance" />
                    <View className="bg-surface rounded-2xl p-4 border border-border">
                        <ThemeSelector />
                    </View>
                </View>

                {/* About section */}
                <View className="gap-4">
                    <SectionHeader title="About" />
                    <View className="bg-surface rounded-2xl border border-border overflow-hidden">
                        <SettingsRow label="App" value="Solve9" />
                        <Divider />
                        <SettingsRow label="Version" value="1.6.0" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


function SectionHeader({ title }: { title: string }) {
    return (
        <Text className="text-xs font-semibold text-muted uppercase tracking-widest px-1">
            {title}
        </Text>
    );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
    return (
        <View className="flex-row items-center justify-between px-4 py-3.5">
            <Text className="text-base text-foreground">{label}</Text>
            <Text className="text-base text-foreground">{value}</Text>
        </View>
    );
}

function Divider() {
    return <View className="h-px bg-border mx-4" />;
}
