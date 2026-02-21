import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { FontAwesome5 } from "@expo/vector-icons";

type GameHistory = {
  id: string;
  level: "easy" | "medium" | "hard" | "expert";
  timeElapsed: number;
  moves: number;
  mistakes: number;
  completedAt: Date;
  isWin: boolean;
  initialGrid: (number | null)[][];
  solutionGrid: (number | null)[][];
  moveHistory?: any[]; // Optional for backward compatibility
};

type StatsOverviewProps = {
  gameHistory: GameHistory[];
};

function StatsOverview({ gameHistory }: StatsOverviewProps) {
  if (gameHistory.length === 0) return null;

  const totalGames = gameHistory.length;
  const wonGames = gameHistory.filter((g) => g.isWin).length;
  const winRate = Math.round((wonGames / totalGames) * 100);
  
  const totalTime = gameHistory.reduce((sum, g) => sum + g.timeElapsed, 0);
  const avgTime = Math.round(totalTime / totalGames);
  
  const totalMoves = gameHistory.reduce((sum, g) => sum + g.moves, 0);
  const avgMoves = Math.round(totalMoves / totalGames);

  const perfectGames = gameHistory.filter((g) => g.isWin && g.mistakes === 0).length;

  return (
    <View className="bg-surface rounded-xl p-4 mb-4 border border-border">
      <Text className="text-lg font-bold text-foreground mb-3">
        Overall Statistics
      </Text>
      
      <View className="flex-row flex-wrap gap-3">
        <View className="flex-1 min-w-[45%] bg-background rounded-lg p-3 items-center">
          {/* <FontAwesome5 name="gamepad" size={20} color="#6366F1" /> */}
          <Text className="text-xs text-muted mt-2">Total Games</Text>
          <Text className="text-2xl font-bold text-foreground mt-1">{totalGames}</Text>
        </View>
        
        <View className="flex-1 min-w-[45%] bg-background rounded-lg p-3 items-center">
          {/* <FontAwesome5 name="trophy" size={20} color="#10B981" /> */}
          <Text className="text-xs text-muted mt-2">Win Rate</Text>
          <Text className="text-2xl font-bold text-foreground mt-1">{winRate}%</Text>
        </View>
        
        <View className="flex-1 min-w-[45%] bg-background rounded-lg p-3 items-center">
          {/* <FontAwesome5 name="clock" size={20} color="#F59E0B" /> */}
          <Text className="text-xs text-muted mt-2">Avg Time</Text>
          <Text className="text-2xl font-bold text-foreground mt-1">
            {Math.floor(avgTime / 60)}:{String(avgTime % 60).padStart(2, "0")}
          </Text>
        </View>
        
        <View className="flex-1 min-w-[45%] bg-background rounded-lg p-3 items-center">
          {/* <FontAwesome5 name="hand-pointer" size={20} color="#8B5CF6" /> */}
          <Text className="text-xs text-muted mt-2">Avg Moves</Text>
          <Text className="text-2xl font-bold text-foreground mt-1">{avgMoves}</Text>
        </View>
        
        <View className="flex-1 min-w-[45%] bg-background rounded-lg p-3 items-center">
          {/* <FontAwesome5 name="star" size={20} color="#EAB308" /> */}
          <Text className="text-xs text-muted mt-2">Perfect Games</Text>
          <Text className="text-2xl font-bold text-foreground mt-1">{perfectGames}</Text>
        </View>
        
        <View className="flex-1 min-w-[45%] bg-background rounded-lg p-3 items-center">
          {/* <FontAwesome5 name="fire" size={20} color="#EF4444" /> */}
          <Text className="text-xs text-muted mt-2">Won Games</Text>
          <Text className="text-2xl font-bold text-foreground mt-1">{wonGames}</Text>
        </View>
      </View>
    </View>
  );
}

export default StatsOverview;
