/**
 * @file Tappable list of options to choose from, with arrows.
 */

import { HStack, Icon, Pressable, Text, VStack } from 'native-base'
import React, { FC } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export interface ChoicesListChoice {
  text: string
  onPress: () => void
}

interface ChoicesListProps {
  choices: ChoicesListChoice[]
}

/**
 * Component showing tappable list of options in a vertical list with horizontal arrows.
 *
 * @param {ChoicesListProps} props The component props
 * @param {ChoicesListChoice[]} props.choices The choices to show in the list
 * @returns {React.ReactElement} Component
 */
const ChoicesList: FC<ChoicesListProps> = ({ choices }) => (
  <VStack>
    {choices.map(choice => (
      <Pressable key={choice.text} onPress={choice.onPress}>
        <HStack
          alignItems="center"
          borderBottomColor="border.100"
          borderBottomWidth="1"
          justifyContent="space-between"
        >
          <Text fontWeight="300">{choice.text}</Text>
          <Icon
            as={MaterialIcons}
            color="primary.100"
            name="arrow-forward-ios"
            size="5"
          />
        </HStack>
      </Pressable>
    ))}
  </VStack>
)

export default ChoicesList
