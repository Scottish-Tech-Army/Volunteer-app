//Nativebase

import React, { FC } from 'react'
import { Button, NativeBaseProvider, Text } from 'native-base'
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
    <NativeBaseProvider>
      <Button
        rounded="full"
        marginX="5"
        marginY="2"
        padding="5px 10px 5px 10px"
        disabled={disabled}
        colorScheme="secondary"
      >
        <Text fontSize="20px" color="white" fontWeight="bold">
          {text}
        </Text>
      </Button>
    </NativeBaseProvider>
  )
}
export default ButtonComponent
