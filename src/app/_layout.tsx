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
    "Rubik-Light": require("../../assets/fonts/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("../../assets/fonts/Rubik-LightItalic.ttf"),
    "Rubik": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Italic": require("../../assets/fonts/Rubik-Italic.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("../../assets/fonts/Rubik-MediumItalic.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-SemiBoldItalic": require("../../assets/fonts/Rubik-SemiBoldItalic.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("../../assets/fonts/Rubik-BoldItalic.ttf"),
    "Rubik-ExtraBold": require("../../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-ExtraBoldItalic": require("../../assets/fonts/Rubik-ExtraBoldItalic.ttf"),
    "Rubik-Black": require("../../assets/fonts/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("../../assets/fonts/Rubik-BlackItalic.ttf"),
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