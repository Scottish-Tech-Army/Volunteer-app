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

export enum ChoicesListColour {
  primary = 'primary',
  purple = 'purple',
}

const colourStyles = {
  [ChoicesListColour.primary]: {
    color: 'primary.100',
    darkModeColor: 'primary.40',
  },
  [ChoicesListColour.purple]: {
    color: 'purple.100',
    darkModeColor: 'purple.40',
  },
}

export enum ChoicesListFontStyle {
  mediumLight = 'mediumLight',
  smallSemiBold = 'smallSemiBold',
}

const fontStyles = {
  [ChoicesListFontStyle.mediumLight]: {
    fontSize: 'md',
    fontWeight: '300',
  },
  [ChoicesListFontStyle.smallSemiBold]: {
    fontSize: 'sm',
    fontWeight: '600',
  },
}

interface ChoicesListProps {
  choices: ChoicesListChoice[]
  colour: ChoicesListColour
  style: ChoicesListFontStyle
}

/**
 * Component showing tappable list of options in a vertical list with horizontal arrows.
 *
 * @param {ChoicesListProps} props The component props
 * @param {ChoicesListChoice[]} props.choices The choices to show in the list
 * @returns {React.ReactElement} Component
 */
const ChoicesList: FC<ChoicesListProps> = ({ choices, colour, style }) => (
  <VStack>
    {choices.map(choice => (
      <Pressable key={choice.text} onPress={choice.onPress}>
        <HStack
          alignItems="center"
          borderBottomColor="border.100"
          borderBottomWidth="1"
          justifyContent="space-between"
        >
          <Text
            fontWeight={fontStyles[style].fontWeight}
            fontSize={fontStyles[style].fontSize}
          >
            {choice.text}
          </Text>
          <Icon
            as={MaterialIcons}
            color={colourStyles[colour].color}
            _dark={{ color: colourStyles[colour].darkModeColor }}
            name="arrow-forward-ios"
            size="md"
          />
        </HStack>
      </Pressable>
    ))}
  </VStack>
)

export default ChoicesList
