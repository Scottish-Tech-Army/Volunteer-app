/**
 * @file Tappable list of options to choose from, with arrows.
 */

import { VStack } from 'native-base'
import React, { FC } from 'react'
import LinkAndArrow from './LinkAndArrow'

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
      <LinkAndArrow
        bottomBorder
        key={choice.text}
        onPress={choice.onPress}
        text={choice.text}
      />
    ))}
  </VStack>
)

export default ChoicesList
