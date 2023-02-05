//Nativebase

import React, { FC } from 'react'
import { Button, Text, Box } from 'native-base'
interface ButtonProps {
  disabled: boolean
  listItem?: boolean
  listSelected?: boolean
  onPress: () => void
  primary?: boolean
  text: string
}

/**
 * @param {ButtonProps} props The component props
 * @param {boolean} props.disabled Should button be disabled
 * @param {boolean} [props.listItem] Is this one of a list of choices
 * @param {boolean} [props.listSelected] Is this selected in a list of choices
 * @param {Function} props.onPress Function to run when button is pressed
 * @param {boolean} [props.primary] Is it a main (primary) button
 * @param {string} props.text The text to show on the button
 * @returns {React.ReactElement} Component
 */

const ButtonComponent: FC<ButtonProps> = ({
  disabled,
  listItem,
  listSelected,
  onPress,
  primary,
  text,
}) => {
  return (
    <Box>
      <Button>
        <Text>{text}</Text>
      </Button>
    </Box>
  )
}
export default ButtonComponent
