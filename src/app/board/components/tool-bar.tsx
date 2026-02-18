import React from 'react'
import { Pressable, View } from 'react-native'
import { FontAwesome5, Fontisto } from '@expo/vector-icons'
import { Text } from '@/components/ui/text'
import { useMenuStore } from '@/store/menu'
import { useTheme } from '@/theme'

type Props = {
    onErase: () => void;
    selected: { row: number; col: number } | null;
}

function Toolbar({ onErase, selected }: Props) {
    const { undo, togglePencilMode, getHint, isPencilMode, history, canAutoComplete, autoComplete, hintsRemaining } = useMenuStore();
    const { resolvedMode } = useTheme();
    const [isAutoCompleting, setIsAutoCompleting] = React.useState(false);

    const hintsLeft = hintsRemaining();

    const primaryColor = resolvedMode === "light" ? "#0F2854" : "#E6EAF2";
    const secondaryColor = resolvedMode === "light" ? "#1C4D8D" : "#5B8CFF";
    const disabledColor = resolvedMode === "light" ? "#94A3B8" : "#AAB2C5";
    const successColor = "#10B981";

    const canAutoCompleteNow = canAutoComplete();

    const handleAutoComplete = async () => {
        setIsAutoCompleting(true);
        await autoComplete();
        setIsAutoCompleting(false);
    };

    return (
        <View className='w-full px-3 pt-6'>
            {canAutoCompleteNow && (
                <Pressable
                    className='w-full bg-green-500 dark:bg-green-600 py-3 rounded-xl mb-4 active:opacity-80 flex-row items-center justify-center'
                    onPress={handleAutoComplete}
                    disabled={isAutoCompleting}
                >
                    <FontAwesome5 name="magic" size={18} color="white" />
                    <Text className="text-white text-base font-bold ml-2">
                        {isAutoCompleting ? "Completing..." : "Auto-Complete"}
                    </Text>
                </Pressable>
            )}
            <View className='w-full flex-row justify-between'>
                <Pressable
                    className='flex-col items-center active:opacity-50'
                    onPress={undo}
                    disabled={history.length === 0}
                >
                    <FontAwesome5
                        name="undo-alt"
                        size={24}
                        color={history.length === 0 ? disabledColor : primaryColor}
                    />
                    <Text className={`text-sm font-medium ${history.length === 0 ? 'text-muted' : 'text-foreground'}`}>
                        Undo
                    </Text>
                </Pressable>

                <Pressable
                    className='flex-col items-center active:opacity-50'
                    onPress={onErase}
                >
                    <FontAwesome5 name="eraser" size={24} color={primaryColor} />
                    <Text className="text-sm font-medium text-foreground">Erase</Text>
                </Pressable>

                <Pressable
                    className='flex-col items-center active:opacity-50'
                    onPress={togglePencilMode}
                >
                    <FontAwesome5
                        name="pencil-alt"
                        size={24}
                        color={isPencilMode ? secondaryColor : primaryColor}
                    />
                    <Text className={`text-sm font-medium ${isPencilMode ? 'text-foreground' : 'text-foreground'}`}>
                        Pencil
                    </Text>
                </Pressable>

                <Pressable
                    className='flex-col items-center active:opacity-50'
                    onPress={() => getHint(selected?.row ?? -1, selected?.col ?? -1)}
                    disabled={hintsLeft === 0}
                >
                    <View style={{ position: 'relative' }}>
                        <Fontisto name="lightbulb" size={24} color={hintsLeft === 0 ? disabledColor : primaryColor} />
                        <View
                            style={{
                                position: 'absolute',
                                top: -4,
                                right: -8,
                                backgroundColor: hintsLeft === 0 ? disabledColor : secondaryColor,
                                borderRadius: 8,
                                minWidth: 16,
                                height: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 2,
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold', lineHeight: 14 }}>
                                {hintsLeft}
                            </Text>
                        </View>
                    </View>
                    <Text className={`text-sm font-medium ${hintsLeft === 0 ? 'text-muted' : 'text-foreground'}`}>Hint</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Toolbar