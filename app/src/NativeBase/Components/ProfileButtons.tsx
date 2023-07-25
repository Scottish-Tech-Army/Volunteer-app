import { Button } from 'native-base'
import React from 'react'

type ProfileButtonsProps = {
  onPress: () => void
  disabled: boolean
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
  return (
    <Button onPress={onPress} disabled={disabled} {...props}>
      {children}
    </Button>
  )
}
export default ProfileButtons
