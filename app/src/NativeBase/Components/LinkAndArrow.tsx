/**
 * @file Tappable list of options to choose from, with arrows.
 */

import { HStack, Icon, Pressable, Text } from 'native-base'
import React, { FC } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface LinkAndArrowProps {
  bottomBorder?: boolean
  onPress: () => void
  text: string
}

/**
 * Component showing tappable list of options in a vertical list with horizontal arrows.
 *
 * @param {LinkAndArrowProps} props The component props
 * @param {LinkAndArrowChoice[]} props.choices The choices to show in the list
 * @returns {React.ReactElement} Component
 */
const LinkAndArrow: FC<LinkAndArrowProps> = ({
  bottomBorder,
  text,
  onPress,
}) => (
  <Pressable onPress={onPress}>
    <HStack
      alignItems="center"
      borderBottomColor="border.100"
      borderBottomWidth={bottomBorder ? '1' : '0'}
      justifyContent="space-between"
    >
      <Text fontWeight="300">{text}</Text>
      <Icon
        as={MaterialIcons}
        color="primary.100"
        name="arrow-forward-ios"
        size="md"
      />
    </HStack>
  </Pressable>
)

export default LinkAndArrow
