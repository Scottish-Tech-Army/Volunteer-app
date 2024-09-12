import React from 'react'
import { HStack, Icon, IconButton, Pressable, Text } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface TagButtonsProps {
  iconState: Record<string, boolean>
  handleTagPress: (tag: string) => void
}

const TagButtons: React.FC<TagButtonsProps> = ({
  iconState,
  handleTagPress,
}) => {
  return (
    <HStack space={2} alignItems="center">
      <Pressable
        onPress={() => handleTagPress('Roles')}
        borderRadius={40}
        pl={4}
        pr={2}
        py={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#F6E2EE"
        borderColor="#D1338A"
        borderWidth={1}
      >
        <Text color="#D1338A">Roles</Text>
        <IconButton
          icon={
            <Icon
              as={MaterialIcons}
              name={
                iconState.Roles ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={5}
              color="#D1338A"
            />
          }
          variant="outline"
          _icon={{ color: 'gray.500' }}
          onPress={() => handleTagPress('Roles')}
        />
      </Pressable>
      <Pressable
        onPress={() => handleTagPress('Tech')}
        borderRadius={40}
        pl={4}
        pr={2}
        py={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#F6E2EE"
        borderColor="#D1338A"
        borderWidth={1}
      >
        <Text color="#D1338A">Tech</Text>
        <IconButton
          icon={
            <Icon
              as={MaterialIcons}
              name={
                iconState.Tech ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={5}
              color="#D1338A"
            />
          }
          variant="outline"
          _icon={{ color: 'gray.500' }}
          onPress={() => handleTagPress('Tech')}
        />
      </Pressable>
      <Pressable
        onPress={() => handleTagPress('Causes')}
        borderRadius={40}
        pl={4}
        pr={2}
        py={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#F6E2EE"
        borderColor="#D1338A"
        borderWidth={1}
      >
        <Text color="#D1338A">Causes</Text>
        <IconButton
          icon={
            <Icon
              as={MaterialIcons}
              name={
                iconState.Causes ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={5}
              color="#D1338A"
            />
          }
          variant="outline"
          _icon={{ color: 'gray.500' }}
          onPress={() => handleTagPress('Causes')}
        />
      </Pressable>
    </HStack>
  )
}

export default TagButtons
