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
    <HStack marginTop="20px" paddingX="8px" justifyContent="space-between">
      <Text fontWeight="500" fontSize="18px">
        {description}
      </Text>
      <Switch
        offTrackColor="primary.20"
        onTrackColor="primary.60"
        onThumbColor="white"
        offThumbColor="white"
        size="lg"
        onToggle={onChange}
        value={value}
      />
    </HStack>
  )
}

export default YesNoChoice
