//Nativebase

import React, { FC } from 'react'
import { Button, Text } from 'native-base'
interface ButtonComponentProps {
  disabled: boolean
  listItem?: boolean
  listSelected?: boolean
  onPress: () => void
  primary?: boolean
  text: string
}

/**
 * Tappable button component
 *
 *@param {ButtonProps} props The component props
 * @param {boolean} props.disabled Should button be disabled
 * @param {boolean} [props.listItem] Is this one of a list of choices
 * @param {boolean} [props.listSelected] Is this selected in a list of choices
 *@param {Function} props.onPress Function to run when button is pressed
 *@param {boolean} [props.primary] Is it a main (primary) button
 *@param {string} props.text The text to show on the button
 *@returns {React.ReactElement} Component
 */

const ButtonComponent: FC<ButtonComponentProps> = ({
  disabled,
  listItem,
  listSelected,
  onPress,
  primary,
  text,
}) => {
  return (
    <Button
      rounded="full"
      marginX="1"
      paddingY="0px"
      marginBottom="20px"
      height="48px"
      disabled={disabled}
      bg="primary.100"
      onPress={onPress}
      _pressed={{ bg: 'primary.60' }}
    >
      <Text
        fontSize="20px"
        color="white"
        margin="0px"
        padding="0px"
        fontWeight="600"
      >
        {text}
      </Text>
    </Button>
  )
}
export default ButtonComponent
