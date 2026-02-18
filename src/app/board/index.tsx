import { View, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Grid from "./components/grid";
import Banner from "./components/banner";
import Footer from "./components/footer";
import GameModal from "./components/game-modal";
import PauseOverlay from "./components/pause-overlay";
import BoardLoader from "./components/board-loader";
import { useMenuStore } from "@/store/menu";
import { useState, useEffect } from "react";
import { router } from "expo-router";

export default function IndexScreen() {
    const { isGameOver, isGameWon, isPaused, togglePause, saveUnsolvedGame, board } = useMenuStore();
    const [showModal, setShowModal] = useState(false);

    // Handle Android back button
    useEffect(() => {
        const backAction = () => {
            if (!isGameOver && !isGameWon) {
                saveUnsolvedGame();
            }
            router.back();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [isGameOver, isGameWon, saveUnsolvedGame]);

    // Show modal when game is over or won
    if ((isGameOver || isGameWon) && !showModal) {
        setShowModal(true);
    }

    // Board is being generated in the background — show loader
    if (!board) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <BoardLoader />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View className="h-full items-center justify-center w-full bg-background">
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
