import "../global.css";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { View, useColorScheme } from "react-native";
import { Uniwind } from "uniwind";
import { loadSavedTheme, loadModeChoice } from "@/components/theme-selector";

type ThemeModeChoice = "light" | "dark" | "system";

function AppShell() {
  const systemScheme = useColorScheme();
  const [modeChoice, setModeChoice] = useState<ThemeModeChoice | null>(null);
  const [accent, setAccent] = useState<string>("default");

  // Initialize theme on mount
  useEffect(() => {
    (async () => {
      const [savedMode, savedTheme] = await Promise.all([loadModeChoice(), loadSavedTheme()]);
      const savedAccent = savedTheme ? savedTheme.split("-").slice(1).join("-") : "default";
      const restoredMode: ThemeModeChoice = savedMode ?? "system";
      const resolvedMode =
        restoredMode === "system"
          ? (systemScheme === "dark" ? "dark" : "light")
          : restoredMode;
      Uniwind.setTheme(`${resolvedMode}-${savedAccent}` as Parameters<typeof Uniwind.setTheme>[0]);
      setModeChoice(restoredMode);
      setAccent(savedAccent);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen to system theme changes when mode is set to "system"
  useEffect(() => {
    if (modeChoice === "system") {
      const resolvedMode = systemScheme === "dark" ? "dark" : "light";
      Uniwind.setTheme(`${resolvedMode}-${accent}` as Parameters<typeof Uniwind.setTheme>[0]);
    }
  }, [systemScheme, modeChoice, accent]);

  const [fontsLoaded] = useFonts({
    "Rubik": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }} className="bg-background font-sans">
      <Slot />
    </View>
  );
}

export default function Layout() {
  return (
    <AppShell />
  );
}