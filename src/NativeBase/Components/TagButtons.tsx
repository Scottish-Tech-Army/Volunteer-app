import React from 'react'
import { HStack, Icon, IconButton, Pressable, Text } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface TagButtonsProps {
  iconState: Record<'Roles' | 'Tech' | 'Causes', boolean> // Updated to specific keys
  handleTagPress: (tag: 'Roles' | 'Tech' | 'Causes') => void // Updated to specific union type
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
        backgroundColor={iconState.Roles ? '#F6E2EE' : 'gray.100'}
        borderColor={iconState.Roles ? '#D1338A' : 'transparent'}
        borderWidth={1}
      >
        <Text color={iconState.Roles ? '#D1338A' : 'gray.500'}>Roles</Text>
        <IconButton
          icon={
            <Icon
              as={MaterialIcons}
              name={
                iconState.Roles ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={5}
              color={iconState.Roles ? '#D1338A' : 'gray.500'}
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
        backgroundColor={iconState.Tech ? '#F6E2EE' : 'gray.100'}
        borderColor={iconState.Tech ? '#D1338A' : 'transparent'}
        borderWidth={1}
      >
        <Text color={iconState.Tech ? '#D1338A' : 'gray.500'}>Tech</Text>
        <IconButton
          icon={
            <Icon
              as={MaterialIcons}
              name={
                iconState.Tech ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={5}
              color={iconState.Tech ? '#D1338A' : 'gray.500'}
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
        backgroundColor={iconState.Causes ? '#F6E2EE' : 'gray.100'}
        borderColor={iconState.Causes ? '#D1338A' : 'transparent'}
        borderWidth={1}
      >
        <Text color={iconState.Causes ? '#D1338A' : 'gray.500'}>Causes</Text>
        <IconButton
          icon={
            <Icon
              as={MaterialIcons}
              name={
                iconState.Causes ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={5}
              color={iconState.Causes ? '#D1338A' : 'gray.500'}
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
