/**
 * @file A secondary button (with an outline not filled).
 *
 * This is a temporary solution until we have fixed how we're defining colours in our theme file,
 * which currently prevents button colour schemes and variants from working as they're meant to in NativeBase.
 */

import React, { FC } from 'react'
import { Button } from 'native-base'

interface SecondaryButtonProps {
  onPress: () => void
  text: string
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ onPress, text }) => {
  return (
    <Button
      borderColor="primary.100"
      borderWidth="2"
      _dark={{
        bg: 'bgDarkMode',
      }}
      _light={{
        bg: 'bg.secondary',
      }}
      onPress={onPress}
      _pressed={{ bg: 'primary.20' }}
      _text={{ color: 'primary.100' }}
    >
      {text}
    </Button>
  )
}

export default SecondaryButton
