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
    const { undo, togglePencilMode, getHint, isPencilMode, history } = useMenuStore();
    const colorScheme = useColorScheme();
    
    const primaryColor = colorScheme === "dark" ? "#E6EAF2" : "#0F2854";
    const secondaryColor = colorScheme === "dark" ? "#5B8CFF" : "#1C4D8D";
    const disabledColor = colorScheme === "dark" ? "#AAB2C5" : "#94A3B8";

    return (
        <View className='w-full flex-row justify-between px-3 pt-6'>
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
    )
}

export default Toolbar