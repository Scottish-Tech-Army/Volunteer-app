/**
 * @file This is a reusable primary button component.
 */

import React, { FC } from 'react'
import { Button } from 'native-base'
interface ButtonComponentProps {
  disabled: boolean
  onPress: () => void
  text: string
}

/**
 * Tappable button component
 *
 *@param {ButtonComponentProps} props The component props
 * @param {boolean} props.disabled Should button be disabled
 *@param {Function} props.onPress Function to run when button is pressed
 *@param {string} props.text The text to show on the button
 *@returns {React.ReactElement} Component
 */

const ButtonComponent: FC<ButtonComponentProps> = ({
  disabled,
  onPress,
  text,
}) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {text}
    </Button>
  )
}
export default ButtonComponent
