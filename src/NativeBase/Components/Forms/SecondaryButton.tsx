/**
 * @file A secondary button (with an outline not filled).
 *
 * This is a temporary solution until we have fixed how we're defining colours in our theme file,
 * which currently prevents button colour schemes and variants from working as they're meant to in NativeBase.
 */

import React, { FC } from 'react'
import { Button } from '@gluestack-ui/themed-native-base'

interface SecondaryButtonProps {
  onPress: () => void
  text: string
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ onPress, text }) => {
  return (
    <Button
      backgroundColor="bg.100"
      borderColor="primary.100"
      borderWidth="2"
      onPress={onPress}
      _pressed={{ bg: 'primary.20' }}
      _text={{ color: 'primary.100' }}
    >
      {text}
    </Button>
  )
}

export default SecondaryButton
