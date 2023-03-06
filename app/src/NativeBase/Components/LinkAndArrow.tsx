/**
 * @file Pressable text and an arrow on the right.
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
 * Component showing pressable text and an arrow on the right.
 *
 * @param {LinkAndArrowProps} props The component props
 * @param {boolean} [props.bottomBorder] Whether to show a bottom border
 * @param {function} props.onPress Event handler for when the component is pressed
 * @param {string} props.text Text to show
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
