import React from 'react'
import { HStack, Icon, IconButton, Pressable, Text } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface TagButtonsProps {
  tags: string[] // An array of tag names, e.g., ['Roles', 'Tech', 'Causes']
  iconState: Record<string, boolean> // A dynamic record that maps tags to boolean states
  handleTagPress: (tag: string) => void // A function that takes any tag
}

const TagButtons: React.FC<TagButtonsProps> = ({
  tags,
  iconState,
  handleTagPress,
}) => {
  return (
    <HStack space={2} alignItems="center">
      {tags.map(tag => (
        <Pressable
          key={tag}
          onPress={() => handleTagPress(tag)}
          borderRadius={40}
          pl={4}
          pr={2}
          py={2}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          backgroundColor={iconState[tag] ? 'primary.20' : 'gray.100'}
          borderColor={iconState[tag] ? 'primary.100' : 'transparent'}
          borderWidth={1}
        >
          <Text color={iconState[tag] ? 'primary.100' : 'gray.500'}>{tag}</Text>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name={
                  iconState[tag] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                size={5}
                color={iconState[tag] ? 'primary.100' : 'gray.500'}
              />
            }
            variant="outline"
            _icon={{ color: 'gray.500' }}
            onPress={() => handleTagPress(tag)}
          />
        </Pressable>
      ))}
    </HStack>
  )
}

export default TagButtons
