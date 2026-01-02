import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Grid from "./components/grid";
import Banner from "./components/banner";
import Footer from "./components/footer";
import GameModal from "./components/game-modal";
import PauseOverlay from "./components/pause-overlay";
import { useMenuStore } from "@/store/menu";
import { useState } from "react";

export default function IndexScreen() {
    const { isGameOver, isGameWon, isPaused, togglePause } = useMenuStore();
    const [showModal, setShowModal] = useState(false);

    // Show modal when game is over or won
    if ((isGameOver || isGameWon) && !showModal) {
        setShowModal(true);
    }

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            className="bg-light-background dark:bg-dark-background"
        >
            <View className="h-full items-center justify-center w-full">
                <Banner />
                <View className="flex-1 w-full justify-center px-4">
                    <Grid />
                </View>
                <Footer />
                {isPaused && <PauseOverlay onResume={togglePause} />}
            </View>
            <GameModal 
                visible={showModal} 
                isWin={isGameWon} 
                onClose={() => setShowModal(false)} 
            />
        </SafeAreaView>
    );
}
