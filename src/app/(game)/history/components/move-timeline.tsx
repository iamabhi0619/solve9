import { View, FlatList, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef, useEffect } from "react";

type Move = {
  row: number;
  col: number;
  oldValue: number | null;
  newValue: number | null;
  isNote?: boolean;
};

type MoveTimelineProps = {
  moves: Move[];
  currentMoveIndex: number;
  onMoveSelect: (index: number) => void;
  solutionGrid: (number | null)[][];
};

function MoveTimeline({ moves, currentMoveIndex, onMoveSelect, solutionGrid }: MoveTimelineProps) {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (currentMoveIndex >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentMoveIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [currentMoveIndex]);

  const renderMove = ({ item, index }: { item: Move; index: number }) => {
    const isActive = index === currentMoveIndex;
    const isWrong = item.newValue !== null && item.newValue !== solutionGrid[item.row][item.col];
    const isErase = item.newValue === null;

    return (
      <Pressable
        onPress={() => onMoveSelect(index)}
        className={`mr-2 px-4 py-3 rounded-lg border-2 ${
          isActive
            ? "bg-primary/20 border-primary"
            : "bg-surface border-border"
        }`}
      >
        <View className="flex-row items-center gap-2">
          <View className="w-6 h-6 rounded-full bg-background items-center justify-center">
            <Text className="text-xs font-bold text-foreground">{index + 1}</Text>
          </View>
          
          <View>
            <Text className="text-xs text-muted">
              Row {item.row + 1}, Col {item.col + 1}
            </Text>
            
            <View className="flex-row items-center gap-2 mt-1">
              {item.oldValue !== null && (
                <View className="flex-row items-center">
                  <Text className="text-sm text-muted line-through">{item.oldValue}</Text>
                </View>
              )}
              
              <FontAwesome5 name="arrow-right" size={10} color="#6B7280" />
              
              {isErase ? (
                <View className="flex-row items-center gap-1">
                  <FontAwesome5 name="eraser" size={12} color="#6B7280" />
                  <Text className="text-sm text-muted">Erase</Text>
                </View>
              ) : (
                <Text 
                  className={`text-lg font-bold ${
                    isWrong ? "text-error" : "text-primary"
                  }`}
                >
                  {item.newValue}
                </Text>
              )}
            </View>
          </View>
          
          {isWrong && !isErase && (
            <View className="ml-auto">
              <FontAwesome5 name="exclamation-circle" size={16} color="#EF4444" />
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-3 px-1">
        <Text className="text-sm font-bold text-foreground">
          Move Timeline ({moves.length} moves)
        </Text>
        <Text className="text-xs text-muted">
          {currentMoveIndex >= 0 ? `Move ${currentMoveIndex + 1} of ${moves.length}` : "Start"}
        </Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        horizontal
        data={moves}
        renderItem={renderMove}
        keyExtractor={(_, index) => `move-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
}

export default MoveTimeline;
