import React from 'react'
import { Pressable, View } from 'react-native'
import { FontAwesome5, Fontisto } from '@expo/vector-icons'
import { Text } from '@/components/ui/text'
import { useMenuStore } from '@/store/menu'
import { useColorScheme } from 'react-native'

type Props = {
    onErase: () => void;
}

function Toolbar({ onErase }: Props) {
    const { undo, togglePencilMode, getHint, isPencilMode, history, canAutoComplete, autoComplete } = useMenuStore();
    const colorScheme = useColorScheme();
    const [isAutoCompleting, setIsAutoCompleting] = React.useState(false);

    const primaryColor = colorScheme === "dark" ? "#E6EAF2" : "#0F2854";
    const secondaryColor = colorScheme === "dark" ? "#5B8CFF" : "#1C4D8D";
    const disabledColor = colorScheme === "dark" ? "#AAB2C5" : "#94A3B8";
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
                    <Text className={`text-sm font-medium ${history.length === 0 ? 'text-light-textSecondary dark:text-dark-textSecondary' : 'text-light-textPrimary dark:text-dark-textPrimary'}`}>
                        Undo
                    </Text>
                </Pressable>

                <Pressable
                    className='flex-col items-center active:opacity-50'
                    onPress={onErase}
                >
                    <FontAwesome5 name="eraser" size={24} color={primaryColor} />
                    <Text className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">Erase</Text>
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
                    <Text className={`text-sm font-medium ${isPencilMode ? 'text-light-primary dark:text-dark-primary' : 'text-light-textPrimary dark:text-dark-textPrimary'}`}>
                        Pencil
                    </Text>
                </Pressable>

                <Pressable
                    className='flex-col items-center active:opacity-50'
                    onPress={getHint}
                >
                    <Fontisto name="lightbulb" size={24} color={primaryColor} />
                    <Text className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">Hint</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Toolbar