import "../../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
