/**
 * @file Pressable text and an arrow on the right.
 */

import { HStack, Icon, Pressable, Text } from 'native-base'
import React, { FC } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface TextAndArrowProps {
  fontSize?: string
  fontWeight?: string
  onPress: () => void
  showBottomBorder?: boolean
  text: string
}

/**
 * Component showing pressable text and an arrow on the right.
 *
 * @param {TextAndArrowProps} props The component props
 * @param {string} [props.fontSize] Font size
 * @param {string} [props.fontWeight] Font weight
 * @param {function} props.onPress Event handler for when the component is pressed
 * @param {boolean} [props.showBottomBorder] Whether to show a bottom border
 * @param {string} props.text Text to show
 * @returns {React.ReactElement} Component
 */
const TextAndArrow: FC<TextAndArrowProps> = ({
  fontSize,
  fontWeight,
  onPress,
  showBottomBorder,
  text,
}) => (
  <Pressable onPress={onPress}>
    <HStack
      alignItems="center"
      borderBottomColor="border.100"
      borderBottomWidth={showBottomBorder ? '1' : '0'}
      justifyContent="space-between"
    >
      <Text fontSize={fontSize ?? 'md'} fontWeight={fontWeight ?? '400'}>
        {text}
      </Text>
      <Icon
        as={MaterialIcons}
        color="primary.100"
        name="arrow-forward-ios"
        size="md"
      />
    </HStack>
  </Pressable>
)

export default TextAndArrow
