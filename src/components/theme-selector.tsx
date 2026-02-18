import React, { useEffect, useState } from "react";
import {
    Pressable,
    View,
    useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Uniwind, useUniwind } from "uniwind";
import { Text } from "@/components/ui/text";


type ThemeMode = "light" | "dark";
type ThemeModeChoice = ThemeMode | "system";
type ThemeAccent = "default" | "ocean" | "forest" | "sunset" | "lavender";
type ThemeId = `${ThemeMode}-${ThemeAccent}`;

interface AccentItem {
    accent: ThemeAccent;
    label: string;
    swatch: { light: string; dark: string; primary: string };
    description: string;
}

const ACCENTS: AccentItem[] = [
    {
        accent: "default",
        label: "Default",
        description: "Classic blue",
        swatch: { light: "#F4F7FB", dark: "#161A22", primary: "#1C4D8D" },
    },
    {
        accent: "ocean",
        label: "Ocean",
        description: "Teal waters",
        swatch: { light: "#F0F7F9", dark: "#111A1C", primary: "#0D7A8A" },
    },
    {
        accent: "forest",
        label: "Forest",
        description: "Deep green",
        swatch: { light: "#F2F7F2", dark: "#121A12", primary: "#2D7A3A" },
    },
    {
        accent: "sunset",
        label: "Sunset",
        description: "Warm amber",
        swatch: { light: "#FDF6EE", dark: "#1A1210", primary: "#C85A1A" },
    },
    {
        accent: "lavender",
        label: "Lavender",
        description: "Soft purple",
        swatch: { light: "#F5F3FB", dark: "#13111A", primary: "#6B4DC4" },
    },
];


const STORAGE_KEY = "@solve9/theme";
const MODE_KEY = "@solve9/themeMode";
const ALL_THEME_IDS: ThemeId[] = ACCENTS.flatMap((a) => [
    `light-${a.accent}` as ThemeId,
    `dark-${a.accent}` as ThemeId,
]);

export async function saveTheme(themeId: ThemeId): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, themeId);
}

export async function saveModeChoice(mode: ThemeModeChoice): Promise<void> {
    await AsyncStorage.setItem(MODE_KEY, mode);
}

export async function loadSavedTheme(): Promise<ThemeId | null> {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored && ALL_THEME_IDS.includes(stored as ThemeId)) {
        return stored as ThemeId;
    }
    return null;
}

export async function loadModeChoice(): Promise<ThemeModeChoice | null> {
    const stored = await AsyncStorage.getItem(MODE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
        return stored;
    }
    return null;
}

export function getSystemDefaultTheme(
    colorScheme: "light" | "dark" | null | undefined
): ThemeId {
    const mode: ThemeMode = colorScheme === "dark" ? "dark" : "light";
    return `${mode}-default`;
}


export function useThemeSelector(): {
    activeTheme: ThemeId;
    modeChoice: ThemeModeChoice;
    setModeChoice: (mode: ThemeModeChoice) => Promise<void>;
    setAccent: (accent: ThemeAccent) => Promise<void>;
} {
    const systemScheme = useColorScheme();
    const { theme: rawTheme } = useUniwind();

    const initialTheme = ALL_THEME_IDS.includes(rawTheme as ThemeId)
        ? (rawTheme as ThemeId)
        : getSystemDefaultTheme(systemScheme);

    const [activeTheme, setActiveThemeState] = useState<ThemeId>(initialTheme);
    const [modeChoice, setModeChoiceState] = useState<ThemeModeChoice>("system");

    // On mount: restore persisted mode choice + accent.
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const [savedMode, savedTheme] = await Promise.all([
                loadModeChoice(),
                loadSavedTheme(),
            ]);
            const restoredMode: ThemeModeChoice = savedMode ?? "system";
            const savedAccent = savedTheme
                ? (savedTheme.split("-").slice(1).join("-") as ThemeAccent)
                : "default";
            const resolvedMode: ThemeMode =
                restoredMode === "system"
                    ? (systemScheme === "dark" ? "dark" : "light")
                    : restoredMode;
            const resolved: ThemeId = `${resolvedMode}-${savedAccent}`;
            if (!cancelled) {
                Uniwind.setTheme(resolved);
                setActiveThemeState(resolved);
                setModeChoiceState(restoredMode);
            }
        })();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // When mode is "system", react to OS scheme changes live.
    useEffect(() => {
        if (modeChoice !== "system") return;
        const accent = activeTheme.split("-").slice(1).join("-") as ThemeAccent;
        const resolvedMode: ThemeMode = systemScheme === "dark" ? "dark" : "light";
        const resolved: ThemeId = `${resolvedMode}-${accent}`;
        Uniwind.setTheme(resolved);
        setActiveThemeState(resolved);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [systemScheme, modeChoice]);

    const setModeChoice = async (mode: ThemeModeChoice) => {
        const accent = activeTheme.split("-").slice(1).join("-") as ThemeAccent;
        const resolvedMode: ThemeMode =
            mode === "system"
                ? (systemScheme === "dark" ? "dark" : "light")
                : mode;
        const resolved: ThemeId = `${resolvedMode}-${accent}`;
        Uniwind.setTheme(resolved);
        setActiveThemeState(resolved);
        setModeChoiceState(mode);
        await Promise.all([saveModeChoice(mode), saveTheme(resolved)]);
    };

    const setAccent = async (accent: ThemeAccent) => {
        const resolvedMode: ThemeMode =
            modeChoice === "system"
                ? (systemScheme === "dark" ? "dark" : "light")
                : modeChoice;
        const resolved: ThemeId = `${resolvedMode}-${accent}`;
        Uniwind.setTheme(resolved);
        setActiveThemeState(resolved);
        await saveTheme(resolved);
    };

    return { activeTheme, modeChoice, setModeChoice, setAccent };
}


const MODE_OPTIONS: { value: ThemeModeChoice; label: string }[] = [
    { value: "system", label: "System" },
    { value: "light",  label: "Light"  },
    { value: "dark",   label: "Dark"   },
];

interface ModeToggleProps {
    mode: ThemeModeChoice;
    onChange: (mode: ThemeModeChoice) => void;
}

function ModeToggle({ mode, onChange }: ModeToggleProps) {
    const index = MODE_OPTIONS.findIndex((o) => o.value === mode);

    return (
        <View className="flex-row bg-surface rounded-xl p-1 relative">
            {/* Sliding indicator — moves to the correct 1/3 slot */}
            <View
                className="absolute top-1 bottom-1 rounded-[9px] bg-primary/20"
                style={{ left: 4, width: `${100 / 3}%`, marginLeft: `${index * (100 / 3)}%` }}
            />
            {MODE_OPTIONS.map((opt) => {
                const isActive = mode === opt.value;
                return (
                    <Pressable
                        key={opt.value}
                        className="flex-1 items-center py-2 z-10"
                        onPress={() => onChange(opt.value)}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: isActive }}
                    >
                        <Text className={isActive
                            ? "text-sm font-bold text-foreground tracking-wide"
                            : "text-sm font-medium text-muted tracking-wide"
                        }>
                            {opt.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

interface AccentCardProps {
    item: AccentItem;
    mode: ThemeMode;
    isActive: boolean;
    onPress: () => void;
}

function AccentCard({ item, mode, isActive, onPress }: AccentCardProps) {
    const bg = mode === "dark" ? item.swatch.dark : item.swatch.light;
    const surfaceBg = mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";

    return (
        <Pressable
            onPress={onPress}
            className={`flex-1 basis-[30%] rounded-2xl overflow-hidden border-2 bg-surface ${isActive ? "border-primary" : "border-transparent"}`}
            accessibilityRole="button"
            accessibilityLabel={`${item.label} theme`}
            accessibilityState={{ selected: isActive }}
        >
            <View className="h-22 p-2.5 justify-center items-center" style={{ backgroundColor: bg }}>
                <View className="w-full rounded-lg p-2 gap-1" style={{ backgroundColor: surfaceBg }}>
                    <View
                        className="h-1.5 rounded-full w-[55%] mb-0.5"
                        style={{ backgroundColor: item.swatch.primary }}
                    />
                    <View
                        className="h-1 rounded-full w-[70%]"
                        style={{ backgroundColor: item.swatch.primary, opacity: 0.35 }}
                    />
                    <View
                        className="h-1 rounded-full w-[50%]"
                        style={{ backgroundColor: item.swatch.primary, opacity: 0.2 }}
                    />
                </View>
                {isActive && (
                    <View className="absolute top-2 right-2 w-4.5 h-4.5 rounded-full bg-white items-center justify-center">
                        <View
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.swatch.primary }}
                        />
                    </View>
                )}
            </View>

            <View className="flex-row items-center gap-2 px-2.5 py-2.5 bg-background">
                <View className="w-2 h-2 rounded-full" style={{ backgroundColor: item.swatch.primary }} />
                <View>
                    <Text className={`text-[13px] font-semibold tracking-wide ${isActive ? "text-foreground" : "text-muted"}`}>
                        {item.label}
                    </Text>
                    <Text className="text-[10px] text-muted mt-0.5">
                        {item.description}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

export function ThemeSelector() {
    const { activeTheme, modeChoice, setModeChoice, setAccent } = useThemeSelector();

    // For preview purposes, resolve the visual mode (light/dark) from the active theme.
    const visualMode: ThemeMode = activeTheme.startsWith("dark") ? "dark" : "light";
    const activeAccent = activeTheme.split("-").slice(1).join("-") as ThemeAccent;

    return (
        <View className="gap-6">
            {/* ── Mode toggle ── */}
            <View className="gap-2.5">
                <Text className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                    Appearance
                </Text>
                <ModeToggle mode={modeChoice} onChange={setModeChoice} />
            </View>

            {/* ── Accent grid ── */}
            <View className="gap-2.5">
                <Text className="text-[11px] font-semibold uppercase tracking-[1.1px] text-muted">
                    Accent
                </Text>
                <View className="flex-row flex-wrap gap-2.5">
                    {ACCENTS.map((item) => (
                        <AccentCard
                            key={item.accent}
                            item={item}
                            mode={visualMode}
                            isActive={activeAccent === item.accent}
                            onPress={() => setAccent(item.accent)}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}
