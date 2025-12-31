import { useFonts } from "expo-font";
import { ActivityIndicator, View } from 'react-native';
import "./global.css"
import Grid from "./components/grid";

export default function App() {
  const [loaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("./assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
  });
  if (!loaded) return <ActivityIndicator />;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Grid />
    </View>
  );
}
