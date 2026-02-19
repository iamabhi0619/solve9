import "../global.css";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import { Uniwind } from "uniwind";
import { loadSavedTheme, loadModeChoice } from "@/components/theme-selector";

function AppShell() {
  const systemScheme = useColorScheme();

  useEffect(() => {
    (async () => {
      const [savedMode, savedTheme] = await Promise.all([loadModeChoice(), loadSavedTheme()]);
      const accent = savedTheme ? savedTheme.split("-").slice(1).join("-") : "default";
      const resolvedMode =
        savedMode === "system" || savedMode === null
          ? (systemScheme === "dark" ? "dark" : "light")
          : savedMode;
      Uniwind.setTheme(`${resolvedMode}-${accent}` as Parameters<typeof Uniwind.setTheme>[0]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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