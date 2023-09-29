/**
 * @file Switch input.
 */

import React, { FC } from 'react'
import { HStack, Text, Switch } from 'native-base'

interface YesNoChoiceProps {
  description: string
  onChange: (value: boolean) => void
  value: boolean
}

const YesNoChoice: FC<YesNoChoiceProps> = ({
  description,
  onChange,
  value,
}) => {
  return (
    <HStack marginTop="2" justifyContent="space-between" alignItems="center">
      <Text fontFamily="primarySemiBold" fontSize="sm">
        {description}
      </Text>
      <Switch
        offTrackColor="primary.20"
        onTrackColor="primary.60"
        onThumbColor="bg.100"
        offThumbColor="bg.100"
        size="lg"
        onToggle={onChange}
        value={value}
      />
    </HStack>
  )
}

export default YesNoChoice
