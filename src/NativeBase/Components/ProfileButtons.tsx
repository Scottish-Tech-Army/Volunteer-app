/**
 * @file for sta profile butttons
 */

import { Button } from 'native-base'
import React from 'react'

type ProfileButtonsProps = {
  onPress: () => void
  disabled?: boolean
  children: React.ReactNode
  borderWidth?: number
  backgroundColor?: string
  borderColor?: string
  fontFamily?: string
  _text?: object
  _dark?: object
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({
  onPress,
  disabled,
  children,
  ...props
}) => {
  const [pressed, setButtonPressed] = React.useState(false)

  const handlePressIn = () => {
    setButtonPressed(true)
    onPress()
  }
  return (
    <Button
      onPress={handlePressIn}
      {...props}
      backgroundColor={pressed ? 'purple.100' : props.backgroundColor}
      _text={pressed ? { color: 'white' } : props._text}
      disabled={disabled}
    >
      {pressed ? 'Done' : children}
    </Button>
  )
}

export default ProfileButtons
