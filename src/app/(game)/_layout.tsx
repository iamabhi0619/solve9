import { Slot } from "expo-router";
import { View } from "react-native";


function AppShell() {

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